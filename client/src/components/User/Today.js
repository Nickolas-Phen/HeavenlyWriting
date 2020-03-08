import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Song from "./MocArticle";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  quote: {
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  },
  quoteText: {
    fontSize: 32,
    fontStyle: "italic",
    wordWrap: "normal",
    minWidth: 250,
  },
  article: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5)
  },
  image: {
    width: "25%",
    minWidth: 250,
  }
}));

const mockGetQuote = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve("Rick Astley - Never Gonna Give You Up");
    }, 500);
  });

const mockGetArticle = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(Song);
    }, 500);
  });

export default function Today() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  // find something for picture.
  const [article, setArticle] = useState("");
  // getData will load data from the backend only on load.

  useEffect(() => {
    let loadCounter = 0;
    const increaseCounter = () => {
      loadCounter += 1;
      if (loadCounter >= 2) {
        setLoading(false);
      }
    };

    mockGetQuote()
      .then(newQuote => {
        increaseCounter();
        setQuote(newQuote);
      })
      .catch(() => {
        increaseCounter();
        setQuote("Quote '404' not found");
      });

    mockGetArticle()
      .then(newArticle => {
        increaseCounter();
        setArticle(newArticle);
      })
      .catch(() => {
        increaseCounter();
        setArticle("Nothing to do today");
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
        <div className={classes.quote}>
          <img 
            className={classes.image}
            src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            alt="Rick"
          />
          <span className={classes.quoteText}>{quote}</span>
        </div>
        <Typography className={classes.article} paragraph >{ article.split('\n').map((i => {
          return <span>{i}<br /></span>;
        })) }</Typography>
      </div>
    );
  }
}
