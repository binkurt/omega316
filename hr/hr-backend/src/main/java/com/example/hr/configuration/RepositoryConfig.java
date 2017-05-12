package com.example.hr.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {
        "com.example.hr.repository"
})
@EntityScan(basePackages = {
        "com.example.hr.domain"
})
public class RepositoryConfig {
    
}
