package com.example.fix.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {
        "com.example.fix.repository"
})
@EntityScan(basePackages = {
        "com.example.fix.entity"
})
public class RepositoryConfig {
    
}
