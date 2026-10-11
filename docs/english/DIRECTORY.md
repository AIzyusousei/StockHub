# Directory

## Root

- `frontend/`: Next.js
- `backend/`: Spring Boot
- `analytics/`: Python
- `docs/`: Design and specification documents



## Frontend

- `app/`: Pages, layouts, and routing. Components used only on a specific screen are also placed under that screen.
- `features/`: Frontend implementations organized by feature
  - `diary/`: Investment diary
  - `orgindex/`: Custom index
  - `recommendation/`: Recommendations
  - `screening/`: Screening
  - `watchlist/`: Watchlist
- `features/<feature>/components/`: Components shared by multiple screens within the same feature
- `features/<feature>/hooks/`: Custom hooks specific to the feature
- `features/<feature>/api/`: Backend API communication specific to the feature
- `features/<feature>/api/mapper/`: Conversion between API responses / requests and Frontend models
- `features/<feature>/api/types/`: API request / response types
- `features/<feature>/mocks/`: Mocks specific to the feature
- `features/<feature>/types/`: TypeScript types used within the feature
- `features/<feature>/utils/`: Utilities specific to the feature
- `components/`: Shared UI components used by multiple features
- `hooks/`: Shared custom hooks used by multiple features
- `lib/api/`: Shared client for Backend API communication
- `lib/auth/`: Shared authentication and authorization logic
- `mocks/`: Mock infrastructure for the entire Frontend
- `types/`: Shared TypeScript types used by multiple features
- `utils/`: General-purpose utilities



## Backend

The Java package root is `src/main/java/com/stockhub/backend/`.

- `auth/`: Authentication and login
- `diary/`: Investment diary
- `orgindex/`: Custom index
- `recommendation/`: Recommendations
- `screening/`: Screening
- `stock/`: Stock domain used by multiple features, including stock information and stock search
- `watchlist/`: Watchlist
- `common/`: Shared logic that does not belong to a specific feature
  - `config/`: Application and framework configuration
  - `exception/`: Common exceptions and exception handling
  - `security/`: Authentication and authorization infrastructure, such as Spring Security
  - `validation/`: Shared validation
  - `dto/`: DTOs used across features
  - `entity/`: Shared entities used across features
  - `util/`: General-purpose utilities

Place the following as needed within each feature / domain:

- `controller/`: HTTP requests / responses
- `service/`: Business logic
- `dao/`: Database access using Doma
- `entity/`: Database entities
- `dto/`: Data transfer objects

Accessors and constructors for entities and DTOs are generated with Lombok.

Doma external SQL files are placed under `src/main/resources/META-INF/com/stockhub/backend/`, using a structure corresponding to the feature and DAO packages on the Java side.



## Analytics

engine/

- `common/`: Shared infrastructure used throughout Analytics
  - `config/`: Settings and environment variables
  - `exceptions/`: Common exceptions
- `clients/`: Communication from Analytics to other services
  - `backend/`: Communication with internal Spring Boot APIs
- `acquisition/`: External data retrieval and normalization
  - `market_data/`: Retrieval of market data such as stock prices and trading volume
    - `providers/`: External data providers such as yfinance and marketstack
- `analysis/`: Analysis using acquired data
  - `indicators/`: Calculation of technical indicators such as MACD and RSI
  - `screening/`: Screening condition evaluation and analysis
  - `orgindex/`: Weighting and index value calculation for the custom index
- `jobs/`: Entry points for scheduled and batch processing

Place data retrieval processes in `acquisition/` and analysis logic in `analysis/`.

Place technical shared logic used throughout Analytics, such as settings and exceptions, in `common/`. Do not place domain-specific models or logic in `common/`; place them under their respective domains.

Analytics does not have `repositories/` for database connections. Database reads and writes are delegated to Spring Boot.



## docs

- Basic information: AGENTS.md
- System Architecture: docs/english/ARCHITECTURE.md
- Feature detail: docs/english/FEATURES.md
- Database design: docs/english/DATABASE.md
- API design: docs/english/API.md
- Directory design: docs/english/DIRECTORY.md
- Implementation procedures and implementation reference materials: docs/english/implements
- Specifications for each feature: docs/english/specification
- Notes for humans: docs/engish/forHuman




## Directory Policy

Use a feature-based structure as the default, placing closely related code near one another.

When implementing, follow the directory structures described under `## frontend`, `## backend`, and `## analytics` in this Markdown file, and implement in the appropriate files.

For the frontend, separate code into “screen-specific → `app/`,” “shared within a feature → `features/`,” and “shared across the application → directly under `src`.”

For the backend, organize by feature or domain, and divide the contents into layers such as `controller`, `service`, and `dao`. Even if something is used by multiple features, if it belongs to a clearly defined domain, that domain should own it rather than placing it in `common/`.

This limits the scope of the search when making changes and reduces the amount of code exploration required by both people and Coding Agents.