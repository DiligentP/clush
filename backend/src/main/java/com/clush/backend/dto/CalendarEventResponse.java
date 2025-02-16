package com.clush.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarEventResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean allDay;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
} 