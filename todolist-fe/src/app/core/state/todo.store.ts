import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { Todo } from '../../shared/models/interfaces/todo';
import { TodoApiService } from '../../todos/services/todo-api.service';
import { TodoState } from './todo.state';

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState<TodoState>({
    todos: [] as Todo[],
    loading: false,
    error: null as string | null,
  }),
  withMethods((store, todoApi = inject(TodoApiService)) => ({
    getAllTodos: () => {
      patchState(store, { loading: true });
      todoApi.getTodos().subscribe({
        next: (todos) =>
          patchState(store, { todos, loading: false, error: null }),
        error: (err: Error) =>
          patchState(store, { loading: false, error: err.message }),
      });
    },
    addTodo: (message: string) => {
      patchState(store, { loading: true });
      todoApi.addTodo({ message, completed: false }).subscribe({
        next: (newTodo) =>
          patchState(store, {
            todos: [...store.todos(), newTodo],
            loading: false,
            error: null,
          }),
        error: (err: Error) =>
          patchState(store, {
            loading: false,
            error: err.message,
          }),
      });
    },
    toggleTodo: (todo: Todo) => {
      patchState(store, { loading: true });
      todoApi.updateTodo({ ...todo, completed: !todo.completed }).subscribe({
        next: (updatedTodo) =>
          patchState(store, {
            todos: store
              .todos()
              .map((t) => (t._id === updatedTodo._id ? updatedTodo : t)),
            loading: false,
            error: null,
          }),
        error: (err: Error) =>
          patchState(store, {
            loading: false,
            error: err.message,
          }),
      });
    },

    updateTodoMessage: (todo: Todo, updatedMessage: string) => {
      patchState(store, { loading: true });
      todoApi.updateTodo({ ...todo, message: updatedMessage }).subscribe({
        next: (updatedTodo) =>
          patchState(store, {
            todos: store
              .todos()
              .map((t) => (t._id === updatedTodo._id ? updatedTodo : t)),
            loading: false,
            error: null,
          }),
        error: (err: Error) =>
          patchState(store, {
            loading: false,
            error: err.message,
          }),
      });
    },
    deleteTodo: (id: string) => {
      patchState(store, { loading: true });
      todoApi.deleteTodo(id).subscribe({
        next: () =>
          patchState(store, {
            todos: store.todos().filter((t) => t._id !== id),
            loading: false,
            error: null,
          }),
        error: (err: Error) =>
          patchState(store, {
            loading: false,
            error: err.message,
          }),
      });
    },
  }))
);
