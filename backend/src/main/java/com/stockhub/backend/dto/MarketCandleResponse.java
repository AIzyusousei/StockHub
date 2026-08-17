package com.stockhub.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MarketCandleResponse(
        LocalDate date,
        BigDecimal open,
        BigDecimal high,
        BigDecimal low,
        BigDecimal close) {}
