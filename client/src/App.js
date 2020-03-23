import React, {useState} from 'react';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User/User";
import Home from "./components/HomePage";
import { Switch, Route, useHistory } from "react-router-dom";
import httpUser from './httpUser'

import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());

    const onLoginSuccess = () => {
        setCurrentUser(httpUser.getCurrentUser());
    };

    const logOut = () => {
        httpUser.logOut();
        setCurrentUser(null);
        console.log("logging out");
    };
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/signup">
        <SignUp onSignUpSuccess={onLoginSuccess}/>
      </Route>
    <Route path="/signin">
        <SignIn onLoginSuccess={onLoginSuccess}/>
    </Route>
      <Route path="/">
        <User onLogOut = {logOut}/>
      </Route>
    </Switch>
  );
};

export default App;
