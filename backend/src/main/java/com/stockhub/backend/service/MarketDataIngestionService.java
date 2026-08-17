package com.stockhub.backend.service;

import com.stockhub.backend.dao.MarketDailyPriceDao;
import com.stockhub.backend.dto.MarketDailyPriceUpsertRequest;
import com.stockhub.backend.dto.MarketDailyPriceUpsertResponse;
import com.stockhub.backend.dto.MarketDailyPriceWriteRequest;
import com.stockhub.backend.entity.MarketDailyPriceWriteEntity;
import java.time.LocalDate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MarketDataIngestionService {

    private final MarketDailyPriceDao marketDailyPriceDao;

    public MarketDataIngestionService(MarketDailyPriceDao marketDailyPriceDao) {
        this.marketDailyPriceDao = marketDailyPriceDao;
    }

    public LocalDate getLatestDate(String instrumentCode) {
        assertInstrumentExists(instrumentCode);
        return marketDailyPriceDao.selectLatestDate(instrumentCode);
    }

    @Transactional
    public MarketDailyPriceUpsertResponse upsert(MarketDailyPriceUpsertRequest request) {
        Long instrumentId = getInstrumentId(request.getInstrumentCode());
        int updatedRows = request.getPrices().stream()
                .map(price -> toEntity(instrumentId, price))
                .mapToInt(marketDailyPriceDao::upsert)
                .sum();
        return new MarketDailyPriceUpsertResponse(updatedRows);
    }

    private void assertInstrumentExists(String instrumentCode) {
        getInstrumentId(instrumentCode);
    }

    private Long getInstrumentId(String instrumentCode) {
        Long instrumentId = marketDailyPriceDao.selectInstrumentId(instrumentCode);
        if (instrumentId == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Unknown market instrument: " + instrumentCode);
        }
        return instrumentId;
    }

    private MarketDailyPriceWriteEntity toEntity(
            Long instrumentId, MarketDailyPriceWriteRequest request) {
        MarketDailyPriceWriteEntity entity = new MarketDailyPriceWriteEntity();
        entity.setInstrumentId(instrumentId);
        entity.setTradingDate(request.getDate());
        entity.setOpen(request.getOpen());
        entity.setHigh(request.getHigh());
        entity.setLow(request.getLow());
        entity.setClose(request.getClose());
        entity.setAdjustedClose(request.getAdjustedClose());
        entity.setVolume(request.getVolume());
        return entity;
    }
}
