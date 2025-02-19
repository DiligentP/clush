package com.clush.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clush.backend.model.CalendarEventShare;

import java.util.Optional;

@Repository
public interface CalendarEventShareRepository extends JpaRepository<CalendarEventShare, Long> {
    Optional<CalendarEventShare> findByShareCode(String shareCode);
    Optional<CalendarEventShare> findByEventId(Long eventId);
    void deleteByEventId(Long eventId);
} 