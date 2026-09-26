# StockHub Analytics 開発ルール

このディレクトリでは、株式データの取得・分析・計算をPythonで実装する。

- PostgreSQLへ直接接続しない。データの読み書きはSpring Bootの内部APIへ委譲する。
- 外部データプロバイダー固有の処理は `src/engine/acquisition/market_data/providers/` に置く。
- 分析処理をyfinanceやmarketstackなどの特定プロバイダーへ直接依存させない。
- Spring Boot内部APIとの通信は `src/engine/clients/backend/` に置く。
- 定期実行・バッチ処理のエントリーポイントは `src/engine/jobs/` に置く。
- 初心者が理解しやすい、単純で明示的なPythonコードを優先する。
- 不要な依存ライブラリや抽象化を追加しない。
