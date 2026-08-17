package com.stockhub.backend.dao;

import com.stockhub.backend.entity.MarketDailyPriceEntity;
import com.stockhub.backend.entity.MarketDailyPriceWriteEntity;
import java.time.LocalDate;
import java.util.List;
import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

@Dao
@ConfigAutowireable
public interface MarketDailyPriceDao {

    @Select
    List<MarketDailyPriceEntity> selectRecent(LocalDate fromDate);

    @Select
    Long selectInstrumentId(String instrumentCode);

    @Select
    LocalDate selectLatestDate(String instrumentCode);

    @Insert(sqlFile = true)
    int upsert(MarketDailyPriceWriteEntity price);
}
