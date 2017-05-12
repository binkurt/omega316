package com.example.hr;

import com.example.hr.configuration.ApplicationConfig;
import com.example.hr.configuration.RepositoryConfig;
import com.example.hr.configuration.SwaggerConfig;
import com.example.hr.configuration.WebsocketConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({
	ApplicationConfig.class,
	RepositoryConfig.class,
	SwaggerConfig.class,
	WebsocketConfig.class
})
public class HrBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrBackendApplication.class, args);
	}
}
