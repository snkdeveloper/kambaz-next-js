import { Button, ListGroupItem, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
export default function TodoForm(){
 
 
   const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

 
  return (
    <ListGroupItem className="d-flex align-items-center gap-2">
      <Button
        variant="success"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
      >
        Add
      </Button>
      <Button
        variant="warning"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo..."
      />
    </ListGroupItem>
  );
}
