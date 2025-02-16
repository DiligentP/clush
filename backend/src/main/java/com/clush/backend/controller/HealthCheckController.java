package com.clush.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    
    // 서버 상태 확인용 엔드포인트
    @GetMapping("/api/health")
    public String healthCheck() {
        return "OK";
    }
} 