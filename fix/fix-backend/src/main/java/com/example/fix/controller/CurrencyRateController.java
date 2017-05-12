package com.example.fix.controller;

import com.example.fix.entity.CurrencyRate;
import com.example.fix.event.CurrencyRateChangeEvent;
import com.example.fix.repository.CurrencyRateRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;

@RestController
@RequestMapping("/rates")
@CrossOrigin
@Api(value="/rates",description = "Currency Rate REST Services",basePath = "/rates")
public class CurrencyRateController {
    @Autowired
    private CurrencyRateRepository currencyRateRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    @GetMapping(value="{base}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retrieves all currency rates for given base currency",response = Collection.class)
    public Collection<CurrencyRate> findByBase(
            @PathVariable String base){
        return currencyRateRepository.findAllByBase(base);
    }

    @GetMapping(value="{base}/{target}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retrieves the currency rates for given base and target currency",response = CurrencyRate.class)
    public CurrencyRate findByBaseAndTarget(
            @PathVariable String base,
            @PathVariable String target){
        CurrencyRate currencyRate = currencyRateRepository.findOneByBaseAndTarget(base, target);
        if (Objects.isNull(currencyRate))
            throw new IllegalArgumentException("Cannot find rate!");
        return currencyRate;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retrieves all currency rates",response = Collection.class)
    public Collection<CurrencyRate> findAllRates(){
        return currencyRateRepository.findAll();
    }


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Creates new currency rate",response = CurrencyRate.class)
    public CurrencyRate addRate(@RequestBody @Validated CurrencyRate rate){
        String base= rate.getBase().toLowerCase();
        String target= rate.getTarget().toLowerCase();
        CurrencyRate found= currencyRateRepository.findOneByBaseAndTarget(base,target);
        if (Objects.nonNull(found))
            throw new IllegalArgumentException("Currency rate already exits. You may want to update the rate?");
        return currencyRateRepository.save(rate);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Updates a currency rate",response = CurrencyRate.class)
    public CurrencyRate updateRate(@RequestBody @Validated CurrencyRate rate){
        String base= rate.getBase();
        String target= rate.getTarget();
        double newRate= rate.getRate();
        CurrencyRate found= currencyRateRepository.findOneByBaseAndTarget(base,target);
        if (Objects.isNull(found))
            throw new IllegalArgumentException("Cannot find rate!");
        double oldRate= found.getRate();
        found.setRate(rate.getRate());
        publisher.publishEvent(new CurrencyRateChangeEvent(base,target,oldRate,newRate));
        return currencyRateRepository.save(found);
    }

    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleError(Exception e){
       return e.getMessage();
    }
}
