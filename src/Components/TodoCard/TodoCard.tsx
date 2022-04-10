import { useContext } from "react";
import classnames from "classnames";
import { Todo } from "../../types/Todo"
import "./TodoCard.scss";
import { TodoContext } from "../Todo/TodoPage";

type Props = {
  todo: Todo,
};

type ContextProps = {
  todos: Todo[],
  setTodos: (value: Todo[]) => void,
}


export const TodoCard: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext<ContextProps>(TodoContext);

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
    <div className="todo__card card">
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
    </div>
  );
};
