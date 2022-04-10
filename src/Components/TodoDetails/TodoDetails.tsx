import { Todo } from "../../types/Todo"
import "./TodoDetails.scss";

type Props = {
  selectedTodo: Todo | undefined,
}
export const TodoDetails: React.FC<Props> = ({ selectedTodo }) => {
  return  (
    <div className="details">
      {selectedTodo && (
        <div className="details-place">
          <p>title: {selectedTodo.title}</p>
          <p>description: {selectedTodo.description || 'empty'}</p>
        </div>
      )}
    </div>
  );
};
