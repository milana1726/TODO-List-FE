import { Todo } from '../../shared/models/interfaces/todo';

export type TodoState = {
  todos: Todo[];
  totalCount: number;
  error: string | null;
};
