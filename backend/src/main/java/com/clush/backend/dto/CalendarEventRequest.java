package com.clush.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import java.time.LocalDate;

@Builder
public record CalendarEventRequest(
    @NotBlank String title,
    String description,
    @NotNull LocalDate startDate,
    @NotNull LocalDate endDate,
    String color,
    boolean allDay
) {} 