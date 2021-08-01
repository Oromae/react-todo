import { useState, useEffect } from "react";

const initialListValue = { todoList: "", isCompleted: false };

function Input({ setList, list }) {
  const [input, setInput] = useState(initialListValue);

  useEffect(() => {
    setInput(initialListValue);
  }, [list]);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (input.todoList === "") {
      return false;
    }

    setList([...list, input]);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="new-todo"
        name="todoList"
        placeholder="What needs to be done?"
        value={input.todoList}
        onChange={onChangeInput}
        autoFocus
      />
    </form>
  );
}

export default Input;
