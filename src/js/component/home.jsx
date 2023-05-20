import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => setInputValue(event.target.value);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let newTodo = {
        label: inputValue,
        done: false
      };
      setToDos((toDos) => [...toDos, newTodo]);
      setInputValue("");
    }
  };

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jrealmorillo")
      .then((response) => response.json())
      .then((result) => setToDos(Array.isArray(result) ? result : []))
      .catch((error) => console.log("Error:", error));
  }, []);

  const updateToDos = (toDos) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(toDos),
      redirect: "follow"
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/jrealmorillo",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const deleteOneToDo = (index) => {
    let newToDo = toDos.filter((_, todoIndex) => todoIndex !== index);
    setToDos(newToDo);
    updateToDos(newToDo);
  };

  const deleteAllToDos = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/jrealmorillo",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          setToDos([]);
          console.log("All tasks deleted successfully.");
        } else {
          console.log("Error deleting tasks:", response.json());
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleMouseOver = () => {
    setShowAlert(true);
  };

  const handleMouseLeave = () => {
    setShowAlert(false);
  };

  return (
    <div className="container col-4 text-center align-items-center">
      <h2 className="tracking-in-expand-forward-top">This is a ToDo List...</h2>
      <h6 className="tracking-in-expand-forward-top">...using Fetch</h6>
      <ul className="align-items-center tracking-in-expand-forward-bottom">
        <li className="align-items-center shake-horizontal">
          <input
            type="text"
            onChange={handleChange}
            value={inputValue}
            placeholder="Add some task"
            onKeyDown={handleKeyDown}
          />
        </li>
        {toDos.map((todos, id) => (
          <li
            key={id}
            className="d-flex flex-nowrap justify-content-between list-item"
          >
            {todos.label}
            <span>
              <i
                className="fas fa-trash-alt"
                onClick={() => {
                  deleteOneToDo(id);
                }}
              ></i>
            </span>
          </li>
        ))}
      </ul>
      <div>You have {toDos.length} remaining tasks</div>
      <div
        className="d-grid gap-2 col-6 p-5 mx-auto"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {showAlert && (
          <div className="alert alert-danger fw-bold mt-2">
            Clicking will delete all tasks. Are you completely sure?
          </div>
        )}
        <button
          type="button"
          className="btn btn-danger btn-lg fw-bold"
          onClick={deleteAllToDos}
        >
          Delete all tasks
        </button>

      </div>
    </div>
  );
};

export default Home;













