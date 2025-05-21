import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '../../shared/models/interfaces/todo';
import { TodoApiService } from '../../todos/services/todo-api.service';
import { TodoState } from './todo.state';

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState<TodoState>({
    todos: [] as Todo[],
    totalCount: 0,
    error: null as string | null,
  }),
  withMethods((store, todoApi = inject(TodoApiService)) => ({
    getAllTodos: () => {
      todoApi.getTodos().subscribe({
        next: (todos) =>
          patchState(store, {
            totalCount: todos.length,
            error: null,
          }),
        error: (err: Error) => patchState(store, { error: err.message }),
      });
    },

    getTodosPerPage: (page: number, limit: number) => {
      todoApi.getTodosPerPage(page, limit).subscribe({
        next: (todos) =>
          patchState(store, {
            todos,
            error: null,
          }),
        error: (err: Error) => patchState(store, { error: err.message }),
      });
    },

    addTodo: (message: string, page: number, limit: number) => {
      const tempId = uuidv4();
      const optimisticTodo: Todo = {
        _id: tempId,
        message,
        completed: false,
        createdAt: new Date(),
      };

      patchState(store, {
        todos: [optimisticTodo, ...store.todos()],
        totalCount: store.totalCount() + 1,
        error: null,
      });

      todoApi.addTodo({ message, completed: false }).subscribe({
        next: () => {
          todoApi.getTodosPerPage(page, limit).subscribe({
            next: (todos) => {
              patchState(store, {
                todos,
                error: null,
              });
            },
            error: (err: Error) => {
              patchState(store, { error: err.message });
            },
          });
        },
        error: (err: Error) => {
          patchState(store, {
            todos: store.todos().filter((t) => t._id !== tempId),
            totalCount: store.totalCount() - 1,
            error: err.message,
          });
        },
      });
    },

    toggleTodo: (todo: Todo) => {
      const updated = { ...todo, completed: !todo.completed };
      patchState(store, {
        todos: store.todos().map((t) => (t._id === todo._id ? updated : t)),
        error: null,
      });

      todoApi.updateTodo(updated).subscribe({
        next: (serverTodo) => {
          patchState(store, {
            todos: store
              .todos()
              .map((t) => (t._id === serverTodo._id ? serverTodo : t)),
          });
        },
        error: (err: Error) => {
          patchState(store, {
            todos: store.todos().map((t) => (t._id === todo._id ? todo : t)),
            error: err.message,
          });
        },
      });
    },

    updateTodoMessage: (todo: Todo, updatedMessage: string) => {
      const updated = { ...todo, message: updatedMessage };
      patchState(store, {
        todos: store.todos().map((t) => (t._id === todo._id ? updated : t)),
        error: null,
      });

      todoApi.updateTodo(updated).subscribe({
        next: (serverTodo) => {
          patchState(store, {
            todos: store
              .todos()
              .map((t) => (t._id === serverTodo._id ? serverTodo : t)),
          });
        },
        error: (err: Error) => {
          patchState(store, {
            todos: store.todos().map((t) => (t._id === todo._id ? todo : t)),
            error: err.message,
          });
        },
      });
    },

    deleteTodo: (id: string, page: number, limit: number) => {
      const beforeDeleteTodos = store.todos();
      const filteredTodos = store.todos().filter((t) => t._id !== id);
      const newTotal = store.totalCount() - 1;

      patchState(store, {
        todos: filteredTodos,
        totalCount: newTotal,
        error: null,
      });

      todoApi.deleteTodo(id).subscribe({
        next: () => {
          todoApi.getTodosPerPage(page, limit).subscribe({
            next: (todos) =>
              patchState(store, {
                todos,
                error: null,
              }),
          });
        },
        error: (err: Error) => {
          patchState(store, {
            todos: beforeDeleteTodos,
            totalCount: store.totalCount() + 1,
            error: err.message,
          });
        },
      });
    },
  }))
);
