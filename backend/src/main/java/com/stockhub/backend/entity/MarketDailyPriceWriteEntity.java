package com.stockhub.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.seasar.doma.Entity;
import org.seasar.doma.Table;

@Entity
@Table(name = "market_daily_price")
@Getter
@Setter
@NoArgsConstructor
public class MarketDailyPriceWriteEntity {

    private Long instrumentId;
    private LocalDate tradingDate;
    private BigDecimal open;
    private BigDecimal high;
    private BigDecimal low;
    private BigDecimal close;
    private BigDecimal adjustedClose;
    private Long volume;

}
