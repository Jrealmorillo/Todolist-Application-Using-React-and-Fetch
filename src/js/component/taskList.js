import React from "react";

const TaskList = ({toDos, deleteOneToDo}) => {

    return (
        <>
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
          </>
    )
}

export default TaskList