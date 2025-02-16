package com.clush.backend.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarEventRequest {
    @NotBlank
    private String title;
    private String description;
    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    private boolean allDay;

    @AssertTrue(message = "종료일은 시작일 이후여야 합니다")
    public boolean isEndDateValid() {
        return endDate.isAfter(startDate) || endDate.isEqual(startDate);
    }
} 