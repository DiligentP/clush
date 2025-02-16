package com.clush.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.clush.backend.dto.TodoRequest;
import com.clush.backend.dto.TodoResponse;
import com.clush.backend.mapper.TodoMapper;
import com.clush.backend.model.Todo;
import com.clush.backend.repository.TodoRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;
    
    @Mock
    private TodoMapper todoMapper;
    
    @InjectMocks
    private TodoService todoService;
    
    private Todo testTodo;
    private TodoResponse testResponse;

    @BeforeEach
    void setUp() {
        testTodo = Todo.builder()
                .id(1L)
                .title("테스트 제목")
                .description("테스트 설명")
                .completed(false)
                .build();
                
        testResponse = TodoResponse.builder()
                .id(1L)
                .title("테스트 제목")
                .description("테스트 설명")
                .completed(false)
                .build();
    }

    @Test
    @DisplayName("할일 생성 성공 테스트")
    void createTodo_Success() {
        // given
        TodoRequest request = new TodoRequest("테스트 제목", "테스트 설명", false);
        
        when(todoMapper.toEntity(any())).thenReturn(testTodo);
        when(todoRepository.save(any())).thenReturn(testTodo);
        when(todoMapper.toResponse(any())).thenReturn(testResponse);

        // when
        TodoResponse result = todoService.createTodo(request);

        // then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(todoRepository).save(testTodo);
    }

    @Test
    @DisplayName("존재하지 않는 할일 수정 시 예외 발생")
    void updateTodo_InvalidId() {
        // given
        TodoRequest request = new TodoRequest("업데이트 제목", "업데이트 설명", true);
        
        when(todoRepository.findById(999L)).thenReturn(Optional.empty());

        // when & then
        assertThrows(IllegalArgumentException.class, () -> {
            todoService.updateTodo(999L, request);
        });
    }
} 