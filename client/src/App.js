import React from 'react';
import SignUp from "./components/SignUp";
import User from "./components/User/User";
import { Switch, Route, useHistory } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/">
        <User />
      </Route>
    </Switch>
  );
};

export default App;
