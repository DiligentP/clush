package com.clush.backend.mapper;

import com.clush.backend.dto.TodoRequest;
import com.clush.backend.dto.TodoResponse;
import com.clush.backend.model.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Todo toEntity(TodoRequest request);

    TodoResponse toResponse(Todo entity);
} 