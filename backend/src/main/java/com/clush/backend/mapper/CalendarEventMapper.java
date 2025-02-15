package com.clush.backend.mapper;

import com.clush.backend.dto.CalendarEventRequest;
import com.clush.backend.dto.CalendarEventResponse;
import com.clush.backend.model.CalendarEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CalendarEventMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "modifiedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    CalendarEvent toEntity(CalendarEventRequest request);

    CalendarEventResponse toResponse(CalendarEvent entity);
} 