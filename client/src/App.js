import React, {useState} from 'react';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import User from "./components/User/User";
import HomePage from "./components/HomePage";
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
      <Route path="/signup">
        <SignUp onSignUpSuccess={onLoginSuccess}/>
      </Route>
      <Route path="/today">
        <User />
        </Route>
       <Route path="/previous">
       <User />
         </Route> 
         <Route path="/feedback">
       <User />
         </Route> 
         <Route path="/admin">
       <User />
         </Route> 
      
    <Route path="/signin">
        <SignIn onLoginSuccess={onLoginSuccess}/>
    </Route>
      <Route path="/">
        <HomePage onLogOut = {logOut}/>
      </Route>
    </Switch>
  );
};

export default App;
{/* <Route path="/feedback">
    <User /> 
    <Route path="/admin">         
    <User />
  </Route> 
  <Route path="/previous">
     <User /> */}
  //    <Switch>
  //    <Route path="/signup">
  //      <SignUp />
  //    </Route>
  //    <Route path="/today">
  //      <User />
  //    </Route>
  //  <Route path="/signin">
  //      <SignIn />
  //  </Route>
  //    <Route path="/">
  //      <HomePage />
  //    </Route>
  //working one
//   <Switch>
//   <Route path="/home">
//     <Home onLogOut = {logOut}/>
//   </Route>
//   <Route path="/signup">
//     <SignUp onSignUpSuccess={onLoginSuccess}/>
//   </Route>
// <Route path="/signin">
//     <SignIn onLoginSuccess={onLoginSuccess}/>
// </Route>
//   <Route path="/">
//     <User/>
//   </Route>
// </Switch>