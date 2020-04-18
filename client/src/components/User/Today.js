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
  const [test, setTest] = useState('');
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
  const [prediction, setPrediction] = useState(
        {
            sign: "",
            house: "",
            moonPhase: "",
            quote: "",
            pic: "",
            article: "",
        }
    );
  const getAllAstrologyData = () => {
      /*
      It would be much cleaner to separate getting the different astrology data as different functions,
        but I can only get it to work if I have them all in one ugly function
        creates url to send to api to get moon data
       */

//FIND MOON PHASE_______________________________________________________
      var configMoon = {
          lang: 'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
          month: new Date().getMonth() + 1, // 1  - 12
          year: new Date().getFullYear(),
          size: 50, //pixels
          lightColor: "#FFFF88", //CSS color
          shadeColor: "#111111", //CSS color
          sizeQuarter: 20, //pixels
          texturize: false //true - false
      };

      configMoon.LDZ = new Date(configMoon.year, configMoon.month - 1, 1) / 1000;
      var obj = configMoon;
      var gets = [];
      //add url info to complete url accessed by api
      for (var i in obj) {
          gets.push(i + "=" + encodeURIComponent(obj[i]))
      }
      //final api url
      var url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&");
      //get moon data from moon api
      var phase = "dog";
      axios.get(url).then(res => {
          var day = new Date().getDate();
          var moon = res.data;//moon dat
          phase = moon.phase[day].phaseName;
          setMoonPhase(phase);
//END FIND MOON PHASE________________________________________

//FIND MOON SIGN, MOON HOUSE, USER ASCENDANT SIGN, USER SIGN SIGN_____________________________________________
          axios.get('/api/swiss/',
              {
                  params: {
                      placeOfBirth: httpUser.getCurrentUser().placeOfBirth,
                      birthday: httpUser.getCurrentUser().birthday,
                      birthTime: httpUser.getCurrentUser().birthTime,
                  }
              }).then(response =>
          {
              setAstrologyData(response.data);
//END FIND MOON SIGN, MOON HOUSE, USER ASCENDANT SIGN, USER SIGN SIGN_____________________________________________

//FIND PREDICTION THAT MATCHES FOUND MOON SIGN, MOON HOUSE, MOON PHASE_____________________________________
              axios.get('/api/reading/prediction',
                  {
                      params: {
                          sign: response.data.currentMoonSign,
                          house: response.data.currentMoonHouse,
                          moonPhase: phase,
                      }
                  })
                  .then(response => {
                      setPrediction(response.data);
                  })
                  .catch(err => console.log(err));
          })
      });
//FOUND ALL ASTROLOGY DATA
  };

  useEffect(() => {
      /*
      this function finds the current moonPhase, moonHouse, moonSign,
       then finds the prediction that matches this combination.
       This information is stored in the states called moonPhase, astrologyData, and prediction
       */
      getAllAstrologyData();
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

useEffect(() => {
}, []);

  if (isLoading) {
    return (
      <div className={classes.paper}>
        <Typography paragraph>LOADING...</Typography>
      </div>
    );
  } else {
    return (
      <div>
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
          <div>{!prediction[0] ? <h2>No prediction found</h2> :
              <div>
                  <h3>{prediction[0].quote}</h3>
                  <h3>{prediction[0].article}</h3>
              </div>
    }
             </div>
          </div>
      </div>
    );
  }

}
