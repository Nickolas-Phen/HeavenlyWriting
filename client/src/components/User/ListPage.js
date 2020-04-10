import httpUser from "../../httpUser";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
// {httpUser.getCurrentUser().username}
export default function ListPage() {
  const [tab, setTab] = React.useState("Today");
  const history = useHistory();
  const changeTab = tab => {
    setTab(tab);
    history.push(tab.toLowerCase());
  };
    if(httpUser.getCurrentUser().username === "admin321"){
        return(<List>
            {["Today", "Previous", "Feedback", "Admin","Log out"].map(text => (
              <ListItem button key={text} onClick={() => changeTab(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>);
    }else{
        return(
        <List>
            {["Today", "Previous", "Feedback", "Log out"].map(text => (
              <ListItem button key={text} onClick={() => changeTab(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>);
    }
}