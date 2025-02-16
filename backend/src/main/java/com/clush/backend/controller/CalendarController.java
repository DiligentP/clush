package com.clush.backend.controller;

import com.clush.backend.dto.CalendarEventRequest;
import com.clush.backend.dto.CalendarEventResponse;
import com.clush.backend.service.CalendarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
@Tag(name = "캘린더 API")
public class CalendarController {

    private final CalendarService calendarService;

    // 월별 일정 조회
    @Operation(summary = "월별 일정 조회", description = "특정 년/월의 일정 목록을 반환")
    @GetMapping("/{year}/{month}")
    public ResponseEntity<List<CalendarEventResponse>> getMonthlyEvents(
            @PathVariable @Min(1) @Max(9999) int year,
            @PathVariable @Min(1) @Max(12) int month
    ) {
        log.info("월별 일정 조회 요청 - 년: {}, 월: {}", year, month);
        return ResponseEntity.ok(calendarService.getEventsByMonth(year, month));
    }

    // 일정 생성
    @Operation(summary = "일정 생성", description = "새로운 일정을 생성합니다")
    @PostMapping
    public ResponseEntity<CalendarEventResponse> createEvent(@RequestBody CalendarEventRequest request) {
        log.info("일정 생성 요청 - 제목: {}", request.getTitle());
        return ResponseEntity.ok(calendarService.createEvent(request));
    }

    // 일정 수정
    @Operation(summary = "일정 수정", description = "기존 일정을 업데이트합니다")
    @PutMapping("/{id}")
    public ResponseEntity<CalendarEventResponse> updateEvent(
        @PathVariable Long id,
        @RequestBody CalendarEventRequest request
    ) {
        log.info("일정 수정 요청 - ID: {}", id);
        return ResponseEntity.ok(calendarService.updateEvent(id, request));
    }

    // 일정 삭제
    @Operation(summary = "일정 삭제", description = "기존 일정을 삭제합니다")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        log.info("일정 삭제 요청 - ID: {}", id);
        calendarService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
} 