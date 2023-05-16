import { useState, useEffect } from "react";
import React from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [showTrashIcon, setShowTrashIcon] = useState(-1);
  const [allDeleted, setAllDeleted] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [inputToDos, setInputToDos] = useState([]); // Estado para las tareas ingresadas por el input
  const [apiToDos, setApiToDos] = useState([]); // Estado para las tareas obtenidas desde la API

  const handleChange = (event) => setInputValue(event.target.value);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setInputToDos((toDos) => [...toDos, inputValue]);
      setInputValue("");
      setAllDeleted(false);
    }
  };

  const handleDeleteToDo = (index) => {
    if (index < inputToDos.length) {
      setInputToDos((toDos) => toDos.filter((_, i) => i !== index));
    } else {
      const apiIndex = index - inputToDos.length;
      setApiToDos((toDos) => toDos.filter((_, i) => i !== apiIndex));
    }
    if (inputToDos.length + apiToDos.length === 1) {
      setAllDeleted(true);
    }
  };

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jrealmorillo")
      .then((response) => response.json())
      .then((response) => setApiToDos(response))
      .catch((error) => console.log("Error:", error));
  }, []);

  return (
    <div className="container col-4 text-center align-items-center">
      <h1 className="tracking-in-expand-forward-top">My ToDo List</h1>
      <h6 className="tracking-in-expand-forward-top">(using Fetch...bloody hell!)</h6>
      <ul className="align-items-center">
        <li className="align-items-center shake-horizontal">
          <input
            type="text"
            onChange={handleChange}
            value={inputValue}
            placeholder="Add some task"
            onKeyDown={handleKeyDown}
          />
        </li>
        {inputToDos.map((item, index) => (
          <li
            key={index}
            className="d-flex flex-nowrap justify-content-center list-item"
            onMouseEnter={() => setShowTrashIcon(index)}
            onMouseLeave={() => setShowTrashIcon(-1)}
          >
            <span>{item}</span>
            <span>
              {showTrashIcon === index && (
                <i
                  className="fa fa-trash"
                  onClick={() => handleDeleteToDo(index)}
                />
              )}
            </span>
          </li>
        ))}
        {apiToDos.map((item, index) => (
          <li
            key={index + inputToDos.length}
            className="d-flex flex-nowrap justify-content-center list-item"
            onMouseEnter={() => setShowTrashIcon(index + inputToDos.length)}
            onMouseLeave={() => setShowTrashIcon(-1)}
          >
            <span>{item.label}</span>
            <span>
              {showTrashIcon === index + inputToDos.length && (
                <i
                  className="fa fa-trash"
                  onClick={() => handleDeleteToDo(index + inputToDos.length)}
                />
              )}
            </span>
            </li>
        ))}
      </ul>
      <div className="text-center tracking-in-expand-forward-bottom">
         {inputToDos.length + apiToDos.length > 0 && (
           <div>You have {inputToDos.length + apiToDos.length} remaining tasks</div>
         )}
         {allDeleted && <div>Congratulations! Now go play videogames you naugthy boy!</div>}
         {!allDeleted && inputToDos.length + apiToDos.length === 0 && (
           <div className="d-flex flex-nowrap justify-content-center">There is currently nothing left to do</div>
         )}
       </div>
    </div>
  );
};

export default Home;










