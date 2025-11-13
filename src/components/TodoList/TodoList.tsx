import { useState } from "react";
import type { TodoTypes } from "../../todo";
import TodoService from "../../TodoService";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.css';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());

  const handleUpdateTodo = (id: number, newText: string) => {
    const updatedTodo = TodoService.updateTodo({
      id,
      text: newText,
      completed: false,
    });
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.todoContainer}>
      <TodoForm setTodos={setTodos} />

      <div className={styles.todos}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
