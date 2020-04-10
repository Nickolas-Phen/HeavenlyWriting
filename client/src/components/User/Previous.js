import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "./AxiosConfig";
import List from "@material-ui/core/List";
import DisplayInfo from "./DisplayInfo";
import Song from "./MocArticle";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function Previous() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [previousMap, setPreviousMap] = useState([{quote: "Test", picture: "h",article: Song}, {quote: "Test", picture: "a",article: Song}]);

  const GetTodayInfo =() => 
    axios.get('/todayinfo')
    .then(response => {
      setPreviousMap(response.data);
      setLoading(false);
    })
    .catch(err => console.log(err));

  useEffect(() => {
    GetTodayInfo();
  }, []);


  if (isLoading) {
    return (
      <div className={classes.paper}>
        <Typography paragraph>LOADING...</Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.paper}>
        <Typography paragraph>
          All the previous info:
        </Typography>
        <List>
          {previousMap.map((previous, index) => 
            <DisplayInfo
              date={previous.date}
              quote={previous.quote}
              picture={previous.picture}
              article={previous.article}
            />
          )}
        </List>
      </div>
    );
  }
}
