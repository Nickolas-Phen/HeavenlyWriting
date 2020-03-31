import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

export default function DisplayInfo(props) {
  const {quote, article, picture, date} = props;
  const classes = useStyles();
  
  return (
    <Paper className={classes.paper}>
      <div className={classes.quote}>
        <img 
          className={classes.image}
          src={picture}
          alt="Today"
        />
        <span className={classes.quoteText}>{quote}</span>
      </div>
      <Typography className={classes.article} paragraph >{ article.split('\n').map((i => {
        return <span>{i}<br /></span>;
      })) }</Typography>
    </Paper>
  );
}