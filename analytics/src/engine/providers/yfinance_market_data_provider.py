from datetime import date, timedelta
from decimal import Decimal

import pandas as pd
import yfinance as yf

from engine.dto.market_daily_price import MarketDailyPrice


def _decimal(value: object) -> Decimal:
    return Decimal(str(float(value)))


class YFinanceMarketDataProvider:
    def fetch_daily_prices(
        self, provider_symbol: str, start_date: date, end_date: date
    ) -> list[MarketDailyPrice]:
        frame = yf.download(
            provider_symbol,
            start=start_date.isoformat(),
            end=(end_date + timedelta(days=1)).isoformat(),
            interval="1d",
            auto_adjust=False,
            actions=False,
            progress=False,
            threads=False,
        )
        if frame.empty:
            return []

        if isinstance(frame.columns, pd.MultiIndex):
            frame.columns = frame.columns.get_level_values(0)

        prices: list[MarketDailyPrice] = []
        for index, row in frame.iterrows():
            required = row[["Open", "High", "Low", "Close"]]
            if required.isna().any():
                continue

            adjusted_close = row.get("Adj Close")
            volume = row.get("Volume")
            prices.append(
                MarketDailyPrice(
                    trading_date=index.date(),
                    open=_decimal(row["Open"]),
                    high=_decimal(row["High"]),
                    low=_decimal(row["Low"]),
                    close=_decimal(row["Close"]),
                    adjusted_close=(
                        None
                        if adjusted_close is None or pd.isna(adjusted_close)
                        else _decimal(adjusted_close)
                    ),
                    volume=(None if volume is None or pd.isna(volume) else int(volume)),
                )
            )
        return prices
