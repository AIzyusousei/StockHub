INSERT INTO market_daily_price (
    instrument_id,
    trading_date,
    open,
    high,
    low,
    close,
    adjusted_close,
    volume
)
VALUES (
    /* price.instrumentId */0,
    /* price.tradingDate */'2000-01-01',
    /* price.open */0,
    /* price.high */0,
    /* price.low */0,
    /* price.close */0,
    /* price.adjustedClose */0,
    /* price.volume */0
)
ON CONFLICT (instrument_id, trading_date) DO UPDATE SET
    open = EXCLUDED.open,
    high = EXCLUDED.high,
    low = EXCLUDED.low,
    close = EXCLUDED.close,
    adjusted_close = EXCLUDED.adjusted_close,
    volume = EXCLUDED.volume,
    updated_at = CURRENT_TIMESTAMP
