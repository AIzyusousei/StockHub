# Architecture

## System

StockHubは以下で構成する。

- Frontend: Next.js / Tailwind CSS
- Backend: Spring Boot / Doma / Lombok
- Analytics: Python / yfinance
- Database: PostgreSQL

- frontend: Next.js/ tailwindCSS でUI・画面状態・ユーザー操作などのfrontend処理を担当する。
- backend: Java Spring Boot/ Spring Doma でアプリケーションロジック・認証認可などのbackend処理を担当する。
- analytics: Python でデータ取得・統計処理などの分析処理を担当する。

## Responsibilities

### Frontend

UI・ユーザー操作・Backend APIとの通信を担当する。FrontendはPostgreSQLや
yfinanceへ直接アクセスしない。
アイコンは、react-lucideを使用すること。

### Backend

REST API・business logic・database accessを担当する。依存方向は以下とする。

Controller → Service → DAO → PostgreSQL

ControllerからDoma Entityを直接返さず、DTOへ変換して返す。

### Analytics

株式データ取得・分析・計算を担当する。Market Overviewの日次バッチは、
`yfinance`で日足データを取得し、Spring Boot内部APIへ送信する。
AnalyticsはPostgreSQLへ直接接続しない。