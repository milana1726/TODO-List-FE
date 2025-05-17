import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../../shared/models/constants/api-url';
import {
  Todo,
  TodoBody,
  TodoResponse,
} from '../../shared/models/interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private readonly http: HttpClient = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(BASE_URL);
  }

  public getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${BASE_URL}/${id}`);
  }

  public addTodo(newTodo: Partial<TodoBody>): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(BASE_URL, newTodo);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${BASE_URL}/${todo._id}`, todo);
  }

  public deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${BASE_URL}/${id}`);
  }
}
