# Database

DatabaseにはPostgreSQLを使用する。

本documentをdatabase構造の一覧として管理し、
schema変更時に更新する。

## Rules

- table / column名はsnake_case
- relationにはForeign Keyを設定する
- 必要なUNIQUE constraintを設定する
- PostgreSQLへの読み書きはSpring BootのDoma DAOだけが担当する
- AnalyticsとFrontendはPostgreSQLへ直接接続しない


## Schema

### market_instrument

Market Overviewに表示する市場指標のマスタ。

| column | type | constraint |
|---|---|---|
| id | BIGSERIAL | PRIMARY KEY |
| code | VARCHAR(32) | NOT NULL, UNIQUE |
| display_name | VARCHAR(100) | NOT NULL |
| display_order | INTEGER | NOT NULL |
| created_at | TIMESTAMPTZ | NOT NULL |
| updated_at | TIMESTAMPTZ | NOT NULL |

### market_daily_price

Analyticsから受け取ったデータをSpring Bootが保存する日足OHLC。`instrument_id` と
`trading_date` の複合UNIQUE制約をUPSERTの競合キーに使用する。

| column | type | constraint |
|---|---|---|
| id | BIGSERIAL | PRIMARY KEY |
| instrument_id | BIGINT | NOT NULL, FK market_instrument(id) |
| trading_date | DATE | NOT NULL |
| open | NUMERIC(20,8) | NOT NULL |
| high | NUMERIC(20,8) | NOT NULL |
| low | NUMERIC(20,8) | NOT NULL |
| close | NUMERIC(20,8) | NOT NULL |
| adjusted_close | NUMERIC(20,8) | nullable |
| volume | BIGINT | nullable |
| created_at | TIMESTAMPTZ | NOT NULL |
| updated_at | TIMESTAMPTZ | NOT NULL |

Migration: `backend/src/main/resources/db/migration/V1__create_market_daily_prices.sql`

初期Migrationでは6種類の`market_instrument`をseedする。日次データの取得はAnalytics、
保存とUPSERTはSpring Bootの`MarketDataIngestionService`およびDoma DAOが担当する。

## Initial setup

Backendの接続先は環境変数で指定する。

```text
STOCKHUB_JDBC_URL=jdbc:postgresql://localhost:5432/stockhub
STOCKHUB_DB_USER=stockhub_user
STOCKHUB_DB_PASSWORD=<DB password>
```

`stockhub_user`に`public`スキーマの作成権限がない環境では、DB管理者で権限を付与してから
上記Migrationを適用する。
