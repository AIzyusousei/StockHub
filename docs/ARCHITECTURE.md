# Architecture

## System

StockHubは以下で構成する。

- Frontend: Next.js / Tailwind CSS
- Backend: Spring Boot / Doma / Lombok
- Analytics: Python / yfinance
- Database: PostgreSQL

基本構成:

```text
Next.js Frontend
    ↓ REST API
Spring Boot Backend
    ├─ Doma DAO → PostgreSQL
    └─ Internal API ← Analytics batch
                         ↓
                       yfinance
```

## Responsibilities

### Frontend

UI・ユーザー操作・Backend APIとの通信を担当する。FrontendはPostgreSQLや
yfinanceへ直接アクセスしない。

### Backend

REST API・business logic・database accessを担当する。依存方向は以下とする。

```text
Controller → Service → DAO → PostgreSQL
```

ControllerからDoma Entityを直接返さず、DTOへ変換して返す。

### Analytics

株式データ取得・分析・計算を担当する。Market Overviewの日次バッチは、
`yfinance`で日足データを取得し、Spring Boot内部APIへ送信する。
AnalyticsはPostgreSQLへ直接接続しない。

### Market data flow

`yfinance → Analytics daily batch → Spring Boot internal API → PostgreSQL → Spring Boot REST API → Next.js`

provider固有のシンボルとDataFrame変換はAnalyticsの`providers/`に閉じ込める。

