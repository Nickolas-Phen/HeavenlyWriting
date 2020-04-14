import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Predictions(props) {
    var myJSON
    var obj ={sign: JSON.stringify(props.data)};
    console.log("obj is: "+obj.sign);
    const GetPrediction =() => 
    axios.get('/api/reading/'+obj,obj)
    //axios.get('/api/reading/'+find,find) 
    .then(response => {
        console.log("find: " + response.data);
  //    response.data.quote = response.data.quote.toString();
     myJSON = JSON.stringify(response.data);
      console.log("JSON is: "+myJSON); 
    })
    .catch(err => console.log(err));

    useEffect(() => {
        GetPrediction();
      }, []);

    return(
        <div>
            
    <h3>test3</h3>
    <h7>HERE IT IS {myJSON}</h7>
        </div>
    );

}