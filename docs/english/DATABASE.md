# Database

PostgreSQL is used for the database.

This document is maintained as an inventory of the database structure
and must be updated whenever the schema changes.

## Rules

- Table and column names use snake_case.
- Set foreign keys for relations.
- Set the required UNIQUE constraints.
- Only Spring Boot Doma DAOs handle reads and writes to PostgreSQL.
- Analytics and the Frontend do not connect directly to PostgreSQL.


## Schema

### market_instrument

Master data for the market indicators displayed in Market Overview.

| column | type | constraint |
|---|---|---|
| id | BIGSERIAL | PRIMARY KEY |
| code | VARCHAR(32) | NOT NULL, UNIQUE |
| display_name | VARCHAR(100) | NOT NULL |
| display_order | INTEGER | NOT NULL |
| created_at | TIMESTAMPTZ | NOT NULL |
| updated_at | TIMESTAMPTZ | NOT NULL |

### market_daily_price

Daily OHLC data received from Analytics and stored by Spring Boot. The composite
UNIQUE constraint on `instrument_id` and `trading_date` is used as the UPSERT
conflict key.

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

The initial migration seeds six types of `market_instrument`. Analytics fetches
daily data, while Spring Boot's `MarketDataIngestionService` and Doma DAOs handle
storage and UPSERT operations.

## Initial setup

Specify the Backend connection settings using environment variables.

```text
STOCKHUB_JDBC_URL=jdbc:postgresql://localhost:5432/stockhub
STOCKHUB_DB_USER=stockhub_user
STOCKHUB_DB_PASSWORD=<DB password>
```

In environments where `stockhub_user` does not have permission to create objects
in the `public` schema, have a database administrator grant the required
permissions before applying the migration above.
