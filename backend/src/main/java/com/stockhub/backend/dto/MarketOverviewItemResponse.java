package com.stockhub.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record MarketOverviewItemResponse(
        String code,
        String displayName,
        BigDecimal latestClose,
        BigDecimal priceChange,
        BigDecimal changeRate,
        List<MarketCandleResponse> candles) {}
