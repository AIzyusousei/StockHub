# Directory

## Root

- `frontend/`: Next.js
- `backend/`: Spring Boot
- `analytics/`: Python
- `docs/`: 設計・仕様document



## Frontend

- `app/`: page・layout・routing。特定画面でのみ使用するcomponentも画面配下に配置
- `features/`: 機能単位のFrontend実装
  - `diary/`: 投資日記
  - `orgindex/`: 自作Index
  - `recommendation/`: 推薦
  - `screening/`: スクリーニング
  - `watchlist/`: ウォッチリスト
- `features/<feature>/components/`: 同一feature内の複数画面で使用するcomponent
- `features/<feature>/hooks/`: feature固有のcustom hook
- `features/<feature>/api/`: feature固有のBackend API通信
- `features/<feature>/api/mapper/`: API response / requestとFrontend modelの変換
- `features/<feature>/api/types/`: API request / response型
- `features/<feature>/mocks/`: feature固有のmock
- `features/<feature>/types/`: feature内部で使用するTypeScript型
- `features/<feature>/utils/`: feature固有のutility
- `components/`: 複数featureで使用する共通UI component
- `hooks/`: 複数featureで使用する共通custom hook
- `lib/api/`: Backend API通信の共通client
- `lib/auth/`: 認証・認可の共通処理
- `mocks/`: Frontend全体のmock基盤
- `types/`: 複数featureで使用する共通TypeScript型
- `utils/`: 汎用utility



## Backend

Java package rootは `src/main/java/com/stockhub/backend/` とする。

- `auth/`: 認証・ログイン関連
- `diary/`: 投資日記
- `orgindex/`: 自作Index
- `recommendation/`: 推薦
- `screening/`: スクリーニング
- `stock/`: 銘柄情報・銘柄検索など、複数featureから利用される株式domain
- `watchlist/`: ウォッチリスト
- `common/`: 特定featureに属さない共通処理
  - `config/`: application・framework設定
  - `exception/`: 共通exception・exception handling
  - `security/`: Spring Securityなどの認証・認可基盤
  - `validation/`: 共通validation
  - `dto/`: featureをまたいで使用するDTO
  - `entity/`: featureをまたいで使用する共通entity
  - `util/`: 汎用utility

各feature / domain内では必要に応じて以下を配置する。

- `controller/`: HTTP request / response
- `service/`: business logic
- `dao/`: Domaによるdatabase access
- `entity/`: database entity
- `dto/`: data transfer object

Entity・DTOのaccessorとconstructorはLombokで生成する。

Domaの外部SQLは `src/main/resources/META-INF/com/stockhub/backend/` 以下に、Java側のfeature・DAO packageと対応する構造で配置する。



## Analytics

**## Analytics**

- `common/`: Analytics全体で使用する共通基盤
  - `config/`: 設定・環境変数
  - `exceptions/`: 共通exception
- `clients/`: Analyticsから他serviceへの通信
  - `backend/`: Spring Boot内部APIとの通信
- `acquisition/`: 外部データの取得・正規化
  - `market_data/`: 株価・出来高などのmarket data取得
    - `providers/`: yfinance・marketstackなどの外部data provider
- `analysis/`: 取得済みデータを用いた分析処理
  - `indicators/`: MACD・RSIなどのtechnical indicator計算
  - `screening/`: screening条件判定・分析
  - `orgindex/`: 自作Indexのweighting・Index値計算
- `jobs/`: 定期実行・batch処理のentry point

data取得処理は`acquisition/`、分析logicは`analysis/`に配置する。

Analytics全体で使用する設定・exceptionなどの技術的な共通処理は`common/`に配置する。domain固有のmodel・処理は`common/`に置かず、それぞれのdomain配下に配置する。

AnalyticsはDB接続用の`repositories/`を持たず、DBの読み書きはSpring Bootへ委譲する。



## docs

- basic information: AGENTS.md
- System Architecture: docs/english/ARCHITECTURE.md
- Feature detail: docs/english/FEATURES.md
- Database design: docs/english/DATABASE.md
- API design: docs/english/API.md
- Directory design: docs/english/DIRECTORY.md
- 実装手順や実装用参照資料: docs/english/implements
- 各機能の仕様書: docs/english/specification
- 人間用のメモ: docs/engish/forHuman




## Directory Policy

関連性の高いコードを近くに配置するFeature-based構成を基本とする。

Frontendは「画面固有 → `app/`」「feature内共有 → `features/`」「全体共有 → `src`直下」で分ける。
Backendはfeature / domain単位で分け、その内部を`controller`・`service`・`dao`などのlayerに分ける。複数featureから使用される場合でも、明確なdomainがあるものは`common/`ではなく、そのdomainが所有する。
これにより、変更時に探索する範囲を限定し、人間およびCoding Agentのコード探索量を抑える。