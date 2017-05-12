package com.example.hr.controller;

import com.example.hr.event.EmployeeEvent;
import com.example.hr.message.EmployeeOperationMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class HRWebsocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener()
    public void employeeChanged(EmployeeEvent employeeEvent){
        System.err.println("Employee event has occurred!");
        EmployeeOperationMessage employeeOperationMessage = new EmployeeOperationMessage(employeeEvent.getEventType(),employeeEvent.getEmployee());
        System.err.println("Sending message using the websocket!");
        messagingTemplate.convertAndSend("changes",employeeOperationMessage);
    }

}
