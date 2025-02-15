package com.clush.backend.dto;

import java.time.LocalDateTime;
import java.time.LocalDate;

import lombok.Builder;

@Builder
public record CalendarEventResponse(
    Long id,
    String title,
    String description,
    LocalDate startDate,
    LocalDate endDate,
    String color,
    boolean allDay,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt
) {} 