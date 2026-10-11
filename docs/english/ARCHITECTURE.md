# Architecture

## System

StockHub consists of the following:

- Frontend: Next.js / Tailwind CSS
- Backend: Spring Boot / Doma / Lombok
- Analytics: Python / yfinance
- Database: PostgreSQL

- frontend: Handles frontend tasks such as the UI, screen state, and user interactions using Next.js / Tailwind CSS.
- backend: Handles backend tasks such as application logic and authentication and authorization using Java Spring Boot / Spring Doma.
- analytics: Handles analytical tasks such as data retrieval and statistical processing using Python.

## Responsibilities

### Frontend

Responsible for the UI, user interactions, and communication with the Backend API. The Frontend does not access PostgreSQL or
yfinance directly.

Use react-lucide for icons.

### Backend

Responsible for REST APIs, business logic, and database access. Dependencies must follow this direction:

Controller → Service → DAO → PostgreSQL

Do not return Doma Entities directly from Controllers; convert them to DTOs before returning them.

### Analytics

Responsible for retrieving, analyzing, and calculating stock data. The daily Market Overview batch retrieves daily data using
`yfinance` and sends it to an internal Spring Boot API.

Analytics does not connect directly to PostgreSQL.

## Notes
- The frontend should access the database and stock data provider through the backend, not directly.
- Analytics should access the database through the backend, not directly.
- The backend should generally follow the dependency direction Controller → Service → DAO.
- Use Doma for database access.
- Controllers should not return entities directly in responses.