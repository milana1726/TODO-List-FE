import { Todo } from '../../shared/models/interfaces/todo';

export type TodoState = {
  todos: Todo[];
  selectedTodo: Todo | null;
  totalCount: number;
  error: string | null;
};
