package com.example.hr.controller;

import com.example.hr.domain.Employee;
import com.example.hr.event.EmployeeEvent;
import com.example.hr.event.EventType;
import com.example.hr.exception.ErrorMessage;
import com.example.hr.exception.RestExceptionBase;
import com.example.hr.repository.EmployeeRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;

@RestController
@RequestMapping("/employees")
@Api(value="/employees",description = "Employee Restful Service",basePath = "/employees")
@CrossOrigin
public class EmployeeRestController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ApplicationEventPublisher publisher;

    // GET http://localhost:7001/hr/api/employees/1
    @GetMapping(value="{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retrieves an employee by id",response = Employee.class)
    public Employee findById(@PathVariable Long id){
        Employee employee = employeeRepository.findOne(id);
        if (Objects.isNull(employee))
            throw new RestExceptionBase("Cannot find the employee!","unknown.employee","1");
        return employee;
    }

    // GET http://localhost:7001/hr/api/employees/find?identityNo=123456
    @GetMapping(value="find",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retrieves an employee by identity no",response = Employee.class)
    public Employee findById(
            @RequestParam("identityNo") String identityNo){
        Employee employee = employeeRepository.findOneByIdentityNo(identityNo);
        if (Objects.isNull(employee))
            throw new RestExceptionBase("Cannot find the employee!","unknown.employee","1");
        return employee;
    }

    // GET http://localhost:7001/hr/api/employees
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retrieves all employees",response = Collection.class)
    public Collection<Employee> findAllEmployees(){
        return employeeRepository.findAll();
    }

    @PostMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @ApiOperation(value="Creates an employee",response = Employee.class)
    public Employee addEmployee(@RequestBody Employee employee){
        Employee savedEmployee = employeeRepository.save(employee);
        publisher.publishEvent(new EmployeeEvent(savedEmployee, EventType.ADD));
        return savedEmployee;
    }

    @PutMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @ApiOperation(value="Updates an employee. Update fields are name, salary and photo",response = Employee.class)
    public Employee updateEmployee(@RequestBody Employee employee){
        String identityNo= employee.getIdentityNo();
        Employee found=
                employeeRepository.findOneByIdentityNo(identityNo);
        if (Objects.isNull(found))
            throw new RestExceptionBase("Cannot find the employee!","unknown.employee","2");
        found.setName(employee.getName());
        found.setPhoto(employee.getPhoto());
        found.setSalary(employee.getSalary());
        employeeRepository.save(found);
        publisher.publishEvent(new EmployeeEvent(found, EventType.UPDATE));
        return found;
    }

    // DELETE http://localhost:7001/hr/api/employees?identityNo=123456
    // DELETE http://localhost:7001/hr/api/employees?id=1
    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE,
            params = {"identityNo","id"})
    @ApiOperation(value="Deletes an employee either by id or identity no",response = Employee.class)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "identityNo", value = "Employee's identity no", required = false, dataType = "string", paramType = "query", defaultValue="12345"),
            @ApiImplicitParam(name = "id", value = "Employee's id", required = false, dataType = "int", paramType = "query", defaultValue="1")
    })
    public Employee deleteEmployee(
         @RequestParam(name = "identityNo",required = false)
                 String identityNo,
         @RequestParam(name = "id",required = false) Long id){
        Employee employee= null;
        if (Objects.nonNull(identityNo)){
            employee= employeeRepository.findOneByIdentityNo(identityNo);
        } else if (Objects.nonNull(id)){
            employee= employeeRepository.findOne(id);
        }
        if (Objects.nonNull(employee)){
            employeeRepository.delete(employee);
            publisher.publishEvent(new EmployeeEvent(employee, EventType.DELETE));
            return employee;
        }
        throw new RestExceptionBase("Cannot find the employee!","unknown.employee","3");
    }

    @ExceptionHandler({RestExceptionBase.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleErrors(RestExceptionBase e){
        return new ErrorMessage(e.getMessageId(),e.getDebugId(),e.getMessage());
    }
}
