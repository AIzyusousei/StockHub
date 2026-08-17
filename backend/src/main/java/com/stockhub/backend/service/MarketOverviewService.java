package com.stockhub.backend.service;

import com.stockhub.backend.dao.MarketDailyPriceDao;
import com.stockhub.backend.dto.MarketCandleResponse;
import com.stockhub.backend.dto.MarketOverviewItemResponse;
import com.stockhub.backend.entity.MarketDailyPriceEntity;
import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class MarketOverviewService {

    private static final ZoneId MARKET_ZONE = ZoneId.of("Asia/Tokyo");
    private static final BigDecimal ONE_HUNDRED = BigDecimal.valueOf(100);

    private final MarketDailyPriceDao marketDailyPriceDao;

    public MarketOverviewService(MarketDailyPriceDao marketDailyPriceDao) {
        this.marketDailyPriceDao = marketDailyPriceDao;
    }

    public List<MarketOverviewItemResponse> getMarketOverview() {
        LocalDate fromDate = LocalDate.now(MARKET_ZONE).minusMonths(3).minusDays(7);
        List<MarketDailyPriceEntity> rows = marketDailyPriceDao.selectRecent(fromDate);
        Map<String, List<MarketDailyPriceEntity>> grouped = new LinkedHashMap<>();

        for (MarketDailyPriceEntity row : rows) {
            grouped.computeIfAbsent(row.getInstrumentCode(), ignored -> new ArrayList<>())
                    .add(row);
        }

        return grouped.values().stream().map(this::toResponse).toList();
    }

    private MarketOverviewItemResponse toResponse(List<MarketDailyPriceEntity> rows) {
        MarketDailyPriceEntity latest = rows.getLast();
        BigDecimal previousClose = rows.size() >= 2
                ? rows.get(rows.size() - 2).getClose()
                : latest.getClose();
        BigDecimal priceChange = latest.getClose().subtract(previousClose);
        BigDecimal changeRate = previousClose.signum() == 0
                ? BigDecimal.ZERO
                : priceChange
                        .divide(previousClose, MathContext.DECIMAL64)
                        .multiply(ONE_HUNDRED);

        List<MarketCandleResponse> candles = rows.stream()
                .map(row -> new MarketCandleResponse(
                        row.getTradingDate(),
                        row.getOpen(),
                        row.getHigh(),
                        row.getLow(),
                        row.getClose()))
                .toList();

        return new MarketOverviewItemResponse(
                latest.getInstrumentCode(),
                latest.getDisplayName(),
                latest.getClose(),
                priceChange,
                changeRate,
                candles);
    }
}
