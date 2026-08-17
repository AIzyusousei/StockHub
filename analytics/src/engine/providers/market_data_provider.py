from datetime import date
from typing import Protocol

from engine.dto.market_daily_price import MarketDailyPrice


class MarketDataProvider(Protocol):
    def fetch_daily_prices(
        self, provider_symbol: str, start_date: date, end_date: date
    ) -> list[MarketDailyPrice]: ...
