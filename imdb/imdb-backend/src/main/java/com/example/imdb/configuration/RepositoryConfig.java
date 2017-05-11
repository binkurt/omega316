package com.example.imdb.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {
        "com.example.imdb.repository"
})
@EntityScan(basePackages = {
        "com.example.imdb.entity"
})
public class RepositoryConfig {
    
}
