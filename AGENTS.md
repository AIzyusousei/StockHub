# Instructions for StockHub Development AI

## Abstract

StockHub is a web application that performs analyses to support stock investment decisions.
It is an application that allows users to create watchlists, custom indexes, and custom screening methods.

## Stack

- frontend: Next.js/ tailwindCSS handles frontend processing such as the UI, screen state, and user interactions.
- backend: Java Spring Boot/ Spring Doma handles backend processing such as application logic and authentication/authorization.
- analytics: Python handles analysis processing such as data retrieval and statistical processing.
- database: PostgreSQL
- api: (for stock information: yfinance)

# Documentation

Detailed specifications for each component are available in the documents below.
When implementing related functionality, refer to the relevant document.
- basic information: AGENTS.md
- System Architecture: docs/english/ARCHITECTURE.md
- Feature detail: docs/english/FEATURES.md
- Database design: docs/english/DATABASE.md
- API design: docs/english/API.md
- Directory design: docs/english/DIRECTORY.md

# Future Development

StockHub is designed with the future development of IndexArena in mind.

IndexArena is planned to build on StockHub's functionality and add features for sharing, comparing, and competing with custom indexes, as well as analysis using information from investors as a whole.

StockHub uses yfinance, but IndexArena may switch to another data provider, such as marketstack.

Therefore, business logic must not directly depend on a specific data provider.

However, do not overengineer for future extensibility.

# Development Rules

- [Important] Use simple syntax that is easy for beginners in React/Java/Python to understand. However, complexity in the logic itself is acceptable.
- Do not access the database or stock data provider directly from the frontend; route access through the backend.
- Do not access the database directly from analytics; route access through the backend.
- As a rule, the dependency direction in the backend should be Controller → Service → DAO.
- Use Doma for database access.
- Do not return Entities directly as responses from Controllers.
