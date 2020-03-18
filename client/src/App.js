import React, {useState} from 'react';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User/User";
import Home from "./components/HomePage";
import { Switch, Route, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    <Route path="/signin">
        <SignIn />
    </Route>
      <Route path="/">
        <User />
      </Route>
    </Switch>
  );
};

export default App;
