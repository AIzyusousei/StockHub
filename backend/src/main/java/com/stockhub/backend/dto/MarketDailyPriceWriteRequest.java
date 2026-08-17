package com.stockhub.backend.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketDailyPriceWriteRequest {
    @NotNull
    private LocalDate date;

    @NotNull
    private BigDecimal open;

    @NotNull
    private BigDecimal high;

    @NotNull
    private BigDecimal low;

    @NotNull
    private BigDecimal close;

    private BigDecimal adjustedClose;
    private Long volume;
}
