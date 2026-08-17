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


## DTO

ControllerからEntityを直接返さず、
Request / Response DTOを使用する。


## Analytics API

BackendからAnalyticsへ、
株式分析・計算処理を要求する場合がある。


## Stock Data Provider

StockHubではyfinanceを利用予定。

将来のIndexArenaではmarketstack等への変更を想定する。

business logicをprovider固有仕様へ直接依存させず、
providerから取得したdataは共通modelへ変換して利用する。
