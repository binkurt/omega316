package com.example.imdb.configuration;

import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.RelativePathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.servlet.ServletContext;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${build.version}-r${build.revision}")
    private String version;

    @Value("${build.timestamp}")
    private long timeStamp;

    @Bean
    public Docket api(ServletContext servletContext) {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .host("localhost:7001")
                .pathProvider(new RelativePathProvider(servletContext) {
                    @Override
                    public String getApplicationBasePath() {
                        return "/imdb/api";
                    }
                })
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {

        return new ApiInfoBuilder()
                .title("IMDB Movie Search Service")
                .description("<b>Client FrontEnd API</b><br /><br />Updated: [" + (new Date(timeStamp)).toString() + " ]"
                        + " <script>document.title = \"IMDB MOVIE SEARCH\";"
                        + " document.getElementById('header').remove();"
                        + "</script>")
                .version(version)
                .build();
    }
}
