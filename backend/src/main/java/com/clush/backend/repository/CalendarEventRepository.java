package com.clush.backend.repository;

import com.clush.backend.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    List<CalendarEvent> findByTitleContainingIgnoreCase(String keyword);
    List<CalendarEvent> findByAllDay(boolean allDay);
} 