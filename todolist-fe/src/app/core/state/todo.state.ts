import { Todo } from '../../shared/models/interfaces/todo';

export type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};
