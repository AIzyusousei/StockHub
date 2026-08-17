package com.stockhub.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.stockhub.backend.dao.MarketDailyPriceDao;
import com.stockhub.backend.dto.MarketOverviewItemResponse;
import com.stockhub.backend.entity.MarketDailyPriceEntity;
import com.stockhub.backend.entity.MarketDailyPriceWriteEntity;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;

class MarketOverviewServiceTest {

    @Test
    void calculatesLatestChangeAndRateFromDailyPrices() {
        MarketDailyPriceDao dao = new MarketDailyPriceDao() {
            @Override
            public List<MarketDailyPriceEntity> selectRecent(LocalDate fromDate) {
                return List.of(
                        price(LocalDate.of(2026, 8, 14), "100"),
                        price(LocalDate.of(2026, 8, 17), "110"));
            }

            @Override
            public Long selectInstrumentId(String instrumentCode) {
                return 1L;
            }

            @Override
            public LocalDate selectLatestDate(String instrumentCode) {
                return LocalDate.of(2026, 8, 17);
            }

            @Override
            public int upsert(MarketDailyPriceWriteEntity price) {
                return 1;
            }
        };
        MarketOverviewService service = new MarketOverviewService(dao);

        MarketOverviewItemResponse response = service.getMarketOverview().getFirst();

        assertEquals("nikkei", response.code());
        assertEquals(new BigDecimal("110"), response.latestClose());
        assertEquals(new BigDecimal("10"), response.priceChange());
        assertEquals(0, new BigDecimal("10").compareTo(response.changeRate()));
        assertEquals(2, response.candles().size());
    }

    private MarketDailyPriceEntity price(LocalDate tradingDate, String close) {
        MarketDailyPriceEntity entity = new MarketDailyPriceEntity();
        entity.setInstrumentCode("nikkei");
        entity.setDisplayName("日経平均");
        entity.setDisplayOrder(1);
        entity.setTradingDate(tradingDate);
        entity.setOpen(new BigDecimal(close));
        entity.setHigh(new BigDecimal(close));
        entity.setLow(new BigDecimal(close));
        entity.setClose(new BigDecimal(close));
        return entity;
    }
}
