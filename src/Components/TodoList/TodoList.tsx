import { Todo } from "../../types/Todo";
import { TodoCard } from "../TodoCard/TodoCard";
import { TodoDetails } from "../TodoDetails/TodoDetails";
import { useNavigate } from "react-router-dom";
import "./TodoList.scss"
import { useCallback, useContext, useEffect, useState } from "react";
import { TodoContext } from "../Todo/TodoPage";

type TodoListContextProps = {
  todos: Todo[],
  deleteTodo: (todo: Todo) => void,
  setSelectedTodoId: (id: number) => void,
  selectedTodoId: number,
  setSelectedTodo: (todo: Todo | undefined) => void,
  selectedTodo: Todo | undefined,
  handleComplete: (todo: Todo, todos: Todo[], isComplete: boolean) => void,
}

export const TodoList: React.FC = () => {
  const { 
    todos,
    deleteTodo,
    setSelectedTodoId,
    selectedTodoId,
    setSelectedTodo,
    selectedTodo,
  } = useContext<TodoListContextProps>(TodoContext);

  const navigate = useNavigate();


  const [displayedTodos, setdisplayedTodos] = useState<Todo[]>(todos);
  const [currentDisplay, setCurrentDisplay] = useState<string>('All');
  const displayFormat: string[] = ['All', 'Todo', 'Complete'];
  
  const handleDisplay = useCallback(() => {
    switch (currentDisplay) {
      case 'Todo':
        setdisplayedTodos([...todos.filter(todo => todo.complete === false)]);
        break;

      case 'Complete':
        setdisplayedTodos([...todos.filter(todo => todo.complete === true)]);
        break;

        default:
        setdisplayedTodos([...todos]);
    }
  }, [currentDisplay, todos]);

  useEffect(() => {
    setdisplayedTodos(todos);
  }, [todos]);

  useEffect(() => {
    handleDisplay();
  }, [currentDisplay, todos, handleDisplay]);

  return (
    <div className="todoList">
      <select
        onChange={(event) => {
          setCurrentDisplay(event.target.value);
          handleDisplay();
        }}
        name="select" 
        id="select"
        className="todoList__filter"
      >
        {displayFormat.map(format => (
          <option
            key={format}
            value={format}
          >
            {format}
          </option>
        ))}
      </select>
      {displayedTodos.map(todo => (
        <div className="todoList__card" key={todo.id}>
          <TodoCard todo={todo} />
          <div className="todo__card-button-place">
            {selectedTodoId !== todo.id 
            ? (
              <button
                type="button"
                className="button is-info todo__card-button"
                onClick={() => {
                  setSelectedTodoId(todo.id);
                  setSelectedTodo(todos.find(selected => selected.id === todo.id))
                  navigate(`${todo.id}`);
                  setSelectedTodoId(todo.id)
                }}
              >
                show details
              </button>
            ) : (
              <button
                type="button"
                className="button is-warning todo__card-button"
                onClick={() => {
                  setSelectedTodoId(0);
                  setSelectedTodo(undefined)
                  navigate("/todos");
                }}
              >
                hide details
              </button>
            )}
            
            <button
              type="button" 
              className="button is-danger todo__card-button"
              onClick={() => {
                deleteTodo(todo);
              }}
            >
              delete Todo
            </button>
          </div>
          {selectedTodo && (
            selectedTodoId === todo.id && (
              <TodoDetails selectedTodo={selectedTodo}/>
            )
          )}
        </div>
      ))}
    </div>
  )
}