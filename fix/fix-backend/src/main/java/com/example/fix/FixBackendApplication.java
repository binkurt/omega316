package com.example.fix;

import com.example.fix.configuration.ApplicationConfig;
import com.example.fix.configuration.RepositoryConfig;
import com.example.fix.configuration.SwaggerConfig;
import com.example.fix.configuration.WebsocketConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

/**
 * @author Binnur Kurt (binnur.kurt@gmail.com)
 */
@SpringBootApplication
@Import({
	SwaggerConfig.class,
	RepositoryConfig.class,
	ApplicationConfig.class,
	WebsocketConfig.class
})
public class FixBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FixBackendApplication.class, args);
	}
}
