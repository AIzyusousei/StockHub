# Database

DatabaseにはPostgreSQLを使用する。

本documentをdatabase構造の一覧として管理し、
schema変更時に更新する。

## Rules

- table / column名はsnake_case
- relationにはForeign Keyを設定する
- 必要なUNIQUE constraintを設定する


## Schema

実装したtableについて、
column・type・constraint・relationを本documentに追記する。