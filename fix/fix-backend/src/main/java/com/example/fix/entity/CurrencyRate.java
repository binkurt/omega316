package com.example.fix.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

@Entity
@Table(name="currencies")
public class CurrencyRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(notes="Currency Rate's auto generated id", required = false)
    @JsonIgnore
    private Long id;

    @ApiModelProperty(notes="Currency Rate's base", required = true)
    @Pattern(regexp = "^[a-z]{3}$")
    private String base;

    @ApiModelProperty(notes="Currency Rate's target", required = true)
    @Pattern(regexp = "^[a-z]{3}$")
    private String target;

    @ApiModelProperty(notes="Currency Rate", required = true)
    private double rate;

    public CurrencyRate() {
    }

    @PrePersist
    @PreUpdate
    public void lowerCaseBaseAndTarget(){
        this.base= this.base.toLowerCase();
        this.target= this.target.toLowerCase();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }
}
