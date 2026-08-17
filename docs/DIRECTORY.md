# Directory

## Root

- `frontend/`: Next.js
- `backend/`: Spring Boot
- `analytics/`: Python
- `docs/`: 設計・仕様document

## Frontend

- `app/`: page・layout・routing
- `components/`: 共通UI component
- `lib/api/`: Backend API client
- `lib/mapper/`: API responseから画面表示modelへの変換
- `mocks/`: Frontend専用のモックデータ
- `types/`: 共通TypeScript型
- `utils/`: 汎用utility

## Backend

- `controller/`: HTTP request / response
- `service/`: business logic
- `dao/`: Domaによるdatabase access
- `entity/`: database entity
- `dto/`: data transfer object
- `config/`: application設定

Entity・DTOのaccessorとconstructorはLombokで生成する。

## Analytics

- `clients/`: AnalyticsからSpring Boot内部APIへの通信
- `providers/`: yfinanceなどの外部サービスとの通信
- `dto/`: Analytics内部で受け渡すデータ構造
- `jobs/`: 定期実行・バッチ処理のエントリーポイント
- `core/`: 設定などAnalytics共通の基盤機能

AnalyticsはDB接続用の`repositories/`を持たず、DBの読み書きはSpring Bootへ委譲する。
