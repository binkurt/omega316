package com.example.fix.service;

import com.example.fix.event.CurrencyRateChangeEvent;
import com.example.fix.repository.CurrencyRateRepository;
import jdk.nashorn.internal.objects.AccessorPropertyDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
@Service
public class SimulationService {

    @Autowired
    private CurrencyRateRepository currencyRateRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    private static Random random= new Random();

    @Scheduled(fixedRate = 30_000)
    public void changeCurrency(){
        currencyRateRepository.findAll()
                .forEach(currencyRate -> {
                    String base=currencyRate.getBase();
                    String target=currencyRate.getTarget();
                    double oldRate= currencyRate.getRate();
                    double newRate = oldRate * ( 1. + (random.nextDouble()-0.5)/1000.);
                    currencyRate.setRate(newRate);
                    publisher.publishEvent(new CurrencyRateChangeEvent(base,target,oldRate,newRate));
                    currencyRateRepository.save(currencyRate);
                });
    }
}
