export interface Todo {
  _id: string;
  message: string;
  completed?: boolean;
}

export interface TodoBody {
  message: string;
  completed?: boolean;
}

export interface TodoResponse {
  _id: string;
}
