package com.stockhub.backend.controller;

import com.stockhub.backend.dto.MarketOverviewItemResponse;
import com.stockhub.backend.service.MarketOverviewService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/market-overview")
public class MarketOverviewController {

    private final MarketOverviewService marketOverviewService;

    public MarketOverviewController(MarketOverviewService marketOverviewService) {
        this.marketOverviewService = marketOverviewService;
    }

    @GetMapping
    public List<MarketOverviewItemResponse> getMarketOverview() {
        return marketOverviewService.getMarketOverview();
    }
}
