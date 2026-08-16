# StockHub 開発AI向け説明書

## Abstract

StockHubは、株式投資の投資判断に向けた分析を行うwebアプリである。
ウォッチリスト、自作indexの作成、自作スクリーニング法の作成などが行えるアプリになる予定である。

## Stack

- frontend: Next.js/ tailwindCSS
- backend: Java Spring Boot/ Spring Doma
- analytics: Python
- database: PostgreSQL
- api: (for stock information: yfinance) 


# Documentation

各要素の詳細な指定は、以下に存在する。関連する実装を行う場合、当該documentを参照すること。
- basic information: AGENTS.md
- System Architecture: docs/ARCHITECTURE.md
- Feature detail: docs/FEATURES.md
- Database design: docs/DATABASE.md
- API design: docs/API.md
- Directory design: docs/DIRECTORY.md

# Future Development

StockHubは、将来的なIndexArenaの開発を前提として設計する。

IndexArenaでは、StockHubの機能を基盤として、
自作Indexの共有・比較・競争や、投資家全体の情報を利用した分析機能を追加する予定である。

StockHubではyfinanceを利用するが、
IndexArenaではmarketstack等の別data providerへ変更する可能性がある。

そのため、business logicを特定のdata providerへ直接依存させないこと。

ただし、将来拡張のための過度な実装は行わない。


# Development Rules

- 実装前に関連codeとdocumentationを確認する
- 既存の設計・命名・directory構造を優先する
- 無関係なfileを変更しない
- 不要なdependencyやabstractionを追加しない
- Frontendからdatabaseやstock data providerへ直接アクセスしない
- Backendは原則 Controller → Service → DAO の依存方向とする
- Database accessにはDomaを使用する
- ControllerからEntityを直接responseとして返さない
