SELECT
    instrument.code AS instrument_code,
    instrument.display_name,
    instrument.display_order,
    price.trading_date,
    price.open,
    price.high,
    price.low,
    price.close
FROM market_daily_price price
JOIN market_instrument instrument
  ON instrument.id = price.instrument_id
WHERE price.trading_date >= /* fromDate */'2000-01-01'
ORDER BY instrument.display_order, price.trading_date
