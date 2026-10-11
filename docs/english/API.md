# API

## Internal API

A REST API is used between the Frontend and Backend.

Base path:

`/api`

Resource names should generally use plural nouns.

Examples:

- `GET /api/watchlists`
- `GET /api/stocks`
- `POST /api/custom-indexes`
- `GET /api/market-overview`

## Market Overview

`GET /api/market-overview`

Returns the approximately three most recent months of daily prices stored in PostgreSQL. It does not access yfinance when the request is made.

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

A Spring Boot internal API used only by Analytics’ daily batch.

- `GET /api/internal/market-data/{instrumentCode}/latest-date`
- `POST /api/internal/market-data/daily-prices`

The Spring Boot Service and Doma DAO perform the UPSERT of daily prices into PostgreSQL when the latter endpoint is called.

Request body sent by Analytics:

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

Even if the same combination of `instrumentCode` and `date` is sent again, no duplicate rows are created because the UPSERT uses the composite UNIQUE constraint on `market_daily_price`.

The following six instruments are supported.

| code | yfinance symbol | Display name |
|---|---|---|
| `nikkei` | `^N225` | Nikkei Average |
| `topix` | `1306.T` | TOPIX-linked ETF proxy |
| `usd-jpy` | `JPY=X` | USD/JPY |
| `nasdaq` | `^IXIC` | NASDAQ |
| `sp500` | `^GSPC` | S&P 500 |
| `us10y` | `^TNX` | U.S. 10-year Treasury yield |


## DTO

Use Request / Response DTOs rather than returning Entities directly from Controllers.


## Analytics Communication

Analytics does not currently provide a publicly accessible API. The daily batch calls the Spring Boot Internal Market Data API using `httpx`.


## Stock Data Provider

StockHub uses yfinance from Analytics’ `providers/`.

For the future IndexArena, switching to marketstack or a similar provider is anticipated.

Do not make business logic directly dependent on provider-specific specifications. Convert data retrieved from a provider to a common model before using it.
