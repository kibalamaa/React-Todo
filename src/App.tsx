import TodoList from './components/TodoList/TodoList';
import './App.css'
import TodoHeader from './components/TodoHeader/TodoHeader';

function App() {
  return (
    <div className="App">
      <TodoHeader />
      <TodoList />
    </div>
  );
}

export default App;
