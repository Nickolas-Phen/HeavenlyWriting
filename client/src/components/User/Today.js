import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Song from "./MocArticle";
//import getMoonPhase from '../../api/getMoonData.js'
import axios from "axios";
import './today.css'
import httpUser from "../../httpUser";

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
      resolve("Information about your day according to the moon");
    }, 500);
  });

const mockGetArticle = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(Song);
    }, 500);
  });

export default function Today() {
  var data;
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  // find something for picture.
  const [article, setArticle] = useState("");
  const [moonPhase, setMoonPhase] = useState("");
  const [astrologyData, setAstrologyData] = useState(
      {
        currentMoonSign: "",
        sunBirthSign: "",
        ascendantSign: "",
        currentMoonHouse: "",
      }
  );
  // getData will load data from the backend only on load.
  const getMoonPhase = () => {
    //creates url to send to api to get moon data
    var configMoon = {
      lang  		:'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
      month 		:new Date().getMonth() + 1, // 1  - 12
      year  		:new Date().getFullYear(),
      size		:50, //pixels
      lightColor	:"#FFFF88", //CSS color
      shadeColor	:"#111111", //CSS color
      sizeQuarter	:20, //pixels
      texturize	:false //true - false
    };

    //don't know what this does
    configMoon.LDZ=new Date(configMoon.year,configMoon.month-1,1)/1000;
    var obj = configMoon;
    var gets=[];
    //add url info to complete url accessed by api
    for (var i in obj){
      gets.push(i+"="+encodeURIComponent(obj[i]))
    }
    //final api url
    var url = "https://www.icalendar37.net/lunar/api/?"+gets.join("&");
    //get moon data from moon api
    var phase = "dog";
    axios.get(url).then(res =>
    {
      var day = new Date().getDate();
      var moon = res.data;//moon dat
      phase = moon.phase[day].phaseName;
      console.log("Phase: " + phase);
      setMoonPhase(phase);
    });
    axios.get('/api/swiss/',
        {
          params: {
            birthPlace: httpUser.getCurrentUser().birthPlace,
            birthday: httpUser.getCurrentUser().birthday,
            birthTime: httpUser.getCurrentUser().birthTime,
          }
        }).then(res =>
    {
      console.log(res.data);
      setAstrologyData(res.data);
    })
  };
  if (moonPhase === "")
  {
    getMoonPhase();
  }
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

  const GetPrediction =() => 
  axios.get('/api/reading/'+astrologyData.ascendantSign,astrologyData.ascendantSign) 
  .then(response => {
      console.log("find: " + response.data);
  
  })
  .catch(err => console.log(err));

//   function api() {
//     return fetch('http://ohmanda.com/api/horoscope/aquarius')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson.movies;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//  }

  if (isLoading) {
    return (
      <div className={classes.paper}>
        <Typography paragraph>LOADING...</Typography>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={GetPrediction}>temp</button>
        <div className={classes.quote}>
        <h1>Welcome {httpUser.getCurrentUser().firstName} {httpUser.getCurrentUser().lastName}!</h1>
        </div>
        <div>
            <img
             className={classes.image}
             src="https://www.farmersalmanac.com/wp-content/uploads/2015/02/moon-phases2.jpg"
             alt="Rick"
           />
           <h2 class="text">Today's Moon is: {moonPhase}.</h2>
          </div>
          
           <div class="margin">
        <h2 >According to your date of birth you have entered {httpUser.getCurrentUser().birthday.substring(0,10)} :</h2>
        <br></br>
             <h2> Moon sign: {astrologyData.currentMoonSign}</h2>
           <h2> Moon house: House {astrologyData.currentMoonHouse}</h2>
           <h2> Sun birth sign: {astrologyData.sunBirthSign}</h2>
           <h2>Your ascendant sign: {astrologyData.ascendantSign}</h2>
           <h2>Prediction:</h2>
          </div>
          {/* <Typography className={classes.article} paragraph >{ article.split('\n').map((i => {
          return <span>{i}<br /></span>;
        })) }</Typography> */}
      </div>
     
      // <div className={classes.paper}>
      //   <div className={classes.quote}>
      //   <h2>Welcome {httpUser.getCurrentUser().username}!</h2>
      //     <div>

      //     <img
      //       className={classes.image}
      //       src="https://www.farmersalmanac.com/wp-content/uploads/2015/02/moon-phases2.jpg"
      //       alt="Rick"
      //     />
      //     <br></br>
      //     <h2>Today's moon:  {moonPhase}</h2>
      //     <h2>Today's moon sign: {astrologyData.currentMoonSign}</h2>
      //     <h2>Today's moon house: House {astrologyData.currentMoonHouse}</h2>
      //     <h2>Your ascendant sign: {astrologyData.ascendantSign}</h2>
      //     <h2>Welcome {httpUser.getCurrentUser().username}!</h2>
          
          
      //     {/* <span className={classes.quoteText}>{quote}</span> */}
                   

      //       <h2 class="info"><br></br>Today's moon:  {moonPhase}</h2>
      //     </div>

      //   </div>
      //   <div>
      //   <span className={classes.quoteText}>Quote of the day:</span>
      //   </div>
      //   <span className={classes.quoteText}>Future predictions:</span>
      //   {/* <Typography className={classes.article} paragraph >{ article.split('\n').map((i => {
      //     return <span>{i}<br /></span>;
      //   })) }</Typography> */}
      // </div>
    );
  }
}
