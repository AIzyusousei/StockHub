# API

## Internal API

FrontendとBackend間ではREST APIを使用する。

Base path:

`/api`

resource名は原則として複数形の名詞を使用する。

例:

- `GET /api/watchlists`
- `GET /api/stocks`
- `POST /api/custom-indexes`


## DTO

ControllerからEntityを直接返さず、
Request / Response DTOを使用する。


## Analytics API

BackendからAnalyticsへ、
株式分析・計算処理を要求する場合がある。


## Stock Data Provider

StockHubではyfinanceを利用予定。

将来のIndexArenaではmarketstack等への変更を想定する。

business logicをprovider固有仕様へ直接依存させず、
providerから取得したdataは共通modelへ変換して利用する。