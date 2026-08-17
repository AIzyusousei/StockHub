SELECT MAX(price.trading_date)
FROM market_daily_price price
JOIN market_instrument instrument
  ON instrument.id = price.instrument_id
WHERE instrument.code = /* instrumentCode */'nikkei'
