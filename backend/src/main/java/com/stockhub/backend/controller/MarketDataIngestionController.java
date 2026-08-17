package com.stockhub.backend.controller;

import com.stockhub.backend.dto.LatestMarketDateResponse;
import com.stockhub.backend.dto.MarketDailyPriceUpsertRequest;
import com.stockhub.backend.dto.MarketDailyPriceUpsertResponse;
import com.stockhub.backend.service.MarketDataIngestionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/internal/market-data")
public class MarketDataIngestionController {

    private final MarketDataIngestionService marketDataIngestionService;

    public MarketDataIngestionController(MarketDataIngestionService marketDataIngestionService) {
        this.marketDataIngestionService = marketDataIngestionService;
    }

    @GetMapping("/{instrumentCode}/latest-date")
    public LatestMarketDateResponse getLatestDate(@PathVariable String instrumentCode) {
        return new LatestMarketDateResponse(
                marketDataIngestionService.getLatestDate(instrumentCode));
    }

    @PostMapping("/daily-prices")
    public MarketDailyPriceUpsertResponse upsertDailyPrices(
            @Valid @RequestBody MarketDailyPriceUpsertRequest request) {
        return marketDataIngestionService.upsert(request);
    }
}
