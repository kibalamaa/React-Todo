import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import TodoService from "../../TodoService";
import type { TodoTypes } from "../../todo";
import styles from './TodoForm.module.css'

import AddIcon from '../../assets/icons/AddIcon.svg'

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodo) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  };
  return (
    <div className={styles.inputForm}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a Task"
      />
      <button onClick={handleAddTodo}>
        <img src={AddIcon} width={18} height={18}/>
        Add Task
        </button>
    </div>
  );
};

export default TodoForm;
