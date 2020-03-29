import swisseph from 'swisseph'

swisseph.swe_set_ephe_path('./server/Ephe');
//input the users birtday and time
const date = {year: 2020, month: 3, day: 28, hour: 18, min: 16};
//converts the dates into julian calender date
const julday = swisseph.swe_julday (date.year, date.month, date.day, date.hour,date.min, swisseph.SE_GREG_CAL);
//sets flag as dates from gregorian calender
const flag = swisseph.SEFLG_SPEED;

export const getAstrologyData = () =>
{
	//finds and returns currentMoonSign, sunBirthSign, and ascendant sign
	const exampleBirthday = {year: 2020, month: 3, day: 28, hour: 18, min: 16};
	const currentMoonPos = findCurrentMoonPosition();
	const birthSunPos = findSunPosition(exampleBirthday);
	const currentMoonSign = convertLatitudeToSign(currentMoonPos);
	const sunBirthSign = convertLatitudeToSign(birthSunPos);
	const ascendantSign = findAscendentSign(0,0);
	var astrologyData = {
		currentMoonSign: currentMoonSign,
		sunBirthSign: sunBirthSign,
		ascendantSign: ascendantSign,
		currentMoonHouse: findCurrentMoonHouse(ascendantSign),
	};
	return astrologyData;
};
//calculates the sun and moon positions
export const findCurrentMoonPosition = () =>
{
	const today = new Date();
	var moonPos;
	swisseph.swe_julday (today.getFullYear(), today.getMonth(), today.getDay(), today.getHours(), swisseph.SE_GREG_CAL, function (julday_ut) {
		//assert.equal (julday_ut, 2455927.5);
		console.log ('Julian UT day for date:', julday_ut);

		// Moon position
		swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
			//assert (!body.error, body.error);
			console.log ('Moon position:', body.longitude, body.latitude);
			moonPos=body.longitude;
		});
	});
	return moonPos;
};

export const findSunPosition = (date) =>
{
	//finds position of the sun at the input date
	var sunPos;
	swisseph.swe_julday (date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
		//assert.equal (julday_ut, 2455927.5);
		console.log ('Julian UT day for date:', julday_ut);

		// Sun position
		swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
			//assert (!body.error, body.error);
			console.log ('Sun position:', body.longitude, body.latitude);
			sunPos=body.longitude;
		});
	});
	return sunPos;
};

export const convertLatitudeToSign = (latitude) =>
{
	//converts latitude of moon or sun into a sign
	if (latitude > 0 && latitude < 30)
		return "Aries";
	if (latitude > 30 && latitude < 60)
		return "Taurus";
	if (latitude > 60 && latitude < 90)
		return "Gemini";
	if (latitude > 90 && latitude < 120)
		return "Cancer";
	if (latitude > 120 && latitude < 150)
		return "Leo";
	if (latitude > 150 && latitude < 180)
		return "Virgo";
	if (latitude > 180 && latitude < 210)
		return "Libra";
	if (latitude > 210 && latitude < 240)
		return "Scorpio";
	if (latitude > 240 && latitude < 270)
		return "Sagittarius";
	if (latitude > 270 && latitude < 300)
		return "Capricorn";
	if (latitude > 300 && latitude < 330)
		return "Aquarius";
	if (latitude > 330 && latitude < 360)
		return "Pisces";
};

export const findAscendentSign = (lat, long) =>
{
	//MC is midheaven
//geographical location of birth place
	//TODO: need openCage API to find lat and long for address
	lat=29.6436;
	long=-82.3549;
//used to find the signs and stuff
	var ascendantLat = 0;
	var h=swisseph.swe_houses(julday,lat,long,'W',function(result){
		console.log("result: ");
		console.log(result);
		console.log(result.ascendant);
		ascendantLat = result.ascendant;
	});
	const ascendantSign = convertLatitudeToSign(ascendantLat);
	return ascendantSign;
};
export const convertSignToInteger = (sign) =>
{
	//Aries = 1, Taurus = 2, etc., just maps the sign to an integer to help with ordering
	var signDictionary = {
		"Aries": 1,
		"Taurus": 2,
		"Gemini": 3,
		"Cancer": 4,
		"Leo": 5,
		"Virgo": 6,
		"Libra": 7,
		"Scorpio": 8,
		"Sagittarius": 9,
		"Capricorn": 10,
		"Aquarius": 11,
		"Pisces": 12
	};
	const signInt = signDictionary[sign];
	return signInt;
};

export const findCurrentMoonHouse = (userAscendant) =>
{
	//finds what house the moon is currently in based on its sign and the users Ascendant (page 6 of hightail site)
	const currentMoonSign = convertLatitudeToSign(findCurrentMoonPosition());
	const ascendantInteger = convertSignToInteger(userAscendant) - 1;
	//shift 12 signs left by userAscendant -1, so if ascendant is Aries (1) shift left by 0, Taurus shift left by 1, etc
	var houseDictionary = {
		"Aries": 1 - ascendantInteger,
		"Taurus": 2- ascendantInteger,
		"Gemini": 3- ascendantInteger,
		"Cancer": 4- ascendantInteger,
		"Leo": 5- ascendantInteger,
		"Virgo": 6- ascendantInteger,
		"Libra": 7- ascendantInteger,
		"Scorpio": 8- ascendantInteger,
		"Sagittarius": 9- ascendantInteger,
		"Capricorn": 10- ascendantInteger,
		"Aquarius": 11- ascendantInteger,
		"Pisces": 12- ascendantInteger
	};
	//loop signs that are 0 or less back around
	//example: Ascendant is Gemini. Gemini = 3 normally. Gemini-1 = 2. Aries and Taurus are subtracted by 2.
	//Aries now equals -1, Taurus = 0. Aries needs to equal 11 now and Taurus 12
	//There is no house 0, starts at house 1
	for (var sign in houseDictionary)
	{
		if (houseDictionary[sign] <= 0)
		{
			houseDictionary[sign] = 12 + houseDictionary[sign]
		}
	}
	const currentMoonHouse = houseDictionary[currentMoonSign];
	return currentMoonHouse;
};

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