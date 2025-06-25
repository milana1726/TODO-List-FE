import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../../shared/models/interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private readonly http = inject(HttpClient);
  private readonly reqUrl = '/todos';

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.reqUrl);
  }

  public getTodosPerPage(
    pageNumber: number,
    limit: number
  ): Observable<Todo[]> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('limit', limit.toString());
    return this.http.get<Todo[]>(this.reqUrl, { params });
  }

  public getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.reqUrl}/${id}`);
  }

  public addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.reqUrl, newTodo);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.reqUrl}/${todo._id}`, todo);
  }

  public deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.reqUrl}/${id}`);
  }
}
