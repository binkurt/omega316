package com.example.fix.repository;

import com.example.fix.entity.CurrencyRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

/**
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
public interface CurrencyRateRepository extends JpaRepository<CurrencyRate,Long>{
    Collection<CurrencyRate> findAllByBase(String base);

    CurrencyRate findOneByBaseAndTarget(String base, String target);
}
