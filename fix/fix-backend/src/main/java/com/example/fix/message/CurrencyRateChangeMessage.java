package com.example.fix.message;

import com.example.fix.event.CurrencyRateChangeEvent;
import java.util.Date;

/**
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
public class CurrencyRateChangeMessage {
    private CurrencyRateChangeEvent event;
    private Date date;

    public CurrencyRateChangeMessage() {
    }

    public CurrencyRateChangeMessage(CurrencyRateChangeEvent event, Date date) {
        this.event = event;
        this.date = date;
    }

    public CurrencyRateChangeEvent getEvent() {
        return event;
    }

    public void setEvent(CurrencyRateChangeEvent event) {
        this.event = event;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "CurrencyRateChangeMessage{" +
                "event=" + event +
                ", date=" + date +
                '}';
    }
}
