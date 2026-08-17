package com.stockhub.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketDailyPriceUpsertRequest {
    @NotBlank
    private String instrumentCode;

    @NotEmpty
    private List<@Valid MarketDailyPriceWriteRequest> prices;
}
