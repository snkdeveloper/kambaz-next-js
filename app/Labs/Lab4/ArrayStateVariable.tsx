import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";

type Todo = {
  id: string;
  title: string;
};

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="p-3">
      <h2>Array State Variable</h2>

      <ListGroup>
        {todos.map((todo: Todo) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>

      <button className="btn btn-success mb-2" onClick={addElement}>
        Add Element
      </button>

      <ul className="list-unstyled">
        {array.map((item, index) => (
          <li key={index} className="mb-1">
            {item}{" "}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}
