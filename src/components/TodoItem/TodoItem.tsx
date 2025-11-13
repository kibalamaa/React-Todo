import { useState } from "react";
import type { TodoTypes } from "../../todo";
import styles from "./TodoItem.module.css";

import EditIcon from "../../assets/icons/EditIcon.svg";
import SaveIcon from "../../assets/icons/SaveIcon.svg";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";
import CancelIcon from "../../assets/icons/CancelIcon.svg";

interface TodoItemProps {
  todo: TodoTypes;
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  return (
    <div className={styles.items}>
      <div className={styles.textAndButtons}>
        {isEditing ? (
          <input
            className={styles.editInput}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
        ) : (
          <span className={styles.text}>{todo.text}</span>
        )}

        <div className={styles.buttons}>
          {isEditing ? (
            <>
              <button onClick={handleSave}>
                <img src={SaveIcon} width={25} height={20} />
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                <img src={CancelIcon} width={20} height={20} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>
                <img src={EditIcon} width={25} height={20} />
              </button>
              <button onClick={() => onDelete(todo.id)}>
                <img src={DeleteIcon} width={20} height={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
