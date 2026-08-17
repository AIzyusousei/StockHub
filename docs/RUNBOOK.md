# Runbook

## 起動順序

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

Backend APIは`http://localhost:8080`で起動する。

## Analytics batch

初回または日次更新時に別ターミナルで実行する。

```powershell
cd C:\Universe\Projects\StockHub\analytics
uv sync
$env:STOCKHUB_BACKEND_URL = "http://localhost:8080"
uv run stockhub-update-market-data
```

初回は約3か月分、通常更新時は最新保存日から数日前を取得する。
DBへの保存はSpring BootのUPSERT APIが行う。

## Frontend

```powershell
cd C:\Universe\Projects\StockHub\frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

`frontend/.env.local`には以下を設定する。

```env
BACKEND_API_URL=http://localhost:8080
```

Frontendは`http://localhost:3000`で起動し、`/demo-user/hub`へアクセスする。

## DB初期化

Migrationは`backend/src/main/resources/db/migration/V1__create_market_daily_prices.sql`にある。
接続ユーザーに`public`スキーマの作成権限がない環境では、DB管理者で権限を付与してから
Migrationを適用する。パスワードなどの秘密情報はリポジトリへ保存しない。
