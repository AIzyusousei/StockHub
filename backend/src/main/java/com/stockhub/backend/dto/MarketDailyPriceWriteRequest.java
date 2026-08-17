package com.stockhub.backend.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record MarketDailyPriceWriteRequest(
        @NotNull LocalDate date,
        @NotNull BigDecimal open,
        @NotNull BigDecimal high,
        @NotNull BigDecimal low,
        @NotNull BigDecimal close,
        BigDecimal adjustedClose,
        Long volume) {}
