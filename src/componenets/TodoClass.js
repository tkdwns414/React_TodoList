import React from "react";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      todos: [
        { id: 1, text: "work1", checked: false },
        { id: 2, text: "work2", checked: false },
      ],
      curId: 3,
    };

    this.handleChange = this.handleChange.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  createTodo(e) {
    this.setState({
      todos: [
        ...this.state.todos,
        { id: this.state.curId, text: this.state.value, checked: false },
      ],
    });
    this.setState({ curId: this.state.curId + 1 });
    this.setState({ value: "" });
  }

  completeTodo(id) {
    let index = this.state.todos.findIndex((x) => x.id === id);
    let todos = [...this.state.todos];
    if (index > -1) todos[index].checked = true;
    this.setState({ todos: todos });
  }

  deleteTodo(id) {
    let index = this.state.todos.findIndex((x) => x.id === id);
    let todos = [...this.state.todos];
    if (index > -1) todos.splice(index, 1);
    this.setState({ todos: todos });
  }

  updateTodo(id, newValue) {
    let index = this.state.todos.findIndex((x) => x.id === id);
    let todos = [...this.state.todos];
    todos[index].text = newValue;
    this.setState({ todos: todos });
  }

  render() {
    return (
      <>
        <h1>Todo List</h1>
        <ul>
          {this.state.todos.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              onComplete={this.completeTodo}
              onDelete={this.deleteTodo}
              onUpdate={this.updateTodo}
            />
          ))}
        </ul>
        <TodoForm
          value={this.state.value}
          onChange={this.handleChange}
          onClick={this.createTodo}
        />
      </>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statement: false,
      temporaryValue: props.todo.text,
    };
  }

  render() {
    let text;
    if (this.props.todo.checked) {
      text = (
        <>
          <span>
            <del>{this.props.todo.text}</del>
          </span>
          <Button
            btext="삭제"
            onClick={() => this.props.onDelete(this.props.todo.id)}
          />
        </>
      );
    } else {
      text = (
        <>
          <span onClick={() => this.setState({ statement: true })}>
            {this.props.todo.text}
          </span>
          <Button
            btext="완료"
            onClick={() => this.props.onComplete(this.props.todo.id)}
          />

          <Button
            btext="삭제"
            onClick={() => this.props.onDelete(this.props.todo.id)}
          />
        </>
      );
    }

    if (this.state.statement) {
      text = (
        <TodoForm
          value={this.state.temporaryValue}
          onChange={(e) => this.setState({ temporaryValue: e.target.value })}
          onClick={(e) => {
            this.props.onUpdate(this.props.todo.id, this.state.temporaryValue);
            this.setState({ statement: false });
          }}
          todoId={this.props.todo.id}
          onCancel={() =>
            this.setState({
              temporaryValue: this.props.todo.text,
              statement: false,
            })
          }
        />
      );
    }

    return (
      <li>
        <span>{text}</span>
      </li>
    );
  }
}

class TodoForm extends React.Component {
  render() {
    return (
      <div>
        <input
          id={this.props.todoId}
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") this.props.onClick();
          }}
        ></input>
        <Button btext="입력" onClick={this.props.onClick} />
        {this.props.onCancel && (
          <Button btext="취소" onClick={this.props.onCancel} />
        )}
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.btext}</button>;
  }
}

export default TodoList;
