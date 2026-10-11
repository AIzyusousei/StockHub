# Runbook

## Startup Order

```text
PostgreSQL → Spring Boot Backend → Analytics batch → Next.js Frontend
```

## Backend

```powershell
cd C:\Universe\Projects\StockHub\backend
$env:STOCKHUB_DB_PASSWORD = "<DB password>"
$env:STOCKHUB_DB_USER = "stockhub_user"
$env:STOCKHUB_JDBC_URL = "jdbc:postgresql://localhost:5432/stockhub"
.\gradlew.bat bootRun
```

The Backend API starts at `http://localhost:8080`.

## Analytics batch

Run this in a separate terminal for the initial setup or daily updates.

```powershell
cd C:\Universe\Projects\StockHub\analytics
uv sync
$env:STOCKHUB_BACKEND_URL = "http://localhost:8080"
uv run stockhub-update-market-data
```

On the first run, it fetches approximately three months of data. For regular updates, it fetches data starting a few days before the most recent saved date.
The Spring Boot UPSERT API handles saving data to the DB.

## Frontend

```powershell
cd C:\Universe\Projects\StockHub\frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set the following in `frontend/.env.local`:

```env
BACKEND_API_URL=http://localhost:8080
```

The Frontend starts at `http://localhost:3000`. Navigate to `/demo-user/hub`.

## DB Initialization

The migration is located at `backend/src/main/resources/db/migration/V1__create_market_daily_prices.sql`.
In environments where the connection user does not have permission to create the `public` schema, grant the permission as a DB administrator before applying the migration. Do not store secrets such as passwords in the repository.
