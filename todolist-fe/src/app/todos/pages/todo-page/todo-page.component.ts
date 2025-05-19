import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { EditConfirmDialogComponent } from '../../../shared/components/edit-confirm-dialog/edit-confirm-dialog.component';
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
  readonly dialog = inject(MatDialog);

  constructor() {
    this.todoApiService
      .getTodos()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.todos.set(data));
  }

  updateTodo(todo: Todo) {
    const dialogRef = this.dialog.open(EditConfirmDialogComponent, {
      width: '25rem',
      data: {
        type: 'edit',
        title: 'Update todo message',
        value: todo.message,
        confirmText: 'Update',
      },
    });

    dialogRef.afterClosed().subscribe((updatedMessage: string) => {
      if (updatedMessage) {
        console.log(updatedMessage);
      }
    });
  }

  deleteTodo(id: string) {
    const dialogRef = this.dialog.open(EditConfirmDialogComponent, {
      width: '25rem',
      data: {
        type: 'delete',
        title: 'Confirm delete',
        message: 'Are you sure you want to delete this todo?',
        confirmText: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log(id);
      }
    });
  }
}
