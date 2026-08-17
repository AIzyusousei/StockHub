package com.stockhub.backend.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketOverviewItemResponse {
    private String code;
    private String displayName;
    private BigDecimal latestClose;
    private BigDecimal priceChange;
    private BigDecimal changeRate;
    private List<MarketCandleResponse> candles;
}
