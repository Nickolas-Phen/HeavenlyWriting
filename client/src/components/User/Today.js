import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Song from "./MocArticle";
//import getMoonPhase from '../../api/getMoonData.js'
import axios from "axios";
import './today.css';
import httpUser from "../../httpUser";
import pic from "../../assets/galaxy.jpg";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    minWidth: "100%",
  },
  table: {
    marginLeft: "35%",
    border: "ridge",
    minWidth: 250,
    display: "flex",
    maxWidth: "30%",
    align: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
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

  function createData(field, textvalue) {
    return { field, textvalue };
  }

export default function Today() {
  var data;
   const classes = useStyles();
  const [test, setTest] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [quote, setQuote] = useState("");
  // find something for picture.

  const [color, setColor] = useState("");
  const [article, setArticle] = useState("");
  const [astrologyData, setAstrologyData] = useState(
      {
        currentMoonSign: "",
        sunBirthSign: "",
        ascendantSign: "",
        currentMoonHouse: "",
        currentMoonPhase: "",
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

//FIND MOON SIGN, MOON PHASE, MOON HOUSE, USER ASCENDANT SIGN, USER SIGN SIGN_____________________________________________
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
              //data =  response.data.ascendantSign ;
              data =  response.data.sunBirthSign;
                            getColor();
//END FIND MOON SIGN, MOON HOUSE, USER ASCENDANT SIGN, USER SIGN SIGN_____________________________________________

//FIND PREDICTION THAT MATCHES FOUND MOON SIGN, MOON HOUSE, MOON PHASE_____________________________________
              axios.get('/api/reading/prediction',
                  {
                      params: {
                          sign: response.data.currentMoonSign,
                          house: response.data.currentMoonHouse,
                          moonPhase: response.data.currentMoonPhase,
                      }
                  })
                  .then(response => {
                      setPrediction(response.data);

                  })
                  .catch(err => console.log(err));
          });
//FOUND ALL ASTROLOGY DATA
  };
  const getColor = () => {

    if(data === "Leo" || data === "Aries" || data ==="Sagittarius"){
      setColor("#F39C54"); //red
      //setTest("https://piedfeed.com/wp-content/uploads/2017/08/zodiac_signs___fire_signs_by_lightnigwolf-d8y29g2.jpg");
      if(data === "Leo"){
        //https://itsblossom.com/wp-content/uploads/2019/07/leoseason.gif
        setTest("https://media.giphy.com/media/Q8ZruFpT4VGVe2qFbE/giphy.gif");
      }else if(data === "Aries"){
        setTest("https://media.giphy.com/media/RMePWGZwvngc6ebdCw/giphy.gif");
      }else if (data === "Sagittarius"){
        setTest("https://media.giphy.com/media/H7fYQ9eS9uGjKwurBd/giphy.gif");
      }
    }else if(data === "Taurus" || data === "Virgo" || data === "Capricorn"){
      setColor("#88DE74");//green
      //setTest("https://www.liveabout.com/thmb/2z2oYJdaMFDSAzh6PC6MGLCcS-c=/1333x1000/smart/filters:no_upscale()/earth-element-capricorn-taurus-virgo-206726-5427982d15bd41688905453a1b40a37e.png");
      if(data === "Taurus"){
        setTest("https://media1.giphy.com/media/lSz3J36JVDG4bTWMME/giphy.gif?cid=ecf05e4725493e578870881e5a2831b38769f9e94d768293&rid=giphy.gif");
        }else if(data === "Virgo"){
          setTest("https://media.giphy.com/media/cn3dcc98ZOhjZPGQSC/giphy.gif");
        }else if (data === "Capricorn"){
          setTest("https://media.giphy.com/media/dutzEo8JsuwbMrahJH/giphy.gif");
        }
    }else if (data === "Gemini" || data === "Libra" || data === "Aquarius"){
      setColor("#F7F087");//goldish
      if(data === "Gemini"){
        setTest("https://media.giphy.com/media/ViOMR3f1z9mq3MELJm/giphy.gif");
      }else if(data === "Libra"){
        setTest("https://media.giphy.com/media/VgNctFELbNwdTNMWRs/giphy.gif");
      }else if (data === "Aquarius"){
        setTest("https://media.giphy.com/media/kEbn3fvRtNtZUkjfYA/giphy.gif");
      }
    }else if (data === "Cancer" || data === "Scorpio" || data === "Pisces"){
      setColor("#87CFF7");//blue
      if(data === "Cancer"){
        setTest("https://media.giphy.com/media/dZpd8u44q3mDIe8VO9/giphy.gif");
      }else if(data === "Scorpio"){
        setTest("https://media.giphy.com/media/VgGrCd14gy8NSBX2mC/giphy.gif");
      }else if (data === "Pisces"){
        setTest("https://media.giphy.com/media/YPPGJVeZOrBaIEiSYu/giphy.gif");
      }
    }
  }

  useEffect(() => {
    
    

      /*
      this function finds the current moonPhase, moonHouse, moonSign,
       then finds the prediction that matches this combination.
       This information is stored in the states called astrologyData and prediction
       */
      getAllAstrologyData();
      //getColor();
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

  const rows = [
    createData('Date of Birth', httpUser.getCurrentUser().birthday.substring(0,10)),
    createData('Moon Sign', astrologyData.currentMoonSign),
    createData('Moon House', astrologyData.currentMoonHouse),
    createData('Sun Birth Sign', astrologyData.sunBirthSign),
    createData('Your Ascendant Sign', astrologyData.ascendantSign),
  ];
  if (isLoading) {
    return (
      <div className={classes.paper}>
        <Typography paragraph>LOADING...</Typography>
      </div>
    );
  } else {
    return (
      <div >
      <div className="pic2">
      </div>
      <div className="bgColor" style={{backgroundColor: color}}>
        <h1>Welcome {httpUser.getCurrentUser().firstName} {httpUser.getCurrentUser().lastName}!</h1>
        <div>
          {!prediction[0] ? <h2>No prediction found</h2> :
               <div >
                   <h3>{prediction[0].quote}</h3>
                   <h3>{prediction[0].article}</h3>
               </div>
     }
              </div>
      <TableContainer style={{backgroundColor: color}} component={Paper}>
        
      <Table className={classes.table} aria-label="Info Table">
        <TableHead>
        <img
             className={classes.image}
              src={test}
              alt="Rick"
            />
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell component="th" scope="row">
                {row.field}
              </TableCell>
              <TableCell align="right">{row.textvalue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
      </div>
    //   <div >
    //     <div className={classes.quote} >
    //     <h1>Welcome {httpUser.getCurrentUser().firstName} {httpUser.getCurrentUser().lastName}!</h1>
    //     </div>
    //     <div style={{backgroundColor: color}}>
    //         <img
    //          className={classes.image}
    //          src="https://www.farmersalmanac.com/wp-content/uploads/2015/02/moon-phases2.jpg"
    //          alt="Rick"
    //        />
    //        <h2 class="text">Today's Moon is a {astrologyData.currentMoonPhase}.</h2>
    //       </div>
          
    //        <div class="margin">
    //     <h2 style={{backgroundColor: {color}}}>According to your date of birth you have entered {httpUser.getCurrentUser().birthday.substring(0,10)} :</h2>
    //     <br></br>
    //          <h2> Moon sign: {astrologyData.currentMoonSign}</h2>
    //        <h2> Moon house: House {astrologyData.currentMoonHouse}</h2>
    //        <h2> Sun birth sign: {astrologyData.sunBirthSign}</h2>
    //        <h2>Your ascendant sign: {astrologyData.ascendantSign}</h2>
    //       <div>{!prediction[0] ? <h2>No prediction found</h2> :
    //           <div >
    //               <h3>{prediction[0].quote}</h3>
    //               <h3>{prediction[0].article}</h3>
    //           </div>
    // }
    //          </div>
    //       </div>
    //   </div>
    );
  }

}
