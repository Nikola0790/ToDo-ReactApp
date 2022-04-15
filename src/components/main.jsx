import { useState, useEffect } from "react";
import "./main.css";

const Main = () => {
  const [name, setName] = useState({ name: "" });
  const [desc, setDesc] = useState({ description: "", completed: false });
  const [arr, setArr] = useState([]); // we use (const arr) in useEffect as dependence for a signal when something changed.
  const [locStorage, setLocStorage] = useState([]);

  // take name from input field
  const handleName = (event) => {
    setName({ name: event.target.value });
  };

  // take description from input field
  const handleDescription = (event) => {
    setDesc({ description: event.target.value, completed: false });
  };

  const addTask = (event) => {
    if (name.name === "") {
      alert("NAME IS REQUIRED");
    } else if (desc.description === "") {
      alert("DESCRIPTION IS REQUIRED");
    } else {
      setArr([...locStorage, { ...name, ...desc }]);
      localStorage.setItem(
        "name",
        JSON.stringify([...locStorage, { ...name, ...desc }])
      );
    }
    setName({ name: "" });
    setDesc({ description: "", completed: false });
    event.preventDefault();
  };

  const deleteTask = (index) => {
    localStorage.removeItem("name");

    let newArr = [];
    for (let i = 0; i < locStorage.length; i++) {
      if (index !== i) {
        newArr[newArr.length] = locStorage[i];
      }
    }
    setLocStorage(newArr);
    setArr(newArr);
  };

  const completedTask = (index) => {
    localStorage.removeItem("name");

    let newArr = [];
    for (let i = 0; i < locStorage.length; i++) {
      if (index !== i) {
        newArr[newArr.length] = locStorage[i];
      } else {
        let completed = true;
        newArr[newArr.length] = { ...locStorage[i], completed };
      }
    }
    setLocStorage(newArr);
    setArr(newArr);
  };

  //////////////////////////////////////

  useEffect(() => {
    if (!!localStorage.getItem("name")) {
      setLocStorage(JSON.parse(localStorage.getItem("name")));
    } else {
      localStorage.setItem("name", JSON.stringify(locStorage));
      setLocStorage(JSON.parse(localStorage.getItem("name")));
    }
  }, [arr]);

  return (
    <div className="container" data-testid="todo-1">
      <h1>My Todos</h1>
      <div className="inputEl">
        <form onSubmit={addTask}>
          <input
            data-testid="name-input"
            type="text"
            value={name.name}
            placeholder="Name"
            onChange={handleName}
            maxLength="50"
          />
          <input
            data-testid="text-input"
            type="text"
            value={desc.description}
            onChange={handleDescription}
            placeholder="Description"
          />
          <button data-testid="submit-button">Add Todo</button>
        </form>
      </div>
      <div className="taskList">
        <ul>
          {locStorage.map((item, i) => {
            return (
              <li
                key={i}
                data-testid="todo"
                className={item.completed ? "completed" : "not_completed"}
              >
                <div className="text">
                  <p className="name">{item.name}</p>
                  <p>{item.description}</p>
                </div>
                <div className="listBtt">
                  <button onClick={() => completedTask(i)}>Complete</button>
                  <button onClick={() => deleteTask(i)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Main;
