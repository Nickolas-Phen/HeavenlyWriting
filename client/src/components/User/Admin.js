import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DropDown from "../widgets/DropDown.js"
import {Signs, Houses, MoonPhases} from "../astronomyInfo";
import TextEditor from "../widgets/TextEditor";
import PredictionTable from "./PredictionTable";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Add from "./AddToDb"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  }
}));

export default function Admin() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  //For testing:{house: "H", sign: "S", moonPhase: "M", quote: "Q", picture: "P", article: "A"}, {house: 'Haa', sign: 'Saa', moonPhase: 'Maa', quote: 'Qaa', picture: 'Paa', article: 'Aaa'}
  const [dbData, setdbData] = useState([]);


  const GetPredictionInfo =() => 
    axios.get('/api/reading') // do edits in axionController.js
    .then(response => {
        console.log(response.data);
      setdbData(response.data);
      setLoading(false);
    })
    .catch(err => console.log(err));

  useEffect(() => {
    GetPredictionInfo();
  }, []);
  
  return (
    <div className={classes.paper}>
      
     
      
      <PredictionTable 
        dbData={dbData}
      />
      <br></br>
      <Add/>
      {/* <Typography paragraph>Select the information corresponding to the interpretation you wish to edit</Typography>
      <Container component="main" maxWidth= "md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <DropDown options = {Signs}></DropDown>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DropDown options = {Houses}></DropDown>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DropDown options = {MoonPhases}></DropDown>
          </Grid>
        </Grid>
        <TextEditor/>
      </Container> */}
    
    </div>
    
  );
}