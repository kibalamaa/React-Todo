import styles from "./TodoHeader.module.css";

const TodoHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo List App</h1>
    </header>
  );
};

export default TodoHeader;
