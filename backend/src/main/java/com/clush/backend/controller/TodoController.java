package com.clush.backend.controller;

import com.clush.backend.dto.TodoRequest;
import com.clush.backend.dto.TodoResponse;
import com.clush.backend.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    @Operation(summary = "할일 생성", description = "새로운 할일을 생성합니다")
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@RequestBody TodoRequest request) {
        log.info("할일 생성 요청 - 제목: {}", request.getTitle());
        return ResponseEntity.ok(todoService.createTodo(request));
    }

    @Operation(summary = "전체 할일 조회", description = "모든 할일 목록을 반환합니다")
    @GetMapping
    public ResponseEntity<List<TodoResponse>> getAllTodos() {
        log.info("전체 할일 조회 요청");
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @Operation(summary = "할일 수정", description = "기존 할일을 업데이트합니다")
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> updateTodo(
            @PathVariable Long id,
            @RequestBody TodoRequest request
    ) {
        log.info("할일 수정 요청 - ID: {}", id);
        return ResponseEntity.ok(todoService.updateTodo(id, request));
    }

    @Operation(summary = "할일 삭제", description = "할일을 삭제합니다")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        log.info("할일 삭제 요청 - ID: {}", id);
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "할일 상태 업데이트", description = "할일의 완료 상태를 업데이트합니다")
    @PatchMapping("/{id}/status")
    public ResponseEntity<TodoResponse> updateTodoStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> request
    ) {
        log.info("할일 상태 업데이트 요청 - ID: {}", id);
        return ResponseEntity.ok(todoService.updateTodoStatus(id, request.get("completed")));
    }
} 