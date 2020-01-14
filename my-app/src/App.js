import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SimpleCard from "./components/SimpleCard";
import Axios from "axios";

function App() {
  const [users, setUsers] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    Axios.get("http://localhost:8000/api/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log({ err }));
  }, [toggle]);

  return (
    <div className="App">
      <header className="App-header">
        {users.map(user => {
          return <SimpleCard user={user} />;
        })}
      </header>
    </div>
  );
}

export default App;
