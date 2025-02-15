package com.clush.backend.controller;

import com.clush.backend.dto.CalendarEventResponse;
import com.clush.backend.service.CalendarService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    // 월별 일정 조회
    @Operation(summary = "월별 일정 조회", description = "특정 년/월의 일정 목록을 반환")
    @GetMapping("/{year}/{month}")
    public List<CalendarEventResponse> getMonthlyEvents(
            @PathVariable int year,
            @PathVariable int month
    ) {
        log.info("월별 일정 조회 요청 - 년: {}, 월: {}", year, month);
        return calendarService.getEventsByMonth(year, month);
    }

    // 기간별 일정 조회 (선택적 구현)
    @Operation(summary = "기간별 일정 조회", description = "시작일과 종료일 사이의 일정 목록 반환")
    @GetMapping("/period")
    public List<CalendarEventResponse> getEventsByPeriod(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end
    ) {
        log.info("기간별 일정 조회 요청 - 시작: {}, 종료: {}", start, end);
        return calendarService.getEventsByPeriod(start, end);
    }
} 