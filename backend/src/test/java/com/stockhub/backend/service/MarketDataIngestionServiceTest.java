package com.stockhub.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.stockhub.backend.dao.MarketDailyPriceDao;
import com.stockhub.backend.dto.MarketDailyPriceUpsertRequest;
import com.stockhub.backend.dto.MarketDailyPriceUpsertResponse;
import com.stockhub.backend.dto.MarketDailyPriceWriteRequest;
import com.stockhub.backend.entity.MarketDailyPriceEntity;
import com.stockhub.backend.entity.MarketDailyPriceWriteEntity;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class MarketDataIngestionServiceTest {

    @Test
    void resolvesInstrumentAndDelegatesEveryPriceToDomaDao() {
        List<MarketDailyPriceWriteEntity> upserted = new ArrayList<>();
        MarketDailyPriceDao dao = new MarketDailyPriceDao() {
            @Override
            public List<MarketDailyPriceEntity> selectRecent(LocalDate fromDate) {
                return List.of();
            }

            @Override
            public Long selectInstrumentId(String instrumentCode) {
                return 42L;
            }

            @Override
            public LocalDate selectLatestDate(String instrumentCode) {
                return LocalDate.of(2026, 8, 17);
            }

            @Override
            public int upsert(MarketDailyPriceWriteEntity price) {
                upserted.add(price);
                return 1;
            }
        };
        MarketDataIngestionService service = new MarketDataIngestionService(dao);
        MarketDailyPriceWriteRequest price = new MarketDailyPriceWriteRequest(
                LocalDate.of(2026, 8, 18),
                new BigDecimal("100"),
                new BigDecimal("110"),
                new BigDecimal("90"),
                new BigDecimal("105"),
                new BigDecimal("105"),
                1000L);

        MarketDailyPriceUpsertResponse response = service.upsert(
                new MarketDailyPriceUpsertRequest("nikkei", List.of(price, price)));

        assertEquals(2, response.upsertedRows());
        assertEquals(2, upserted.size());
        assertEquals(42L, upserted.getFirst().getInstrumentId());
        assertEquals(LocalDate.of(2026, 8, 17), service.getLatestDate("nikkei"));
    }
}
