// app/Labs/Lab5/WorkingWithArraysAsynchronously.tsx
"use client";
import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import * as client from "./Client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch todos on component mount
  const fetchTodos = async () => {
    try {
      const fetchedTodos = await client.fetchTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ========== CREATE OPERATIONS ==========
  
  // Create using GET (green plus icon)
  const createNewTodo = async () => {
    try {
      const updatedTodos = await client.createNewTodo();
      setTodos(updatedTodos);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error creating todo");
    }
  };

  // Create using POST (blue plus icon) - REQUIRED FOR RUBRIC
  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
        description: "Created using POST"
      });
      setTodos([...todos, newTodo]);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error posting todo");
    }
  };

  // ========== UPDATE OPERATIONS ==========
  
  // Enable editing mode
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  // Update using PUT - REQUIRED FOR RUBRIC
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating todo");
    }
  };

  // ========== DELETE OPERATIONS ==========
  
  // Delete using GET (trash icon)
  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error removing todo");
    }
  };

  // Delete using DELETE (X icon) - REQUIRED FOR RUBRIC
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error deleting todo");
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {/* Error Message Display - REQUIRED FOR RUBRIC */}
      {errorMessage && (
        <div 
          id="wd-todo-error-message" 
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      {/* Header with Create Buttons */}
      <h4>
        Todos
        {/* Green plus: CREATE using GET */}
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
        />
        {/* Blue plus: POST - REQUIRED FOR RUBRIC */}
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
        />
      </h4>

      {/* Todos List */}
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="d-flex align-items-center">
            
            {/* Checkbox for completed status */}
            <input
              type="checkbox"
              checked={todo.completed}
              className="form-check-input me-2"
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {/* Editable Title or Display Title */}
            {!todo.editing ? (
              <span className="flex-grow-1">{todo.title}</span>
            ) : (
              <FormControl
                className="flex-grow-1 me-2"
                value={todo.title}
                onChange={(e) =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, title: e.target.value } : t
                    )
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
              />
            )}

            {/* Action Icons */}
            <div className="d-flex gap-2">
              {/* Edit Icon */}
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary"
                style={{ cursor: "pointer" }}
              />
              
              {/* X Delete Icon - DELETE method - REQUIRED */}
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger fs-3"
                id="wd-delete-todo"
                style={{ cursor: "pointer" }}
              />
              
              {/* Trash Icon - GET method */}
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger"
                id="wd-remove-todo"
                style={{ cursor: "pointer" }}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}