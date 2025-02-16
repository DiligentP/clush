package com.clush.backend.service;

import com.clush.backend.dto.CalendarEventRequest;
import com.clush.backend.dto.CalendarEventResponse;
import com.clush.backend.mapper.CalendarEventMapper;
import com.clush.backend.model.CalendarEvent;
import com.clush.backend.repository.CalendarEventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CalendarServiceTest {

    @Mock
    private CalendarEventRepository calendarEventRepository;

    @Mock
    private CalendarEventMapper calendarEventMapper;

    @InjectMocks
    private CalendarService calendarService;

    private CalendarEventRequest testRequest;
    private CalendarEvent testEvent;
    private CalendarEventResponse testResponse;

    @BeforeEach
    void setUp() {
        testRequest = new CalendarEventRequest(
            "테스트 제목",
            "테스트 설명",
            LocalDate.of(2025, 1, 1),
            LocalDate.of(2025, 1, 2),
            false
        );

        testEvent = CalendarEvent.builder()
            .id(1L)
            .title("테스트 제목")
            .startDate(LocalDate.of(2025, 1, 1))
            .endDate(LocalDate.of(2025, 1, 2))
            .build();

        testResponse = new CalendarEventResponse(
            1L,
            "테스트 제목",
            "테스트 설명",
            LocalDate.of(2025, 1, 1),
            LocalDate.of(2025, 1, 2),
            false,
            null,
            null
        );
    }

    @Test
    @DisplayName("새 일정 생성 - 정상 케이스")
    void createEvent_Success() {
        when(calendarEventMapper.toEntity(any())).thenReturn(testEvent);
        when(calendarEventRepository.save(any())).thenReturn(testEvent);
        when(calendarEventMapper.toResponse(any())).thenReturn(testResponse);

        CalendarEventResponse result = calendarService.createEvent(testRequest);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(calendarEventRepository).save(testEvent);
    }

    @Test
    @DisplayName("월별 일정 조회 - 해당 월에 일정이 없는 경우")
    void getEventsByMonth_NoEvents() {
        LocalDate start = LocalDate.of(2025, 1, 1);
        LocalDate end = LocalDate.of(2025, 1, 31);
        
        when(calendarEventRepository.findByStartDateBetween(start, end))
            .thenReturn(List.of());

        List<CalendarEventResponse> result = calendarService.getEventsByMonth(2025, 1);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("월별 일정 조회 - 해당 월에 일정이 있는 경우")
    void getEventsByMonth_WithEvents() {
        LocalDate start = LocalDate.of(2025, 1, 1);
        LocalDate end = LocalDate.of(2025, 1, 31);
        
        when(calendarEventRepository.findByStartDateBetween(start, end))
            .thenReturn(List.of(testEvent));
        when(calendarEventMapper.toResponse(any())).thenReturn(testResponse);

        List<CalendarEventResponse> result = calendarService.getEventsByMonth(2025, 1);

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("테스트 제목", result.get(0).getTitle());
    }

    @Test
    @DisplayName("일정 삭제 - 존재하는 ID로 삭제 시도")
    void deleteEvent_WithValidId() {
        Long testId = 1L;
        
        calendarService.deleteEvent(testId);
        
        verify(calendarEventRepository).deleteById(testId);
    }

    @Test
    @DisplayName("일정 수정 - 정상 케이스")
    void updateEvent_Success() {
        CalendarEventRequest updateRequest = new CalendarEventRequest(
            "업데이트된 제목",
            "업데이트된 설명",
            LocalDate.of(2025, 1, 2),
            LocalDate.of(2025, 1, 3),
            true
        );
        
        when(calendarEventRepository.findById(1L)).thenReturn(Optional.of(testEvent));
        when(calendarEventMapper.toResponse(any())).thenReturn(testResponse);
        
        CalendarEventResponse result = calendarService.updateEvent(1L, updateRequest);
        
        assertNotNull(result);
        verify(calendarEventRepository).save(testEvent);
        assertEquals("테스트 제목", result.getTitle()); // 매퍼가 정상 동작하는지 확인
    }

    @Test
    @DisplayName("일정 수정 - 존재하지 않는 ID")
    void updateEvent_InvalidId() {
        CalendarEventRequest updateRequest = new CalendarEventRequest(
            "업데이트된 제목",
            "업데이트된 설명",
            LocalDate.of(2025, 1, 2),
            LocalDate.of(2025, 1, 3),
            true
        );
        
        when(calendarEventRepository.findById(999L)).thenReturn(Optional.empty());
        
        assertThrows(IllegalArgumentException.class, () -> {
            calendarService.updateEvent(999L, updateRequest);
        });
    }
} 