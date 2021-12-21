import { useState } from "react";
import "./main.css";

const Main = () => {
  const [name, setName] = useState({
    name: "",
  });
  const [desc, setDesc] = useState({ description: "", completed: false });
  const [arr, setArr] = useState([]);

  const handleName = (event) => {
    setName({ name: event.target.value });
  };
  const handleDescription = (event) => {
    setDesc({ description: event.target.value, completed: false });
  };

  const handleSubmit = (event) => {
    setArr([...arr, { ...name, ...desc }]);
    event.preventDefault();
  };

  const deleteTask = (index) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (index !== i) {
        newArr[newArr.length] = arr[i];
      }
    }
    console.log(newArr);
    setArr(newArr);
  };

  console.log(arr);

  return (
    <div className="container">
      <h1>My Todos</h1>
      <div className="inputEl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name.name}
            placeholder="Name"
            onChange={handleName}
          />
          <input
            type="text"
            value={desc.description}
            onChange={handleDescription}
            placeholder="Description"
          />
          <button>Add Todo</button>
        </form>
      </div>
      <div className="taskList">
        <ul>
          {arr.map((item, i) => {
            return (
              <li key={i}>
                <div>
                  <p className="name">{item.name}</p>
                  <p>{item.description}</p>
                </div>
                <div className="listBtt">
                  <button>Complete</button>
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
