import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { NotificationService } from '../../../core/services/notification/notification.service';
import { TodoStore } from '../../../core/state/todo.store';
import { EditConfirmDialogComponent } from '../../../shared/components/edit-confirm-dialog/edit-confirm-dialog.component';
import { Todo } from '../../../shared/models/interfaces/todo';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  imports: [TodoListComponent, TodoFormComponent, MatPaginatorModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  public todoStore = inject(TodoStore);
  private readonly dialog = inject(MatDialog);
  private notification = inject(NotificationService);

  public todos = this.todoStore.todos;
  public totalTodos = this.todoStore.totalCount;
  public error = this.todoStore.error;

  public limit = 10;
  public page = 1;
  public pageIndex = 0;
  public showFirstLastButtons = true;

  constructor() {
    this.todoStore.getAllTodos();
    this.todoStore.getTodosPerPage(this.page, this.limit);
    this.watchError();
  }

  watchError() {
    effect(() => {
      const err = this.error();
      if (err) {
        this.notification.openFailureSnackBar(err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.todoStore.getTodosPerPage(this.page, this.limit);
  }

  addTodo(message: string) {
    this.page = 1;
    this.pageIndex = 0;
    this.todoStore.addTodo(message, this.page, this.limit);
    this.notification.openSuccessSnackBar('Todo added successfully');
  }

  toggleTodo(todo: Todo) {
    this.todoStore.toggleTodo(todo);
    this.notification.openSuccessSnackBar('Todo updated successfully');
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
        this.notification.openSuccessSnackBar('Todo updated successfully');
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
      const newPage =
        this.page > 1 && this.totalTodos() - 1 <= (this.page - 1) * this.limit
          ? this.page - 1
          : this.page;
      this.pageIndex = newPage - 1;

      if (confirmed) {
        this.todoStore.deleteTodo(id, newPage, this.limit);
        this.notification.openSuccessSnackBar('Todo deleted successfully');
      }
    });
  }
}
