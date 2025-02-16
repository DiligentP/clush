package com.clush.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoRequest {
    @NotBlank(message = "제목은 필수 입력 항목입니다")
    private String title;
    
    private String description;
    private boolean completed;
} 