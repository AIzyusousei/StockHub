package com.stockhub.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.seasar.doma.Column;
import org.seasar.doma.Entity;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MarketDailyPriceEntity {

    @Column(name = "instrument_code")
    private String instrumentCode;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "trading_date")
    private LocalDate tradingDate;

    private BigDecimal open;
    private BigDecimal high;
    private BigDecimal low;
    private BigDecimal close;

}
