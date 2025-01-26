import { createContext, RefObject } from 'react';

import { TodoErrors } from '../utils/enums/TodoErrors';
import { Todo } from '../types/Todo';

interface ITodosContext {
  todos: Todo[];
  error: TodoErrors | null;
  tempTodo: Todo | null;
  inputRef: RefObject<HTMLInputElement> | null;

  onFocus: () => void;
  fetchTodos: () => void;
  addTodo: (title: string) => Promise<Todo | void>;
  deleteTodo: (todoId: number) => Promise<number | void>;
  deleteCompletedTodos: () => Promise<void>;
  updateTodo: (todo: Todo) => Promise<Todo | void>;
  updatedAllTodo: () => Promise<void>;
  showError: (err: TodoErrors) => void;
}

export const TodosContext = createContext<ITodosContext>({} as ITodosContext);
