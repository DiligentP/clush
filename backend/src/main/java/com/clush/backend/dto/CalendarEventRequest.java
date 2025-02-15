package com.clush.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import java.time.LocalDateTime;

@Builder
public record CalendarEventRequest(
    @NotBlank String title,
    String description,
    @NotNull LocalDateTime startDate,
    @NotNull LocalDateTime endDate,
    String color,
    boolean allDay
) {} 