import swisseph from 'swisseph'
import config from './config/config.js'
import  request  from 'request';

swisseph.swe_set_ephe_path('./server/Ephe');
//input the users birtday and time
let localTime = {year: 2020, month: 3, day: 28, hour: 22, min: 15, sec:0.0};
//converts the dates into julian calender date
//const julday = swisseph.swe_julday (date.year, date.month, date.day, date.hour,date.min, swisseph.SE_GREG_CAL);
//sets flag as dates from gregorian calender
const flag = swisseph.SEFLG_SPEED;



export const getAstrologyData = async(birthday, birthTime, birthPlace) =>
{
	let astrologyData = null;
	//finds and returns currentMoonSign, sunBirthSign, and ascendant sign
	try {
		const formattedBirthday = formatBirthdayFromSignup(birthday);	//splits birthday into array of [year, month, day]
		const formattedBirthTime = splitBirthTime(birthTime);	//splits birthday into array of [hours, minutes]
		const birthdayAndTime = { year: formattedBirthday[0], month: formattedBirthday[1], day: formattedBirthday[2], hour: formattedBirthTime[0], min: formattedBirthTime[1] };
		//console.log("birthday and time: " + birthdayAndTime.year + " " + birthdayAndTime.month + " " + birthdayAndTime.day + " " + birthdayAndTime.hour + " " + birthdayAndTime.min);
		//console.log(birthdayAndTime);
		let url = 'https://dev.virtualearth.net/REST/v1/TimeZone/';
		let coords = await getCoords(birthPlace);//get from coordinateController api implementation
		let formattedCoords=coords.lat+","+coords.lng;
		//console.log(formattedCoords);
		let formattedBdaytime =formatEverything(birthdayAndTime);
		
		url = url + formattedCoords +'?datetime='+formattedBdaytime + '&key=' + config.bingMap.key;
		//console.log(url);
		//console.log("------------------Finding JulDAy");
		const julday = await getJD(birthdayAndTime, url);
		//console.log(julday);
		//console.log("------------------Julday found");
		
		const currentMoonPos = findCurrentMoonPosition();
		const currentSunPos = findCurrentSunPosition();
		const currentMoonPhase = findMoonPhase(currentMoonPos, currentSunPos);
		const birthSunPos = findSunPosition(julday);
		const currentMoonSign = convertLatitudeToSign(currentMoonPos);
		const sunBirthSign = convertLatitudeToSign(birthSunPos);
		const ascendantSign = findAscendentSign(coords.lat,coords.lng,julday);
		astrologyData = {
			currentMoonSign: currentMoonSign,
			sunBirthSign: sunBirthSign,
			ascendantSign: ascendantSign,
			currentMoonHouse: findCurrentMoonHouse(ascendantSign),
			currentMoonPhase: currentMoonPhase
		};
	} catch (err) {
		console.log(err);
	}
	return astrologyData;

};
//calculates the sun and moon positions
export const findCurrentMoonPosition = () =>
{
	const today = new Date();
	var moonPos;
	swisseph.swe_julday (today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), swisseph.SE_GREG_CAL, function (julday_ut) {
		//assert.equal (julday_ut, 2455927.5);
		//console.log ('Julian UT day for date:', julday_ut);

		// Moon position
		swisseph.swe_calc_ut (julday_ut, swisseph.SE_MOON, flag, function (body) {
			//assert (!body.error, body.error);
			//console.log ('Moon position:', body.longitude, body.latitude);
			moonPos=body.longitude;
		});
	});
	return moonPos;
};

export const findCurrentSunPosition = () =>
{
	const today = new Date();
	var sunPos;
	swisseph.swe_julday (today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), swisseph.SE_GREG_CAL, function (julday_ut) {
		//assert.equal (julday_ut, 2455927.5);
		//console.log ('Julian UT day for date:', julday_ut);

		// Sun position
		swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, function (body) {
			//assert (!body.error, body.error);
			//console.log ('Moon position:', body.longitude, body.latitude);
			sunPos=body.longitude;
		});
	});
	return sunPos;
};

export const findMoonPhase = (moonLongitude, sunLongitude) =>
{
	//moon phase = sunlongitude-moonlongitude
	const difference = Math.abs(sunLongitude-moonLongitude);
	if (difference >= 0 && difference < 45)
		return "New Moon";
	if (difference >= 45 && difference < 90)
		return "Crescent Moon";
	if (difference >= 90 && difference < 135)
		return "First Quarter Moon";
	if (difference >= 135 && difference < 180)
		return "Gibbous Moon";
	if (difference >= 180 && difference < 225)
		return "Full Moon";
	if (difference >= 225 && difference < 270)
		return "Disseminating Moon";
	if (difference >= 270 && difference < 315)
		return "Third Quarter Moon";
	if (difference >= 315 && difference < 360)
		return "Balsamic Moon";
};

export const findSunPosition = (julday_ut) =>
{
	//finds position of the sun at the input date
	var sunPos;

	// Sun position
	swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body) {
		//assert (!body.error, body.error);
		//console.log('Sun position:', body.longitude, body.latitude);
		sunPos = body.longitude;
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

export const findAscendentSign = (lat, long, julday) =>
{
	//MC is midheaven
//geographical location of birth place
	//TODO: need openCage API to find lat and long for address

	//console.log("julday: " + julday)
//used to find the signs and stuff
	var ascendantLat = 0;
	var h=swisseph.swe_houses(julday,lat,long,'W',function(result){
		//console.log("result: ");
		//console.log(result);
		//console.log(result.ascendant);
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

export const formatBirthdayFromSignup = (birthday) =>
{
	//console.log("Birthday formatted");
	const year = parseInt(birthday.substring(0, 4));//parseInt converts string to int
	const month = parseInt(birthday.substring(5,7));
	const day = parseInt(birthday.substring(8,10));
	const date = [year, month, day];
	return date;
};

export const splitBirthTime = (birthTime) =>
{
	const hours = parseInt(birthTime.substring(0,2));//add 4 to adjust for time zone TODO: timezone API to make this work for every timezone
	const minutes = parseInt(birthTime.substring(3,5));
	const newBirthTime = [hours, minutes];
	//console.log(newBirthTime[0] + " " + newBirthTime[1])
	return newBirthTime;
};

export const getCoords=async(addy)=>{
	// This code replaces all whitespace and commas with the appropriate url-encoded replacement value.
	const addressTemp = addy.toLowerCase().replace(/\s/g, "%20").replace(/,/g, "%2C");
	//console.log(addressTemp);
	// Setup your options q and key are provided. Feel free to add others to make the JSON response less verbose and easier to read
	var coords;
	// The below code makes a GET request to the specified URL.
	return new Promise((resolve, reject) => {
		request({
			url: 'https://api.opencagedata.com/geocode/v1/json?q='+addressTemp+"&key="+config.openCage.key

		}, async (error, response, body) => {
			if (error)
				throw error;
			let data = JSON.parse(body);
	
			if (data.results.length > 0) {
				coords = data.results[0].geometry;
			}
			else {
				//console.log("results length is 0");
				reject(coords);
			}
			//console.log(coords);
			resolve(coords);
		});
	})
	
}

export const getJD=async(localTime,url)=>{
	return new Promise((resolve,reject)=>{
		var utcTime = { year: 0, month: 0, day: 0, hour: 0, min: 0, sec: 0.0 };
		request(
			url,
			async (error, response, body) => {
				var data = JSON.parse(body);
				//console.log(data);
				let rS = data.resourceSets[0].resources[0].timeZone.convertedTime.utcOffsetWithDst;
				//console.log('-----------------');
				//console.log(rS);
				//console.log('-----------------');

				swisseph.swe_utc_time_zone(localTime.year, localTime.month, localTime.day, localTime.hour, localTime.min, 0, parseFloat(rS), function (data) {
					utcTime.year = data.year;
					utcTime.month = data.month;
					utcTime.day = data.day;
					utcTime.hour = data.hour;
					utcTime.min = data.minute;
				});
				//console.log(utcTime);
				//console.log(localTime);
				//console.log(utcTime);
				var jd;
				swisseph.swe_utc_to_jd(utcTime.year, utcTime.month, utcTime.day, utcTime.hour, utcTime.min, 0, swisseph.SE_GREG_CAL, function (body, err) {
					//console.log(body.julianDayUT);
					jd = body.julianDayUT;
				});
				resolve(jd);
			}
		);
	});
	
}

export const formatEverything=(birthdayAndTime)=>{
	var year=birthdayAndTime.year.toString();
	var month=birthdayAndTime.month.toString();
	var day=birthdayAndTime.day.toString();
	var hour=birthdayAndTime.hour.toString();
	var min=birthdayAndTime.min.toString();
	if(birthdayAndTime.month<10)
		month='0'+month;
	if(birthdayAndTime.day<10)
		day='0'+day;
	if(birthdayAndTime.hour<10)
		hour='0'+hour;
	if(birthdayAndTime.min<10)
		min='0'+min;
	return year+"-"+month+'-'+day+'T'+hour+':'+min+':00Z';
}
