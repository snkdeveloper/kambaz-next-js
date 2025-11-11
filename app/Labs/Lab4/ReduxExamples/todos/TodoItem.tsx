import { Button, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({
  todo,
  
}: {
  todo: { id: string; title: string };
  
}) {
    const dispatch = useDispatch();
  return (
    <ListGroupItem
      key={todo.id}
      className="d-flex align-items-center justify-content-between"
    >
      <div>{todo.title}</div>
      <div className="d-flex gap-2">
        <Button
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit
        </Button>
      </div>
    </ListGroupItem>
  );
}
