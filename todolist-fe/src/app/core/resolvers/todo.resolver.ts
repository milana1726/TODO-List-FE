import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Todo } from '../../shared/models/interfaces/todo';
import { TodoApiService } from '../../todos/services/todo-api.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({ providedIn: 'root' })
export class TodoResolver implements Resolve<Todo | null> {
  private notification = inject(NotificationService);

  constructor(private todoApi: TodoApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Todo | null> {
    const id = route.paramMap.get('id');
    if (!id) return of(null);
    return this.todoApi.getTodoById(id).pipe(
      catchError((error) => {
        this.notification.openFailureSnackBar(error.message);
        return of(null);
      })
    );
  }
}
