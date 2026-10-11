# StockHub Guide for AI Developers

## Abstract

StockHub is a web app for analyzing stocks to support investment decisions.  
It allows users to create watchlists, custom indexes, and custom screening methods.

## Stack

- frontend: Next.js/ tailwindCSS handles frontend tasks such as the UI, screen state, and user interactions.
- backend: Java Spring Boot/ Spring Doma handles backend tasks such as application logic and authentication and authorization.
- analytics: Python handles analytical tasks such as data retrieval and statistical processing.
- database: PostgreSQL
- api: (for stock information: yfinance)


## Documentation

Detailed specifications for each element are available in the documents below. Refer to the relevant document when implementing related features.
- Basic information: AGENTS.md
- System Architecture: docs/english/ARCHITECTURE.md
- Feature details: docs/english/FEATURES.md
- Database design: docs/english/DATABASE.md
- API design: docs/english/API.md
- Directory design: docs/english/DIRECTORY.md

## Future Development

StockHub is designed with the future development of IndexArena in mind.  
IndexArena is planned to build on StockHub’s features and add the ability to share, compare, and compete with custom indexes, as well as analytical features that use information from investors as a whole.

StockHub uses yfinance, but IndexArena may switch to a different data provider, such as marketstack. Therefore, do not make the business logic directly dependent on a specific data provider.

However, do not over-engineer the implementation for future extensibility.

## Development Rules

- [Important] Implement features using simple syntax that is easy for React, Java, and Python beginners to understand. However, complex logic is acceptable.
- Respect the directory structure described in `C:\Universe\Projects\StockHub\docs\japanese\DIRECTORY.md` when implementing features.