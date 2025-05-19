import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../../shared/models/interfaces/todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<Todo>();

  static trackByFn(todo: Todo): string {
    return todo._id;
  }
}
