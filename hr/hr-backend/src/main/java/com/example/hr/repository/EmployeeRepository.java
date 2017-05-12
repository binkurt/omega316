package com.example.hr.repository;

import com.example.hr.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{
    Employee findOneByIdentityNo(String identityNo);
}
