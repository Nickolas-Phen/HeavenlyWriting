import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function Feedback() {
  const classes = useStyles();
  const [mood, setMood] = useState(0);
  const [stress, setStress] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [sociability, setSociability] = useState(0);

  return (
    <div className={classes.paper}>
      <Typography paragraph>Tell me where it hurts.</Typography>
    </div>
  );
}
