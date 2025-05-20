import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TodoStore } from '../../../core/state/todo.store';
import { EditConfirmDialogComponent } from '../../../shared/components/edit-confirm-dialog/edit-confirm-dialog.component';
import { Todo } from '../../../shared/models/interfaces/todo';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  imports: [TodoListComponent, TodoFormComponent, MatProgressSpinnerModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent {
  public todoStore = inject(TodoStore);
  private readonly dialog = inject(MatDialog);

  public todos = this.todoStore.todos;
  public loading = this.todoStore.loading;
  public error = this.todoStore.error;

  constructor() {
    this.todoStore.getAllTodos();
  }

  addTodo(message: string) {
    this.todoStore.addTodo(message);
  }

  toggleTodo(todo: Todo) {
    this.todoStore.toggleTodo(todo);
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
        this.todoStore.updateTodoMessage(todo, updatedMessage);
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
        this.todoStore.deleteTodo(id);
      }
    });
  }
}
