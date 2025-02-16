package com.clush.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Clush API 문서")
                        .version("1.0.0")
                        .description("Clush 프로젝트 API 명세서")
                )
                .addServersItem(new Server().url("https://clush-be.diligentp.com"))
                .addServersItem(new Server().url("http://localhost:8080"));
    }
} 