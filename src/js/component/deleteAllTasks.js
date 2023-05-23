import React from "react";

const DeleteAllTasks = ({handleMouseLeave, handleMouseOver, deleteAllToDos, showAlert}) => {

    return (

        <div
            className="d-grid gap-2 col-6 p-5 mx-auto"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <button
                type="button"
                className="btn btn-danger btn-lg fw-bold"
                onClick={deleteAllToDos}
            >
                Delete all tasks
            </button>
            {showAlert && (
                <div className="alert alert-danger fw-bold mt-2">
                    Make sure you finish all tasks before clicking, you cheeky slacker!
                </div>
            )}
        </div>
    )
}

export default DeleteAllTasks