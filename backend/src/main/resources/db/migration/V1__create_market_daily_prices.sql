CREATE TABLE market_instrument (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(32) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE market_daily_price (
    id BIGSERIAL PRIMARY KEY,
    instrument_id BIGINT NOT NULL REFERENCES market_instrument(id),
    trading_date DATE NOT NULL,
    open NUMERIC(20, 8) NOT NULL,
    high NUMERIC(20, 8) NOT NULL,
    low NUMERIC(20, 8) NOT NULL,
    close NUMERIC(20, 8) NOT NULL,
    adjusted_close NUMERIC(20, 8),
    volume BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_market_daily_price_instrument_date
        UNIQUE (instrument_id, trading_date),
    CONSTRAINT ck_market_daily_price_range
        CHECK (high >= low)
);

CREATE INDEX idx_market_daily_price_date
    ON market_daily_price (trading_date DESC);

INSERT INTO market_instrument (code, display_name, display_order)
VALUES
    ('nikkei', '日経平均', 1),
    ('topix', 'TOPIX', 2),
    ('usd-jpy', 'ドル円', 3),
    ('nasdaq', 'NASDAQ', 4),
    ('sp500', 'S&P500', 5),
    ('us10y', '米国10年国債利回り', 6)
ON CONFLICT (code) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    display_order = EXCLUDED.display_order,
    updated_at = CURRENT_TIMESTAMP;
