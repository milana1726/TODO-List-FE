import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Todo } from '../../../shared/models/interfaces/todo';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoApiService } from '../../services/todo-api.service';

@Component({
  selector: 'app-todo-page',
  imports: [TodoListComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent {
  private todoApiService = inject(TodoApiService);
  public todos = signal<Todo[]>([]);

  constructor() {
    this.todoApiService
      .getTodos()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.todos.set(data));
  }
}
