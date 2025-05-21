import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCardActions,
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { Todo } from '../../../shared/models/interfaces/todo';

@Component({
  selector: 'app-todo-item',
  imports: [
    MatCardModule,
    MatCardContent,
    MatCardActions,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo: Todo | null | undefined;
  @Output() deleteTodo = new EventEmitter<void>();
  @Output() updateTodo = new EventEmitter<void>();
  @Output() toggleTodo = new EventEmitter<void>();

  private router = inject(Router);

  onShowInfo(id: string | undefined) {
    this.router.navigate(['/todos', id]);
  }
}
