package com.example.fix.event;

/**
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
public class CurrencyRateChangeEvent {
    private String base;
    private String target;
    private double oldRate;
    private double newRate;

    public CurrencyRateChangeEvent() {
    }

    public CurrencyRateChangeEvent(String base, String target, double oldRate, double newRate) {
        this.base = base;
        this.target = target;
        this.oldRate = oldRate;
        this.newRate = newRate;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public double getOldRate() {
        return oldRate;
    }

    public void setOldRate(double oldRate) {
        this.oldRate = oldRate;
    }

    public double getNewRate() {
        return newRate;
    }

    public void setNewRate(double newRate) {
        this.newRate = newRate;
    }
}
