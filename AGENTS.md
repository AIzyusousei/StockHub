# StockHub 開発AI向け説明書

## Abstract

StockHubは、株式投資の投資判断に向けた分析を行うwebアプリである。
ウォッチリスト、自作indexの作成、自作スクリーニング法の作成などが行えるアプリである。

## Stack

- frontend: Next.js/ tailwindCSS でUI・画面状態・ユーザー操作などのfrontend処理を担当する。
- backend: Java Spring Boot/ Spring Doma でアプリケーションロジック・認証認可などのbackend処理を担当する。
- analytics: Python でデータ取得・統計処理などの分析処理を担当する。
- database: PostgreSQL
- api: (for stock information: yfinance) 


# Documentation

各要素の詳細な指定は、以下に存在する。関連する実装を行う場合、当該documentを参照すること。
- basic information: AGENTS.md
- System Architecture: docs/englihs/ARCHITECTURE.md
- Feature detail: docs/english/FEATURES.md
- Database design: docs/english/DATABASE.md
- API design: docs/english/API.md
- Directory design: docs/english/DIRECTORY.md 

# Future Development

StockHubは、将来的なIndexArenaの開発を前提として設計する。

IndexArenaでは、StockHubの機能を基盤として、
自作Indexの共有・比較・競争や、投資家全体の情報を利用した分析機能を追加する予定である。

StockHubではyfinanceを利用するが、
IndexArenaではmarketstack等の別data providerへ変更する可能性がある。

そのため、business logicを特定のdata providerへ直接依存させないこと。

ただし、将来拡張のための過度な実装は行わない。


# Development Rules

- [重要]react/ java/ python初心者に対して理解しやすい、簡単な文法を使用する実装にすること。ただし、ロジックの難解さは許容するものとする。
- Frontendからdatabaseやstock data providerへ直接アクセスせず、backendを介する形とする。
- analyticsからdatabaseへ直接アクセスせず、backendを介する形とする。
- Backendは原則 Controller → Service → DAO の依存方向とする
- Database accessにはDomaを使用する
- ControllerからEntityを直接responseとして返さない