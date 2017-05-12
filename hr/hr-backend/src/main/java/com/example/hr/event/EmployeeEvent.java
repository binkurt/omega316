package com.example.hr.event;

import com.example.hr.domain.Employee;

public class EmployeeEvent {
    private Employee employee;
    private EventType eventType;

    public EmployeeEvent() {
    }

    public EmployeeEvent(Employee employee, EventType eventType) {
        this.employee = employee;
        this.eventType = eventType;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }
}
