import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Slider from  "@material-ui/core/Slider";
import Button from  "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    width: 200,
  },
  row: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
}));

const marks = [
  {
    value: 0,
    label: 'Low',
  },
  {
    value: 5,
    label: 'Moderate',
  },
  {
    value: 10,
    label: 'High',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function Feedback() {
  const classes = useStyles();
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sociability, setSociability] = useState(5);

  return (
    <div className={classes.paper}>
            <Typography paragraph>Tell us your feedback. Rate how you feel:</Typography>
      <div className={classes.row}>
        <div className={classes.root}>
          <Typography id="moodSlider" gutterBottom>Mood</Typography>
          <Slider
          defaultValue={5}
          getAriaValueText={valuetext}
          aria-labelledby="moodSlider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={10}
          onChange={(_event, newValue) => {setMood(newValue);}}
          />
        </div>
        <div className={classes.root}>
          <Typography id="stressSlider" gutterBottom>Stress</Typography>
          <Slider
          defaultValue={5}
          getAriaValueText={valuetext}
          aria-labelledby="stressSlider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={10}
          onChange={(event, newValue) => {setStress(newValue);}}
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.root}>
          <Typography id="energySlider" gutterBottom>Energy</Typography>
          <Slider
          defaultValue={5}
          getAriaValueText={valuetext}
          aria-labelledby="energySlider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={10}
          onChange={(event, newValue) => {setEnergy(newValue);}}
          />
        </div>
        <div className={classes.root}>
          <Typography id="sociabilitySlider" gutterBottom>Sociability</Typography>
          <Slider
          defaultValue={5}
          getAriaValueText={valuetext}
          aria-labelledby="sociabilitySlider"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={10}
          onChange={(event, newValue) => {setSociability(newValue);}}
          />
        </div>
      </div>
      <Button 
      variant="contained"
      color="primary" 
      onClick={() => console.log([mood, stress, energy, sociability])}
      >Submit Feedback</Button>
    </div>
  );
}
