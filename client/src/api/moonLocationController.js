import axios from 'axios';
// import { useState, useEffect } from "react";
// function example_1(moon){
//     var day = new Date().getDate()
//     var dayWeek=moon.phase[day].dayWeek
//     var html="<div class='moon'>"
//     html+="<div>"+moon.nameDay[dayWeek]+"</div>"
//     html+="<div>"+ day + " " + moon.monthName + " "+moon.year+"</div>"
//     html+=moon.phase[day].svg
//     html+="<div>"+moon.phase[day].phaseName + " "+ Math.round(moon.phase[day].lighting)+"%</div>"
//     html+="</div>"
//     document.getElementById("ex1").innerHTML=html
// }
//getMoonLoc
// constructor(props){
//
//     this.state = {
//     moonphase:''
// };
//}

const getMoonData = (obj) => {
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
        var moon = res.data;//moon data
        phase = moon.phase[day].phaseName;
        console.log("First log: " + phase);
        return phase;
        // moon.phase[day].phaseName;
    })
    console.log("Second log: " + phase);
}

export default () => {
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
    //receives url and creates moon json
    //return("dog")
    const obj = configMoon;
    var gets=[]
    //add url info to complete url accessed by api
    for (var i in obj){
        gets.push(i+"="+encodeURIComponent(obj[i]))
    }
    //final api url
    var url = "https://www.icalendar37.net/lunar/api/?"+gets.join("&");
    //get moon data from moon api
    axios.get(url).then(res =>
    {
        var day = new Date().getDate();
        var moon = res.data;//moon data
       // setMoonPhase(moon.phase[day].phaseName);
        var phase = getMoonData(configMoon);
        console.log("From export default: " + phase );
        return phase;
    })
//    console.log("AFTER AXIOS: " + phase);
    // console.log("from export default: " + getMoonData(configMoon));
    // return getMoonData(configMoon);
}

//startMoonLoc();