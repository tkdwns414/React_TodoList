import { useState } from "react";

export default function TodoList(props) {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "잠에서 깨기", checked: false },
  ]);
  const [curId, setCurId] = useState(2);

  const addTodo = () => {
    setTodos([...todos, { id: curId, text: value, checked: false }]);
    setCurId(curId + 1);
    setValue("");
  };

  const completeTodo = (id) => {
    let index = todos.findIndex((x) => x.id === id);
    let todosCopy = [...todos];
    if (index > -1) todosCopy[index].checked = true;
    setTodos(todosCopy);
  };

  const deleteTodo = (id) => {
    let index = todos.findIndex((x) => x.id === id);
    let todosCopy = [...todos];
    if (index > -1) todosCopy.splice(index, 1);
    setTodos(todosCopy);
  };

  const updateTodo = (id, newValue) => {
    let index = todos.findIndex((x) => x.id === id);
    let todosCopy = [...todos];
    if (index > -1) todosCopy[index].text = newValue;
    console.log(todosCopy[index]);
    setTodos(todosCopy);
  };

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo
              todo={todo}
              onDelete={deleteTodo}
              onComplete={completeTodo}
              onUpdate={updateTodo}
            />
          </li>
        ))}
      </ul>
      <TodoForm value={value} onChange={setValue} onClick={addTodo} />
    </>
  );
}

function Todo(props) {
  const [temporaryValue, setTemporaryValue] = useState(props.todo.text);
  const [editState, setEditState] = useState(false);
  let item = "";

  if (props.todo.checked) {
    // 완료
    item = (
      <>
        <span>
          <del>{props.todo.text}</del>
        </span>
        <Button text="삭제" onClick={() => props.onDelete(props.todo.id)} />
      </>
    );
  } else {
    //미완료
    item = (
      <>
        <span onClick={() => setEditState(true)}>{props.todo.text}</span>
        <Button text="완료" onClick={() => props.onComplete(props.todo.id)} />
        <Button text="삭제" onClick={() => props.onDelete(props.todo.id)} />
      </>
    );
  }

  if (editState) {
    item = (
      <>
        <TodoForm
          value={temporaryValue}
          onChange={setTemporaryValue}
          onClick={() => {
            props.onUpdate(props.todo.id, temporaryValue);
            setEditState(false);
          }}
          onCancel={() => {
            setTemporaryValue(props.todo.text);
            setEditState(false);
          }}
        />
      </>
    );
  }

  return item;
}

function TodoForm(props) {
  return (
    <div>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      ></input>
      <Button text="입력" onClick={props.onClick} />
      {props.onCancel && <Button text="취소" onClick={props.onCancel} />}
    </div>
  );
}

function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}
