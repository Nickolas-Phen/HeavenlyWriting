import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Song from "./MocArticle";
import getMoonPhase from '../../api/moonLocationController.js'
import axios from "axios";

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
  const [moonPhase, setMoonPhase] = useState("");
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
    configMoon.LDZ=new Date(configMoon.year,configMoon.month-1,1)/1000
    var obj = configMoon;
    var gets=[]
    //add url info to complete url accessed by api
    for (var i in obj){
      gets.push(i+"="+encodeURIComponent(obj[i]))
    }
    //final api url
    var url = "https://www.icalendar37.net/lunar/api/?"+gets.join("&");
    //get moon data from moon api
    var phase = "dog"
    axios.get(url).then(res =>
    {
      var day = new Date().getDate();
      var moon = res.data;//moon dat
      phase = moon.phase[day].phaseName;
      console.log("Phase: " + phase)
      setMoonPhase(phase);
    })
  }
  if (moonPhase == "")
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
        setArticle("You will die in 7 days...");
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
        <h1>Today is a {moonPhase}</h1>
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
