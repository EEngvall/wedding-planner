import logo from "./logo.svg";
import "./App.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { listUsers } from "./graphql/queries";
import { createUser } from "./graphql/mutations";
import { useEffect, useState } from "react";
import "./styles/user-registration.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState(initialState);
  const [newUser, setNewUser] = useState("");

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchUsers() {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      const users = userData.data.listUsers.items;
      setUsers(users);
      console.log(users);
    } catch (err) {
      console.log("error fetching todos: ", err.message);
    }
  }

  async function addUser() {
    try {
      const user = { ...formState };
      setUsers([...users, user]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createUser, { input: user }));
      console.log(users);
      setNewUser(user);
    } catch (err) {
      console.log("error creating User:", err);
    }
  }

  return (
    <div className="App">
      <h2>New User Registration</h2>
      <div class="input-container">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            First Name
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            aria-label="First Name"
            aria-describedby="basic-addon1"
            onChange={(event) => setInput("first_name", event.target.value)}
            value={formState.first_name}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Last Name
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            aria-label="Last Name"
            aria-describedby="basic-addon1"
            onChange={(event) => setInput("last_name", event.target.value)}
            value={formState.last_name}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Username
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(event) => setInput("username", event.target.value)}
            value={formState.username}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            Email Address
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Email Address"
            aria-label="Email Address"
            aria-describedby="basic-addon1"
            onChange={(event) => setInput("email", event.target.value)}
            value={formState.email}
          />
        </div>

        <button type="button" class="btn btn-primary" onClick={addUser}>
          Create User
        </button>
      </div>
      <div>
        <h1>{newUser.username} Created!</h1>
      </div>
    </div>
  );
};

export default App;
