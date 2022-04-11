import { useContext } from "react";
import classnames from "classnames";
import { Todo } from "../../types/Todo"
import "./TodoCard.scss";
import { TodoContext } from "../Todo/TodoPage";
import { Link } from "react-router-dom";

type Props = {
  todo: Todo,
};

type ContextProps = {
  todos: Todo[],
  selectedTodoId: number,
  setTodos: (value: Todo[]) => void,
  setSelectedTodo: (todo: Todo | undefined) => void,
  setSelectedTodoId: (id: number) => void,
}


export const TodoCard: React.FC<Props> = ({ todo }) => {
  const 
  { 
    todos, 
    selectedTodoId, 
    setTodos, 
    setSelectedTodo, 
    setSelectedTodoId 
  } = useContext<ContextProps>(TodoContext);

  const handleStatus = (todos: Todo[]) => {
    return [...todos].map(currentTodo => {
      return currentTodo.id === todo.id 
        ? {
            ...currentTodo,
            complete: !currentTodo.complete,
          }
        : currentTodo;
    });
  };

  return (
    <Link 
      to={todo.id.toString()}
      onClick={() => {
        setSelectedTodo(todo);
        setSelectedTodoId(todo.id);
      }}
      className={classnames(
        'todo__card',
        'card',
        {
          'card--selected': todo.id === selectedTodoId,
        }
      )}
    >
      <p 
        className={classnames(
          'card__title',
          { 
            'card__title--completed': todo.complete,
          },
        )}
      >
        {todo.title}
      </p>
      <input 
        className="card__checkbox"
        type="checkbox" 
        checked={todo.complete} 
        onChange={() => {
          setTodos(
            handleStatus(todos)
              .sort((a, b) => Number(a.complete) - Number(b.complete))
          );
        }}
      />
    </Link>
  );
};
