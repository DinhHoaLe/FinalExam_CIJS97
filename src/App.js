import "./App.css";
import { useState, useEffect } from "react";
import black from ".//black.svg";

function App() {
const savedTodos = JSON.parse(localStorage.getItem("todos"))|| [];

  const [todos, setTodos] = useState(savedTodos);
  const [inputValue, setInputValue] = useState("");
  const [view, setView] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  }

  function handleDelete(index) {
    alert(index)
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleToggle(index) {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  function viewAll() {
    setView("all");
  }

  function viewActive() {
    setView("active");
  }

  function viewCompleted() {
    setView("completed");
  }

  const filteredTodos = todos.filter((todo) => {
    if (view === "active") return !todo.completed;
    if (view === "completed") return todo.completed;
    return true;
  });

  function handleDeleteAll() {
    const remainingTodos = todos.filter(todo => !todo.completed);
    setTodos(remainingTodos);
  }
  

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          position: "relative",
        }}
      >
        <h1>#todo</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "30px",
            borderBottom: "solid 1px black",
            marginBottom: "10px",
            width: "100%",
            height: "20px",
          }}
        >
          <h4
            className={view === "all" ? "viewActive" : ""}
            style={{ cursor: "pointer" }}
            onClick={viewAll}
          >
            All
          </h4>
          <h4
            className={view === "active" ? "viewActive" : ""}
            style={{ cursor: "pointer" }}
            onClick={viewActive}
          >
            Active
          </h4>
          <h4
            className={view === "completed" ? "viewActive" : ""}
            style={{ cursor: "pointer" }}
            onClick={viewCompleted}
          >
            Completed
          </h4>
        </div>
        {(view === "all" || view === "active") && (
          <form
            style={{
              display: "flex",
              height: "40px",
              justifyContent: "space-between",
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              style={{
                borderRadius: "5px",
                border: "gray 1px solid",
                paddingLeft: "10px",
                width: "400px",
              }}
              placeholder="add details"
              value={inputValue}
              onChange={handleChange}
            />
            <button
              type="submit"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "10px",
                backgroundColor: "#0083f5",
                color: "white",
                border: "none",
              }}
            >
              ADD
            </button>
          </form>
        )}

        <ul style={{ listStyleType: "none", width: "100%", padding: "0" }}>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                paddingBottom: "10px",
                alignItems: "center",
                position: "relative",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(index)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
              {view === "completed" && (
                <img
                  src={black}
                  alt="Delete"
                  style={{
                    width: "20px",
                    cursor: "pointer",
                    position: "absolute",
                    right: "0px",
                  }}
                  onClick={() => handleDelete(index)}
                />
              )}
            </li>
          ))}
          {view === "completed" && (
            <li style={{ padding: "10px 0px" }}>
              <div
                style={{
                  backgroundColor: "red",
                  borderRadius: "5px",
                  width: "100px",
                  padding: "10px 20px",
                  position: "absolute",
                  right: "0px",
                  cursor: "pointer",
                }}
                onClick={handleDeleteAll}
              >
                <img src={black} style={{ width: "20px" }} />
                <span>Delete All</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
