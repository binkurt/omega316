package com.example.fix.controller;

import com.example.fix.event.CurrencyRateChangeEvent;
import com.example.fix.message.CurrencyRateChangeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class FixWebsocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener()
    public void employeeChanged(CurrencyRateChangeEvent currencyRateChangeEvent){
        System.err.println("Currency change event has occurred!");
        CurrencyRateChangeMessage currencyRateChangeMessage =
                new CurrencyRateChangeMessage(currencyRateChangeEvent,new Date());
        System.err.println("Sending message using the websocket!");
        messagingTemplate.convertAndSend("changes",currencyRateChangeMessage);
    }

}
