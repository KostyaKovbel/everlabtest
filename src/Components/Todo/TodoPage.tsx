import React, { createContext, useEffect, useState } from "react"
import { Todo } from "../../types/Todo";
import "./TodoPage.scss"
import { TodoList } from "../TodoList/TodoList"
import classNames from "classnames";
import { useParams } from "react-router-dom";

export const TodoContext = createContext<any>([]);

export const TodoPage: React.FC = () => {
  const { todoId } = useParams();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedTodoId, setSelectedTodoId] = useState<number>(todoId ? Number(todoId) : 0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [titleError, setTitleError] = useState<boolean>(false);

  useEffect(() => {
    const todo = window.localStorage.getItem('todos');

    if (todo) {
      setTodos(JSON.parse(todo));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todoFromServer = window.localStorage.getItem('selectedTodo') || '';

    if (todoFromServer) {
      setSelectedTodo(JSON.parse(todoFromServer));
    }
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      window.localStorage.setItem('selectedTodo', JSON.stringify(selectedTodo));
    }
  }, [selectedTodo]);


  const resetFields = () => {
    setTitle('');
    setDescription('');
  };

  const addTodo = () => {
    if (title.trim().length === 0) {
      setTitleError(true);
      return;
    }

    const newTodo = createTodo();
    setTodos(oldList => ([newTodo, ...oldList]))

    resetFields();
  };

  const deleteTodo = (todo: Todo) => {
    setTodos([...todos].filter(toDelete => toDelete.id !== todo.id))
    setSelectedTodoId(0);
    setSelectedTodo(null);
  }

  const createTodo = () => {
    const id = todos.length 
      ? todos.reduce((prev, curr) => {
        return curr.id > prev 
          ? curr.id
          : prev;
      }, 0) + 1 
      : 1;
  
    return (
      {
        id,
        title,
        description,
        complete: false,
      }
    )
  };

  return (
    <div className="todo">
      <div className="control is-expanded todo__fields">
        <input 
          className={classNames(
            'input', 
            {
              'is-danger': titleError,
            }
          )} 
          type="text" 
          placeholder="Todo Title" 
          id="input-add" 
          autoCorrect="off"
          value={title}
          onChange={(event) => {
            const userInput = event.target.value;

            if (userInput.length <= 30) {
              setTitle(userInput);
              setTitleError(false);
            }
          }}
        />
        <input 
          className="input" 
          type="textarea" 
          placeholder="Describe your task!" 
          id="input-add" 
          autoCorrect="off"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <button 
        className="button is-primary todo__button" 
        id="add-btn"
        onClick={() => {
          addTodo();
        }}
      >
        ADD
      </button>

      <div className="todo__content">

      {todos.length !== 0 && (
        <div className="todo__content-container">
          <TodoContext.Provider 
            value={
              {
                todos,
                deleteTodo,
                setTodos,
                setSelectedTodoId,
                selectedTodoId,
                setSelectedTodo,
                selectedTodo,
              }
            }
          >
            <TodoList />
          </TodoContext.Provider>
        </div>
      )}
      </div>
    </div>
  );
}
