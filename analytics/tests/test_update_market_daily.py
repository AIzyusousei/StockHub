from datetime import date, timedelta

from engine.dto.market_daily_price import MarketDailyPrice
from engine.jobs.update_market_daily import (
    INITIAL_LOOKBACK_DAYS,
    MARKET_INSTRUMENTS,
    REFETCH_DAYS,
    UpdateMarketDailyJob,
)


class FakeProvider:
    def __init__(self) -> None:
        self.calls: list[tuple[str, date, date]] = []

    def fetch_daily_prices(
        self, provider_symbol: str, start_date: date, end_date: date
    ) -> list[MarketDailyPrice]:
        self.calls.append((provider_symbol, start_date, end_date))
        return []


class FakeMarketDataStore:
    def __init__(self, latest_dates: dict[str, date | None]) -> None:
        self.latest_dates = latest_dates

    def find_latest_date(self, instrument_code: str) -> date | None:
        return self.latest_dates.get(instrument_code)

    def upsert_prices(
        self, instrument_code: str, prices: list[MarketDailyPrice]
    ) -> int:
        return len(prices)


def test_initial_run_fetches_about_three_months() -> None:
    as_of = date(2026, 8, 17)
    provider = FakeProvider()
    market_data_store = FakeMarketDataStore({})

    UpdateMarketDailyJob(provider, market_data_store).run(as_of)

    assert len(provider.calls) == len(MARKET_INSTRUMENTS)
    assert provider.calls[0][1] == as_of - timedelta(days=INITIAL_LOOKBACK_DAYS)
    assert provider.calls[0][2] == as_of


def test_incremental_run_refetches_recent_days_for_upsert() -> None:
    as_of = date(2026, 8, 17)
    latest = date(2026, 8, 14)
    provider = FakeProvider()
    market_data_store = FakeMarketDataStore(
        {instrument.code: latest for instrument in MARKET_INSTRUMENTS}
    )

    UpdateMarketDailyJob(provider, market_data_store).run(as_of)

    assert all(
        start_date == latest - timedelta(days=REFETCH_DAYS)
        for _, start_date, _ in provider.calls
    )
