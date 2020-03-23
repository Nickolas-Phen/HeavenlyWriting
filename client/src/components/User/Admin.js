import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import dropdown from "../widgets/dropdown.js"
import Select from 'react-select'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DropDown from "../DropDown.js"

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
];

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  }
}));

export default function Admin() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Typography paragraph>UNLIMITED POWER.</Typography>
      <Container component="main" maxWidth= "md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <DropDown options = {options}></DropDown>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DropDown options = {options}></DropDown>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DropDown options = {options}></DropDown>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}