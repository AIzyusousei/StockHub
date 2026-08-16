# Architecture

## System

StockHubは以下で構成する。

- Frontend: Next.js
- Backend: Spring Boot + Doma
- Analytics: Python
- Database: PostgreSQL

基本構成:

Frontend
↓ REST API
Backend
├─ PostgreSQL
└─ Analytics


## Responsibilities

### Frontend

UI・ユーザー操作・Backend APIとの通信を担当する。

### Backend

REST API・business logic・database accessを担当する。

Controller
↓
Service
↓
DAO
↓
PostgreSQL

### Analytics

株式データ取得・分析・計算を担当する。