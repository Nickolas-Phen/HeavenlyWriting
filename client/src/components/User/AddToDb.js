import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function AddToDb() {
    const [deets, setDeets] = useState(
        {
            house: '',
            sign: '',
            moonPhase: '',
            quote: '',
            picture: '',
            article: '',
        }
    );

    const onChangeText = (e) => {
        //when a user types in info to any box, update userInfo state to match
        const newState = {...deets};
        newState[e.target.name] = e.target.value;
        setDeets(newState);
        console.log(deets.house);
    };

    const UpdateDb =() =>{ /*{console.log("IT IS " + deets);};*/
    
    const params = {
        house: deets.house,
        sign: deets.sign,
        moonPhase: deets.moonPhase,
        quote: deets.quote,
        picture: deets.picture,
        article: deets.article
      }
    //console.log("PL is: " + params);
    axios.post('/api/reading', params) 
    .then(request => {
        window.alert("yay!");
    })
    .catch(err => console.log(err));
    };
return(  <form>
        
    <input id = "house" name = "house" class= "input-field" type="text" placeholder="house" onChange={onChangeText}></input>
    <br></br>
    <input id = "sign" name = "sign" class= "input-field" type="text" placeholder="sign" onChange={onChangeText}></input>
    <br></br>
    <input id = "moonphase" name = "moonPhase" class= "input-field" type="text" placeholder="moonphase" onChange={onChangeText}></input>
    <br></br>
    <input id = "quote" name = "quote" class= "input-field" type="text" placeholder="quote" onChange={onChangeText}></input>
    <br></br>
    <input id = "PIC" name = "picture" class= "input-field" type="text" placeholder="pic" onChange={onChangeText}></input>
    <br></br>
    <input id = "art" name = "article" class= "input-field" type="text" placeholder="article" onChange={onChangeText}></input>
    <br></br>
        <button onClick={UpdateDb}>Update information</button>
        </form>);
}   