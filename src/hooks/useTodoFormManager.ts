import { useState, useContext, useLayoutEffect } from 'react';

import { TodosContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';
import { isOnlyWhiteSpace } from '../utils/string/isOnlyWhiteSpace';
import { TodoErrors } from '../utils/enums/TodoErrors';

export const useTodoFormManager = (initialTitle = '') => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('there is no TodosProvider');
  }

  const { addTodo, updateTodo, updatedAllTodo, showError, onFocus, deleteTodo } = todosContext;

  const [title, setTitle] = useState(initialTitle);
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useLayoutEffect(() => {
    if (!isInputDisabled) {
      onFocus();
    }
  }, [isInputDisabled, onFocus]);

  const handleAddTodo = async () => {
    setInputDisabled(true);

    try {
      await addTodo(title.trim());
      setTitle('');
    } catch {
      showError(TodoErrors.add);
    } finally {
      setInputDisabled(false);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    setIsUpdating(true);

    try {
      if (todo.title.trim()) {
        const updatedTodo = await updateTodo(todo);

        setIsUpdating(false);

        return updatedTodo;
      } else {
        await deleteTodo(todo.id);
      }
    } catch {
      showError(TodoErrors.update);
    }

    setIsUpdating(false);
  };

  const handleToogleAllTodoStatus = async () => {
    await updatedAllTodo();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || isOnlyWhiteSpace(title)) {
      showError(TodoErrors.title);

      return;
    }

    handleAddTodo();
  };

  return {
    title,
    isInputDisabled,
    isUpdating,
    setTitle,
    handleSubmit,
    handleChangeTitle,
    handleAddTodo,
    handleUpdateTodo,
    handleToogleAllTodoStatus,
  };
};
