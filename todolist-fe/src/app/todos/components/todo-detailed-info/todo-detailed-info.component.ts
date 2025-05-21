import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Todo } from '../../../shared/models/interfaces/todo';

@Component({
  selector: 'app-todo-detailed-info',
  imports: [MatCardModule, MatCardContent, MatIconModule, CommonModule],
  templateUrl: './todo-detailed-info.component.html',
  styleUrl: './todo-detailed-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailedInfoComponent {
  @Input() selectedTodo: Todo | null = null;
}
