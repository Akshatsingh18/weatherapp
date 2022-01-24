
const request = require('request');
const constants = require("../config");

const WeatherData = ( address , callback ) =>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    console.log(url);
    request({url,json:true},(error,{body}) => {
        if(error) {
            callback("can't fetch the data ",undefined)
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather) 
        {
            callback("Unable to find the required the data   Try another location")
        }
        else 
        {
            callback(undefined , {
                temperature: body.main.temp,
                description: body.weather[0].description ,
                cityName: body.name
            })
        }

    })
}

module.exports = WeatherData;