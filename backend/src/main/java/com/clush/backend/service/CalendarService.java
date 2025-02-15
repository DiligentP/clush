package com.clush.backend.service;

import com.clush.backend.dto.CalendarEventRequest;
import com.clush.backend.dto.CalendarEventResponse;
import com.clush.backend.mapper.CalendarEventMapper;
import com.clush.backend.repository.CalendarEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarEventRepository calendarEventRepository;
    private final CalendarEventMapper calendarEventMapper;

    @Transactional(readOnly = true)
    public List<CalendarEventResponse> getAllEvents() {
            return null;

    }

    @Transactional
    public CalendarEventResponse createEvent(CalendarEventRequest request) {
            return null;
    }

    @Transactional
    public CalendarEventResponse updateEvent(Long id, CalendarEventRequest request) {
            return null;
        // 구현 예정
    }

    @Transactional
    public void deleteEvent(Long id) {
        calendarEventRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CalendarEventResponse> getEventsByPeriod(LocalDateTime start, LocalDateTime end) {
            return null;
        // 구현 예정
    }

    @Transactional
    public CalendarEventResponse shareEvent(Long eventId, String targetUser) {
            return null;
        // 구현 예정
    }

    @Transactional(readOnly = true)
    public List<CalendarEventResponse> searchEvents(String keyword) {
            return null;
        // 구현 예정
    }
} 