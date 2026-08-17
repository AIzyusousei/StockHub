# Directory

## Root

- `frontend/`: Next.js
- `backend/`: Spring Boot
- `analytics/`: Python
- `docs/`: 設計・仕様document


## Frontend

- `app/`: page・layout・routing
- `components/`: 共通UI component
- `features/`: feature固有の実装
- `hooks/`: 共通custom hooks
- `lib/`: API client等の外部接続処理
- `types/`: 共通TypeScript型
- `utils/`: 汎用utility


## Backend

- `controller/`: HTTP request / response
- `service/`: business logic
- `dao/`: Domaによるdatabase access
- `entity/`: database entity
- `dto/`: data transfer object
- `config/`: application設定


## Analytics

- `clients/`: AnalyticsからSpring Boot内部APIへの通信を担当する。

株式データ取得・分析・計算処理を配置する。

- `api/`: FastAPIのエンドポイントを定義する。外部からAnalyticsを呼び出すためのHTTPインターフェースを担当する。
- `logic/`: アプリケーションの処理フローを定義する。ProviderやRepository、分析処理を組み合わせ、ユースケース単位の処理を実行する。
- `providers/`: yfinanceなどの外部サービスとの通信を担当する。外部API・ライブラリ固有の処理をAnalytics内部から分離する。
- `dto/`: 各レイヤー間で受け渡すデータ構造を定義する。APIの入出力や取得データ、分析結果などを型として表現する。
- `jobs/`: 定期実行・バッチ処理のエントリーポイントを定義する。日次株価更新など、APIリクエストとは独立して実行する処理を配置する。
- `core/`: Analytics全体で共通して使用する基盤機能を配置する。環境変数、設定、DB接続、ログ設定などを管理する。
