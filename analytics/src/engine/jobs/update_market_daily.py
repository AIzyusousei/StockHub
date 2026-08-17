import argparse
import logging
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from engine.clients.market_data_backend_client import (
    MarketDataBackendClient,
    MarketDataStore,
)
from engine.core.config import Settings
from engine.dto.market_daily_price import MarketInstrument
from engine.providers.market_data_provider import MarketDataProvider
from engine.providers.yfinance_market_data_provider import YFinanceMarketDataProvider

LOGGER = logging.getLogger(__name__)
INITIAL_LOOKBACK_DAYS = 93
REFETCH_DAYS = 5

MARKET_INSTRUMENTS = (
    MarketInstrument("nikkei", "^N225"),
    # Yahoo Finance does not currently expose the broad TOPIX index globally.
    # 1306.T is the liquid TOPIX-linked ETF used as the yfinance proxy.
    MarketInstrument("topix", "1306.T"),
    MarketInstrument("usd-jpy", "JPY=X"),
    MarketInstrument("nasdaq", "^IXIC"),
    MarketInstrument("sp500", "^GSPC"),
    MarketInstrument("us10y", "^TNX"),
)


@dataclass(frozen=True)
class UpdateResult:
    instrument_code: str
    start_date: date
    end_date: date
    upserted_rows: int


class UpdateMarketDailyJob:
    def __init__(
        self,
        provider: MarketDataProvider,
        market_data_store: MarketDataStore,
    ) -> None:
        self._provider = provider
        self._market_data_store = market_data_store

    def run(self, as_of: date) -> list[UpdateResult]:
        results: list[UpdateResult] = []

        for instrument in MARKET_INSTRUMENTS:
            latest_date = self._market_data_store.find_latest_date(instrument.code)
            start_date = (
                as_of - timedelta(days=INITIAL_LOOKBACK_DAYS)
                if latest_date is None
                else latest_date - timedelta(days=REFETCH_DAYS)
            )
            prices = self._provider.fetch_daily_prices(
                instrument.provider_symbol, start_date, as_of
            )
            upserted_rows = self._market_data_store.upsert_prices(
                instrument.code, prices
            )
            results.append(
                UpdateResult(instrument.code, start_date, as_of, upserted_rows)
            )
            LOGGER.info(
                "Updated %s from %s to %s: %d rows",
                instrument.code,
                start_date,
                as_of,
                upserted_rows,
            )
        return results


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Update daily market data")
    parser.add_argument(
        "--as-of",
        type=date.fromisoformat,
        default=datetime.now(ZoneInfo("Asia/Tokyo")).date(),
        help="inclusive end date (YYYY-MM-DD)",
    )
    return parser.parse_args()


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    args = _parse_args()
    settings = Settings.from_environment()
    with MarketDataBackendClient(settings.backend_url) as market_data_store:
        job = UpdateMarketDailyJob(
            YFinanceMarketDataProvider(),
            market_data_store,
        )
        job.run(args.as_of)


if __name__ == "__main__":
    main()
