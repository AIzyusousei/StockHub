# API

## Internal API

FrontendとBackend間ではREST APIを使用する。

Base path:

`/api`

resource名は原則として複数形の名詞を使用する。

例:

- `GET /api/watchlists`
- `GET /api/stocks`
- `POST /api/custom-indexes`
- `GET /api/market-overview`

## Market Overview

`GET /api/market-overview`

PostgreSQLに保存済みの直近約3か月の日足を返す。リクエスト時に
yfinanceへアクセスしない。

```json
[
  {
    "code": "nikkei",
    "displayName": "日経平均",
    "latestClose": 42718.47,
    "priceChange": 512.34,
    "changeRate": 1.21,
    "candles": [
      {
        "date": "2026-08-17",
        "open": 42210.12,
        "high": 42820.01,
        "low": 42100.25,
        "close": 42718.47
      }
    ]
  }
]
```

## Internal Market Data API

Analyticsの日次バッチだけが利用するSpring Boot内部API。

- `GET /api/internal/market-data/{instrumentCode}/latest-date`
- `POST /api/internal/market-data/daily-prices`

日足のPostgreSQLへのUPSERTは後者を受けたSpring Boot ServiceとDoma DAOが行う。

Analyticsから送信するRequest body:

```json
{
  "instrumentCode": "nikkei",
  "prices": [
    {
      "date": "2026-08-17",
      "open": 42000.0,
      "high": 43000.0,
      "low": 41800.0,
      "close": 42718.47,
      "adjustedClose": 42718.47,
      "volume": 1000000
    }
  ]
}
```

同じ`instrumentCode`と`date`の組み合わせを再送しても、
`market_daily_price`の複合UNIQUE制約を利用したUPSERTにより重複行は作成しない。

対象instrumentは以下の6種類である。

| code | yfinance symbol | 表示 |
|---|---|---|
| `nikkei` | `^N225` | 日経平均 |
| `topix` | `1306.T` | TOPIX連動ETF proxy |
| `usd-jpy` | `JPY=X` | ドル円 |
| `nasdaq` | `^IXIC` | NASDAQ |
| `sp500` | `^GSPC` | S&P500 |
| `us10y` | `^TNX` | 米国10年国債利回り |


## DTO

ControllerからEntityを直接返さず、
Request / Response DTOを使用する。


## Analytics通信

Analyticsは現在、外部公開APIを提供しない。日次バッチが`httpx`でSpring Bootの
Internal Market Data APIを呼び出す。


## Stock Data Provider

StockHubではAnalyticsの`providers/`からyfinanceを利用する。

将来のIndexArenaではmarketstack等への変更を想定する。

business logicをprovider固有仕様へ直接依存させず、
providerから取得したdataは共通modelへ変換して利用する。
