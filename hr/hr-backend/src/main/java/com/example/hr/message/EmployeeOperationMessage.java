package com.example.hr.message;

import com.example.hr.domain.Employee;
import com.example.hr.event.EventType;

import java.util.Collection;

public class EmployeeOperationMessage {
    private EventType event;
    private Employee employee;

    public EmployeeOperationMessage() {
    }

    public EmployeeOperationMessage(EventType event, Employee employee) {
        this.event = event;
        this.employee = employee;
    }

    public EventType getEvent() {
        return event;
    }

    public void setEvent(EventType event) {
        this.event = event;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "EmployeeOperationMessage{" +
                "event=" + event +
                ", employee=" + employee +
                '}';
    }
}
