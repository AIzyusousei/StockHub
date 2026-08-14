# StockHub 開発指針

## プロジェクト概要

StockHubは、株式のウォッチリスト、チャート分析、
テクニカル指標、スクリーニング、仮想ポートフォリオ競争、
独自指標および独自指数の作成機能を提供するWebアプリである。

## 技術構成

- frontend: Next.js / TypeScript
- backend: Spring Boot / Java / Doma
- analytics: Python
- database: PostgreSQL

## 責務

### frontend

- 画面表示
- ユーザー入力
- チャート描画
- Spring Boot APIの呼び出し

### backend

- 認証・認可
- ユーザー管理
- ウォッチリスト
- ポートフォリオ
- スクリーニング
- DB操作
- Python処理の呼び出し

### analytics

- 市場データ取得
- テクニカル指標計算
- 独自指標計算
- 独自指数計算
- ポートフォリオ分析

## 基本ルール

- frontendからanalyticsを直接呼ばない
- 外部向けAPIの入口は原則Spring Bootとする
- Domaを使用し、Spring Data JPAは使用しない
- SQLは原則DomaのSQLファイルに記述する
- 秘密情報をGitへコミットしない
- 大量計算は同期API内で実行しない