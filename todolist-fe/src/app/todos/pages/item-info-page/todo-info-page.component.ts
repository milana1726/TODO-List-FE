import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoStore } from '../../../core/state/todo.store';
import { Todo } from '../../../shared/models/interfaces/todo';
import { TodoDetailedInfoComponent } from '../../components/todo-detailed-info/todo-detailed-info.component';

@Component({
  selector: 'app-todo-info-page',
  imports: [
    TodoDetailedInfoComponent,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './todo-info-page.component.html',
  styleUrl: './todo-info-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInfoPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public todoStore = inject(TodoStore);
  public selectedTodo = this.todoStore.selectedTodo;

  ngOnInit(): void {
    const todo = this.route.snapshot.data['todo'] as Todo | null;

    if (todo) {
      this.todoStore.setSelectedTodo(todo);
    } else {
      this.router.navigate(['/404']);
    }
  }

  onReturn() {
    this.router.navigate(['/todos']);
  }
}
