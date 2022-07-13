import "./App.css";
// import TodoList from "./componenets/TodoClass";
import TodoList from "./componenets/TodoFunction";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
}

export default App;
