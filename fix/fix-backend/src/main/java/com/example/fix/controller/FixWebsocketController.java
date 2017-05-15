package com.example.fix.controller;

import com.example.fix.event.CurrencyRateChangeEvent;
import com.example.fix.message.CurrencyRateChangeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

/**
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
@Controller
public class FixWebsocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener()
    public void employeeChanged(CurrencyRateChangeEvent currencyRateChangeEvent){
        CurrencyRateChangeMessage currencyRateChangeMessage =
                new CurrencyRateChangeMessage(currencyRateChangeEvent,new Date());
        messagingTemplate.convertAndSend("/topic/changes",currencyRateChangeMessage);
    }

}
