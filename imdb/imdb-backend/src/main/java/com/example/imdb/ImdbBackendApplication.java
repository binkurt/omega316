package com.example.imdb;

import com.example.imdb.configuration.ApplicationConfig;
import com.example.imdb.configuration.RepositoryConfig;
import com.example.imdb.configuration.SwaggerConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@Import({
		ApplicationConfig.class, RepositoryConfig.class, SwaggerConfig.class
})
public class ImdbBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImdbBackendApplication.class, args);
	}
}
