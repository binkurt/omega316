package com.example.hr.domain;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

@Entity
@Table(name="employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(notes = "Employee's auto generated id", required = false)
    private Long id;
    @Column(name="tc_kimlik_no",unique = true,nullable = false)
    @ApiModelProperty(notes = "Employee's unique identity no", required = true)
    private String identityNo;
    @Column(name="full_name",columnDefinition = "varchar(64)")
    @ApiModelProperty(notes = "Employee's full name", required = true)
    private String name;
    @ApiModelProperty(notes = "Employee's salary", required = true)
    private Double salary;
    @Column(columnDefinition = "longblob")
    @Lob
    @ApiModelProperty(notes = "Employee's photo", required = false)
    private byte[] photo;

    public Employee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentityNo() {
        return identityNo;
    }

    public void setIdentityNo(String identityNo) {
        this.identityNo = identityNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", identityNo='" + identityNo + '\'' +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                '}';
    }
}
