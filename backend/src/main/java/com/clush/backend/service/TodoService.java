package com.clush.backend.service;

import com.clush.backend.dto.TodoRequest;
import com.clush.backend.dto.TodoResponse;
import com.clush.backend.mapper.TodoMapper;
import com.clush.backend.model.Todo;
import com.clush.backend.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    // 할일 생성
    @Transactional
    public TodoResponse createTodo(TodoRequest request) {
        Todo newTodo = todoMapper.toEntity(request);
        Todo savedTodo = todoRepository.save(newTodo);
        return todoMapper.toResponse(savedTodo);
    }

    // 전체 할일 조회
    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(todoMapper::toResponse)
                .collect(Collectors.toList());
    }

    // 할일 수정
    @Transactional
    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할일 ID: " + id));
        
        existingTodo.updateDetails(
                request.getTitle(),
                request.getDescription(),
                request.isCompleted()
        );
        
        Todo updatedTodo = todoRepository.save(existingTodo);
        return todoMapper.toResponse(updatedTodo);
    }

    // 할일 삭제
    @Transactional
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    // 할일 완료 상태 업데이트
    @Transactional
    public TodoResponse updateTodoStatus(Long id, boolean completed) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 할일 ID: " + id));
        
        existingTodo.updateCompleted(completed);
        Todo updatedTodo = todoRepository.save(existingTodo);
        return todoMapper.toResponse(updatedTodo);
    }
} 