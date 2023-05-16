import React, { useEffect, useState } from "react";


const ToDoList = ({label, done}) => {

    const [data, setData] = useState([]);

    useEffect (() => {
    
        const requestOptions = {
          method: 'GET'
        }
        
        fetch("https://assets.breatheco.de/apis/fake/todos/user/jrealmorillo", requestOptions)
          .then(response => response.json())
          .then(response => {
            console.log(response)
            setData(response)
        })
          .catch(error => console.log('error', error));
          
      }, [])

      return (
        <>
            {data.map((item, index) =>
            <div key={index}>
            <span>{item.label}</span>
            </div>
            )}
            </>
      )
}

export default ToDoList;