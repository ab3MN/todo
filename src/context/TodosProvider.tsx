import { ReactNode, useMemo } from 'react';

import { TodosContext } from './TodoContext';

import { useTodoErrors } from '@/hooks/useTodoErrors';
import { useTodoInput } from '@/hooks/useTodoInput';
import { useTodos } from '@/hooks/useTodos';

export const TodosProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const { error, showError } = useTodoErrors();
  const { inputRef, onFocus } = useTodoInput();
  const { todos, tempTodo, fetchTodos, addTodo, deleteTodo, deleteCompletedTodos, updateTodo, updatedAllTodo } =
    useTodos(showError);

  const store = useMemo(
    () => ({
      todos,
      tempTodo,
      error,
      inputRef,

      fetchTodos,
      addTodo,
      deleteTodo,
      showError,
      deleteCompletedTodos,
      updateTodo,
      updatedAllTodo,
      onFocus,
    }),
    [
      todos,
      error,
      tempTodo,
      inputRef,
      fetchTodos,
      addTodo,
      deleteTodo,
      showError,
      deleteCompletedTodos,
      updateTodo,
      updatedAllTodo,
      onFocus,
    ],
  );

  return <TodosContext.Provider value={store}>{children}</TodosContext.Provider>;
};
