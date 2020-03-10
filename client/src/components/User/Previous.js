import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import Song from "./MocArticle";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const mockGetIdPrevious = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([1, 1, 1]);
    }, 500);
  });

const mockGetEachPrevious = (id) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({id: 1, quote: "Rick Astley - Never Gonna Give You Up", article: Song});
    }, 500);
  });

const printInfo = (id, loadedInfo) => {
  if(id === loadedInfo.id){

  }
};


export default function Previous() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [previousMap, setPreviousMap] = useState([]);
  const [dayInfo, setDayInfo] = useState({});

  useEffect(() => {
    let loadCounter = 0;
    const increaseCounter = () => {
      loadCounter += 1;
      if (loadCounter >= 2) {
        setLoading(false);
      }
    };

    mockGetIdPrevious()
      .then((idMap) => {
        increaseCounter();
        setPreviousMap(idMap);
      })
      .catch(() =>
      {
        increaseCounter();
        setPreviousMap([]);
      });

    mockGetEachPrevious()
      .then( info => {
        increaseCounter();
        setDayInfo(info);
      })
      .catch(() =>{
        increaseCounter();
        setDayInfo({});
      });

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
        {/* <List>
          {previousMap.map((id, index) => {
            return<span>{dayInfo}<br /></span>;
          })}
        </List> */}
      </div>
    );
  }
}
