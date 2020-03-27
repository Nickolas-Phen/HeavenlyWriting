import swisseph from 'swisseph'

swisseph.swe_set_ephe_path('./server/Ephe');
//input the users birtday and time
const date = {year: 1990, month: 3, day: 27, hour: 20, min: 30};
//converts the dates into julian calender date
const julday = swisseph.swe_julday (date.year, date.month, date.day, date.hour,date.min, swisseph.SE_GREG_CAL);
//sets flag as dates from gregorian calender
const flag = swisseph.SEFLG_SPEED;

let sunPos=0, moonPos=0, zodiac="";

//calculates the sun and moon positions
swisseph.swe_julday (date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
	//assert.equal (julday_ut, 2455927.5);
	console.log ('Julian UT day for date:', julday_ut);

	// Sun position
	swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
		//assert (!body.error, body.error);
		console.log ('Sun position:', body.longitude, body.latitude);
		sunPos=body.longitude;
	});

	// Moon position
	swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
		//assert (!body.error, body.error);
		console.log ('Moon position:', body.longitude, body.latitude);
		moonPos=body.longitude;
	});
});


//MC is midheaven
//geographical location of birth place
var lat=29.6436;
var long=-82.3549;
//used to find the signs and stuff
var h=swisseph.swe_houses(julday,lat,long,'W',function(result){
	console.log(result);
});



//console.log(sunPos, moonPos);
/*
if(date.month==  0)
    {
        if(date.day<=  19)
        {zodiac   = "Capricorn";}

        else
        {
            zodiac   = "Aquarius";
        }
    }
    else if (date.month== 1)
    {
        if(date.day<= 18)
            {zodiac  =   "Aquarius";}
        else
            {zodiac  =  "Pisces";}
    }
    else if (date.month== 2)
    {
        if(date.day<= 20)
            {zodiac  =   "Pisces";}
        else
            {zodiac  =  "Aries";}
    }
    else if (date.month== 3)
    {
        if(date.day<= 19)
            {zodiac  =   "Aries";}
        else
            {zodiac  =  "Taurus";}
    }
    else if (date.month== 4)
    {
        if(date.day<= 20)
            {zodiac  =   "Taurus";}
        else
            {zodiac  =  "Gemini";}
    }
    else if (date.month== 5)
    {
        if(date.day<= 20)
            {zodiac  =   "Gemini";}
        else
            {zodiac  =  "Cancer";}
    }
    else if (date.month == 6)
    {
        if(date.day<= 22)
            {zodiac  =   "Cancer";}
        else
            {zodiac  =  "Leo";}
    }
    else if (date.month   == 7)
    {
        if(date.day<= 22)
            {zodiac  =   "Leo";}
        else
            {zodiac  =  "Virgo";}
    }
    else if (date.month   == 8)
    {
        if(date.day<= 22)
            {zodiac  =   "Virgo";}
        else
            {zodiac  =  "Libra";}
    }
    else if (date.month  == 9)
    {
        if(date.day<= 22)
            {zodiac  =   "Libra";}
        else
            {zodiac  =  "Scorpio";}
    }
    else if (date.month == 10)
    {
        if(date.day<= 21)
            {zodiac  =   "Scorpio";}
        else
            {zodiac  =  "Sagittarius";}
    }
    else if (date.month == 11)
    {
        if(date.day<= 21)
            {zodiac  =   "Sagittarius";}
        else
            {zodiac  =  "Capricorn";}
    }*/