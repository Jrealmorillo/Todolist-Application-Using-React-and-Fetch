import React, { useState, useEffect } from "react";
import InputTask from "./inputTask";
import TaskList from "./taskList";
import DeleteAllTasks from "./deleteAllTasks";

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
      const updatedToDos = [...toDos, newTodo];
      setToDos(updatedToDos);
      updateToDos(updatedToDos);
      
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
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
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
    let newToDos = toDos.filter((_, todoIndex) => todoIndex !== index);
    setToDos(newToDos);
    updateToDos(newToDos);
  };

  const deleteAllToDos = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
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
        <InputTask 
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        inputValue={inputValue}/>
        <TaskList 
        toDos={toDos}
        deleteOneToDo={deleteOneToDo}/>
      </ul>
      <div>You have {toDos.length} remaining tasks</div>
      <DeleteAllTasks
      handleMouseLeave={handleMouseLeave}
      handleMouseOver={handleMouseOver}
      deleteAllToDos={deleteAllToDos}
      showAlert={showAlert} />     
    </div>
  );
};

export default Home;













