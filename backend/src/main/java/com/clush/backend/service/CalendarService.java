package com.clush.backend.service;

import com.clush.backend.dto.CalendarEventRequest;
import com.clush.backend.dto.CalendarEventResponse;
import com.clush.backend.mapper.CalendarEventMapper;
import com.clush.backend.model.CalendarEvent;
import com.clush.backend.model.CalendarEventShare;
import com.clush.backend.repository.CalendarEventRepository;
import com.clush.backend.repository.CalendarEventShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarEventRepository calendarEventRepository;
    private final CalendarEventMapper calendarEventMapper;
    private final CalendarEventShareRepository calendarEventShareRepository;

    // 전체 일정 조회
    @Transactional(readOnly = true)
    public List<CalendarEventResponse> getAllEvents() {
            return null;

    }

    // 일정 생성
    @Transactional
    public CalendarEventResponse createEvent(CalendarEventRequest request) {
        CalendarEvent event = calendarEventMapper.toEntity(request);
        if(request.getShareCode() != null) {
            handleShareCode(event, request.getShareCode());
        }
        CalendarEvent savedEvent = calendarEventRepository.save(event);
        return calendarEventMapper.toResponse(savedEvent);
    }

    private void handleShareCode(CalendarEvent event, String shareCode) {
        calendarEventShareRepository.findByShareCode(shareCode)
            .ifPresent(existing -> {
                CalendarEventShare updated = existing.updateEvent(event);
                calendarEventShareRepository.save(updated);
            });
    }

    // 일정 수정
    @Transactional
    public CalendarEventResponse updateEvent(Long id, CalendarEventRequest request) {
        CalendarEvent existingEvent = calendarEventRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정 ID: " + id));
        
        existingEvent.updateDetails(
            request.getTitle(),
            request.getDescription(),
            request.getStartDate(),
            request.getEndDate(),
            request.isAllDay()
        );
        
        CalendarEvent updatedEvent = calendarEventRepository.save(existingEvent);
        return calendarEventMapper.toResponse(updatedEvent);
    }

    // 일정 삭제
    @Transactional
    public void deleteEvent(Long id) {
        // 공유 정보 먼저 삭제
        calendarEventShareRepository.deleteByEventId(id);
        calendarEventRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CalendarEventResponse> getEventsByPeriod(LocalDateTime start, LocalDateTime end) {
            return null;
        // 구현 예정
    }

    // 일정 검색
    @Transactional(readOnly = true)
    public List<CalendarEventResponse> searchEvents(String keyword) {
            return null;
        // 구현 예정
    }

    // 월별 일정 조회
    @Transactional(readOnly = true)
    public List<CalendarEventResponse> getEventsByMonth(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.with(TemporalAdjusters.lastDayOfMonth());
        List<CalendarEvent> events = calendarEventRepository.findByStartDateBetween(start, end);
        if(events == null || events.isEmpty()) {
            return Collections.emptyList();
        }
        return events.stream()
                .map(calendarEventMapper::toResponse)
                .collect(Collectors.toList());
    }

    // 일정 공유 생성
    @Transactional
    public String createShareCode(Long eventId) {
        CalendarEvent event = calendarEventRepository.findById(eventId)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 일정 ID"));

        String shareCode = UUID.randomUUID().toString();
        
        calendarEventShareRepository.findByEventId(eventId)
            .ifPresentOrElse(
                existing -> {
                    existing.updateShareCode(shareCode);
                    calendarEventShareRepository.save(existing);
                },
                () -> calendarEventShareRepository.save(
                    CalendarEventShare.builder()
                        .event(event)
                        .shareCode(shareCode)
                        .build()
                )
            );
        
        return shareCode;
    }

    // 일정 공유 코드 조회
    @Transactional(readOnly = true)
    public CalendarEventResponse getEventByShareCode(String shareCode) {
        CalendarEventShare share = calendarEventShareRepository.findByShareCode(shareCode)
            .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 공유 코드"));
        
        return calendarEventMapper.toResponse(share.getEvent());
    }
} 