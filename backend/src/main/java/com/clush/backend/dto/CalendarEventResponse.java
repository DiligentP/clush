package com.clush.backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record CalendarEventResponse(
    Long id,
    String title,
    String description,
    LocalDateTime startDate,
    LocalDateTime endDate,
    String color,
    boolean allDay,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt
) {} 