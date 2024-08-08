import React from "react";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue("");
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{display:"flex",height:"35px", justifyContent:"space-between"}}>
        <input type="text" value={inputValue} onChange={handleChange} style={{borderRadius:"5px"}}/>
        <button onClick={handleSubmit}>Add Todo</button>
      </form>
      <ul style={{ listStyleType: "none" }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: "flex", gap: "20px" }}>
            <input type="checkbox" />
            {todo}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
