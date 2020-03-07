import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function Admin() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography paragraph>UNLIMITED POWER.</Typography>
    </div>
  );
}