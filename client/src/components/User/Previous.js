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

// const mockGetIdPrevious = () =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve([1, 1, 1]);
//     }, 500);
//   });

// const mockGetEachPrevious = (id) =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve({id: 1, quote: "Rick Astley - Never Gonna Give You Up", article: Song});
//     }, 500);
//   });

// const printInfo = (id, loadedInfo) => {
//   if(id === loadedInfo.id){

//   }
// };


export default function Previous() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  //{quote: "Test", picture: "a",article: Song}, {quote: "Test", picture: "a",article: Song}
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
