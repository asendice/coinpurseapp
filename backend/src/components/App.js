import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [logUser, setLogUser] = useState("");
  const [logPass, setLogPass] = useState("");

  const onPress = async () => {
    console.log(email, user, pass, confirmPass);
    const json = JSON.stringify({
      email: email,
      name: user,
      password: pass,
      password_confirmation: confirmPass,
    });
    console.log(json);
    await axios
      .post("http://localhost:8000/api/signup", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const onLogPress = async () => {
    console.log(logUser, logPass);
    const json = JSON.stringify({
      email: logUser,
      password: logPass,
    });
    await axios
      .post("http://localhost:8000/api/signin", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div>
      <div></div>
      Are we Logged in YES or NO?
      <Login
        logPass={logPass}
        logUser={logUser}
        setLogPass={setLogPass}
        setLogUser={setLogUser}
        onLogPress={onLogPress}
      />
      <Register
        setEmail={setEmail}
        setUser={setUser}
        setPass={setPass}
        setConfirmPass={setConfirmPass}
        email={email}
        user={user}
        pass={pass}
        confirmPass={confirmPass}
        onPress={onPress}
      />
    </div>
  );
};

export default App;
