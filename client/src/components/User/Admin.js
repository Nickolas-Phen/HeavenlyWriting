import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {HousesLabels, SignsLabels, MoonPhasesLabels} from "../astronomyInfo";
import TextEditor from "../widgets/TextEditor";
import PredictionTable from "./PredictionTable";
import Select from "react-select";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Add from "./AddToDb"
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

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
  const [searchedSign, setSearchedSign] = useState('');
  const [searchedHouse, setSearchedHouse] = useState('');
  const [searchedPhase, setSearchedPhase] = useState('');
  const [returnedQuote, setReturnedQuote] = useState('');
  const [returnedArticle, setReturnedArticle] = useState('');
  const [searching, setSearching] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [unfilteredData, setUnfilteredData] = useState([]);
  const GetPredictionInfo =() => {
      axios.get('/api/reading')
          .then(response => {
              setUnfilteredData(response.data);
                  //sort through dbData and only grab items that match filter
              const filtered = filterPredictions(response.data);
              setdbData(filtered);
              setLoading(false);
          })
          .catch(err => console.log(err));
  };

  const filterPredictions = (data) => {
      let filteredData = [];
      console.log("searched sign: ", searchedSign);
      for (const i in data)
      {
          if ((data[i].sign === searchedSign || searchedSign === '')
              && (data[i].house === searchedHouse || searchedHouse === '')
              && (data[i].moonPhase === searchedPhase || searchedPhase === ''))
          {
              console.log("pushing");
              filteredData.push(data[i]);
          }
      }
      return filteredData;
  };

  const updateSign = (selectedSign) =>
  {
      if (selectedSign.label === "None")
          setSearchedSign(selectedSign.value);
      else
        setSearchedSign(selectedSign.label);
      setSearching(true);

  };

  const updateHouse = (selectedHouse) =>
  {
    setSearchedHouse(selectedHouse.value);
      setSearching(true);
  };

  const updatePhase = (selectedPhase) =>
  {
      if (selectedPhase.label === "None")
          setSearchedPhase(selectedPhase.value);
      else
          setSearchedPhase(selectedPhase.label);
        setSearching(true);
  };

  const articleChanged = (text) =>
  {
      setReturnedArticle(text.target.value);
  };

  const quoteChanged = (text) =>
  {
      setReturnedQuote(text.target.value);
  };

  const updatePrediction = () =>
  {
      const newPrediction =
          {
              house: searchedHouse,
              sign: searchedSign,
              moonPhase: searchedPhase,
              article: returnedArticle,
              picture: '',
              quote: returnedQuote,
          };
      axios.put('/api/reading/prediction', newPrediction, {headers: {'Content-Type': 'application/json'}});
      window.alert("Information Updated");
  };

  const searchForPrediction = () =>
  {
      axios.get('/api/reading/prediction',
          {
              params: {
                  sign: searchedSign,
                  house: searchedHouse,
                  moonPhase: searchedPhase,
              }
          })
          .then(response => {
              if (response.data[0])
              {
                  console.log(response.data[0].article);
                  setReturnedArticle(response.data[0].article);
                  setReturnedQuote(response.data[0].quote);
              }
              else
              {
                  setReturnedArticle("No article found for this interpretation. Pressing the update button will add it.");
                  setReturnedQuote("No quote found for this interpretation. Pressing the update button will add it.");
              }
          })
          .catch(err => console.log(err));
  };

  const deletePrediction = () =>
  {
      const confirmation = window.confirm("Delete this interpretation?");
      if (confirmation) {
          const deletedPrediction =
              {
                  house: searchedHouse,
                  sign: searchedSign,
                  moonPhase: searchedPhase,
              };
          console.log(deletedPrediction);
          axios.delete('/api/reading/prediction', {
              params: {
                  sign: searchedSign,
                  house: searchedHouse,
                  moonPhase: searchedPhase,
              }
          });
      }
  };


    if (searching)
    {
        setdbData(filterPredictions(unfilteredData));
        if (searchedPhase && searchedHouse && searchedSign)
        {
            searchForPrediction();
            console.log("searching...");
        }
        setSearching(false);
    }

    if (searchedPhase && searchedHouse && searchedSign && deleteButtonDisabled)
    {
        setDeleteButtonDisabled(false);
    }

  useEffect(() => {
    GetPredictionInfo();
  }, []);
  
  return (
    <div className={classes.paper}>
      
     
      
      <PredictionTable
        dbData={dbData}
        signFilter = {searchedSign}
        houseFilter = {searchedHouse}
        moonPhaseFilter = {searchedPhase}
      />
      <br></br>
      <Typography paragraph>Select the information corresponding to the interpretation you wish to update, add, or delete</Typography>
      <Container component="main" maxWidth= "md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Select options = {SignsLabels} onChange = {updateSign}></Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select options = {HousesLabels} onChange = {updateHouse}></Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select options = {MoonPhasesLabels} onChange = {updatePhase}></Select>
          </Grid>
            <Grid item xs ={6} sm ={3}>
                <Button onClick = {deletePrediction} disabled = {deleteButtonDisabled} color="secondary" variant="contained">Delete</Button>
            </Grid>
        </Grid>
      </Container>
        <h3>Quote</h3>
        <TextareaAutosize value ={returnedQuote} onChange = {quoteChanged} aria-label="empty textarea" width="auto" placeholder = "Quote"/>
        <h3>Article Text</h3>
        <TextareaAutosize value ={returnedArticle} onChange = {articleChanged} aria-label="empty textarea" rowsMin={10} width="auto" placeholder = "Interpretation information"/>
        <Button color = "primary" variant="contained" onClick = {updatePrediction}>Update</Button>
    </div>
    
  );
}