import { Todo } from '../types/todo';

const API_BASE = 'http://localhost:8080/api/todos';

export const TodoAPI = {
  // 전체 할일 조회
  getAllTodos: async (): Promise<Todo[]> => {
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`할일 조회 실패: ${errorText}`);
      }
      const data = await response.json();
      console.log('API 응답 데이터:', data);
      return data;
    } catch (error) {
      console.error('할일 조회 중 오류 발생:', error);
      throw error;
    }
  },

  // 새 할일 생성 
  createTodo: async (title: string, description?: string): Promise<Todo> => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed: false })
      });
      if (!response.ok) throw new Error('할일 생성 실패');
      return response.json();
    } catch (error) {
      console.error('할일 생성 중 오류 발생:', error);
      throw error;
    }
  },

  // 할일 수정
  updateTodo: async (id: string, completed: boolean): Promise<Todo> => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
      if (!response.ok) throw new Error('할일 수정 실패');
      return response.json();
    } catch (error) {
      console.error('할일 수정 중 오류 발생:', error);
      throw error;
    }
  },

  // 할일 삭제
  deleteTodo: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('할일 삭제 실패');
    } catch (error) {
      console.error('할일 삭제 중 오류 발생:', error);
      throw error;
    }
  }
}; 