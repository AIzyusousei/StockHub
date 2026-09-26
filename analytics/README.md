# StockHub Analytics

## Market data update batch

The batch downloads daily OHLC data with yfinance and sends it to the Spring Boot
internal API. Only Spring Boot reads from and writes to PostgreSQL through Doma.
Start the Backend first so that Flyway creates the database tables and the
internal ingestion API is available.

```powershell
uv sync
$env:STOCKHUB_BACKEND_URL = "http://localhost:8080"
uv run stockhub-update-market-data
```

The first run fetches approximately three months. Later runs start five days
before the newest stored trading date, so corrected prices are safely updated
without creating duplicate rows.

An optional end date can be supplied for backfills or reproducible runs:

```powershell
uv run stockhub-update-market-data --as-of 2026-08-17
```

Register the command above in cron, systemd timer, or Windows Task Scheduler to
run once per day. Spring Boot performs the UPSERT, and the
`(instrument_id, trading_date)` unique constraint makes repeated executions
idempotent.

### Instruments

| Code | yfinance symbol | Market |
|---|---|---|
| `nikkei` | `^N225` | Nikkei 225 |
| `topix` | `1306.T` | TOPIX-linked ETF proxy |
| `usd-jpy` | `JPY=X` | USD/JPY |
| `nasdaq` | `^IXIC` | NASDAQ Composite |
| `sp500` | `^GSPC` | S&P 500 |
| `us10y` | `^TNX` | U.S. 10-year Treasury yield |

Yahoo Finance currently does not expose the broad TOPIX index through its
global chart endpoint. `1306.T`, a liquid TOPIX-linked ETF, is used as the
yfinance-compatible proxy until the provider is replaced or direct coverage
becomes available.
