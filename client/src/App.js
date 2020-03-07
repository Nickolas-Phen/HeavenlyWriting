import React, {useState} from 'react';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = (props) => {
  //change what page is returned based on pageState
  const [pageState, setPageState] = useState("signup");
  const changePage = (pageName) =>
  {
    setPageState(pageName);
  };
  if (pageState === "signup") {
    return (
        <SignUp updateParent = {changePage}/>
    );
  }
  else if (pageState === "signin")
  {
    return (
        <SignIn updateParent = {changePage}/>
    );
  }
  else if (pageState === "userpage")
  {
    return (
        <user/>
    );
  }
};

export default App;
