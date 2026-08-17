from collections.abc import Sequence
from datetime import date
from typing import Protocol, Self

import httpx

from engine.dto.market_daily_price import MarketDailyPrice


class MarketDataStore(Protocol):
    def find_latest_date(self, instrument_code: str) -> date | None: ...

    def upsert_prices(
        self, instrument_code: str, prices: Sequence[MarketDailyPrice]
    ) -> int: ...


class MarketDataBackendClient:
    def __init__(self, backend_url: str, timeout_seconds: float = 30.0) -> None:
        self._client = httpx.Client(
            base_url=backend_url.rstrip("/"),
            timeout=timeout_seconds,
        )

    def find_latest_date(self, instrument_code: str) -> date | None:
        response = self._client.get(
            f"/api/internal/market-data/{instrument_code}/latest-date"
        )
        response.raise_for_status()
        latest_date = response.json()["latestDate"]
        return None if latest_date is None else date.fromisoformat(latest_date)

    def upsert_prices(
        self, instrument_code: str, prices: Sequence[MarketDailyPrice]
    ) -> int:
        if not prices:
            return 0

        response = self._client.post(
            "/api/internal/market-data/daily-prices",
            json={
                "instrumentCode": instrument_code,
                "prices": [
                    {
                        "date": price.trading_date.isoformat(),
                        "open": str(price.open),
                        "high": str(price.high),
                        "low": str(price.low),
                        "close": str(price.close),
                        "adjustedClose": (
                            None
                            if price.adjusted_close is None
                            else str(price.adjusted_close)
                        ),
                        "volume": price.volume,
                    }
                    for price in prices
                ],
            },
        )
        response.raise_for_status()
        return int(response.json()["upsertedRows"])

    def close(self) -> None:
        self._client.close()

    def __enter__(self) -> Self:
        return self

    def __exit__(self, *args: object) -> None:
        self.close()
