import React from "react";

const InputTask = ({handleChange, handleKeyDown, inputValue}) => {

  return (
        <li className="align-items-center shake-horizontal">
        <input
          type="text"
          onChange={handleChange}
          value={inputValue}
          placeholder="Add some task"
          onKeyDown={handleKeyDown}
        />
      </li>

    )
}

export default InputTask