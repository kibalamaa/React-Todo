import { useState } from "react";
import type { TodoTypes } from "../todo";
import TodoService from "../TodoService";
import { FaCheck, FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../css/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [toEditId, setToEditId] = useState<number | null>(null);
  const [toEditText, setToEditText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setToEditId(id);
    setToEditText(text);
  };

  const handleEditCancel = () => {
    setToEditId(null);
    setToEditText("");
  };

  const handleEditSave = (id: number) => {
    if (toEditText.trim() !== "") {
      // <-- fixed condition
      const updatedTodo = TodoService.updateTodo({
        id,
        text: toEditText,
        completed: false,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      setToEditId(null);
      setToEditText("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {toEditId == todo.id ? (
              <div className="editedText">
                <input
                  type="text"
                  value={toEditText}
                  onChange={(e) => setToEditText(e.target.value)}
                  autoFocus={true}
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>

                <button
                  className="cancelBtn"
                  onClick={() => handleEditCancel()}
                >
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
