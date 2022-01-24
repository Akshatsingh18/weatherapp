var fetchWeather = "/weather"

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')



const weatherIcon = document.querySelector('.weatherIcon i')
const weatherCondition = document.querySelector('.weathercondition')

const tempElement = document.querySelector('.temperature span')
const locationElement = document.querySelector('.place')

const dateElement = document.querySelector('.date')

const monthNames = ["JAN" , "FEB" ,"MAR" , "APR" , "MAY" , "JUN" , "JULY" , "AUG" , "SEP" , "OCT" , "NOV" ,"DEC"]

dateElement.textContent = new Date().getDate() +", "+ monthNames[new Date().getMonth()]






weatherForm.addEventListener('submit',(event)=>
{
    event.preventDefault();
    locationElement.textContent = "Loading..."
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address="+search.value;
    fetch(locationApi).then(response =>{
       response.json().then(data => {
           if(data.error)
           {
            locationElement.textContent = data.error;
            tempElement.textContent = "";
            weatherCondition.textContent = "";
           }
           else{
               if(data.description === "rain")
               {
                   weatherIcon.className = "wi wi-day-rain"
               }              
               else  if(data.description === "thunderstorm")
               {
                   weatherCondition.className = "wi wi-thunderstorm"
               }
               else if(data.description === "mist")
               {
                   weatherIcon.className = "wi wi-day-fog"
               }
               else if(data.description === "sunny")
               {
                   weatherCondition.className ="wi-day-sunny"
               }
            locationElement.textContent = data.cityName;
            tempElement.textContent = (data.temperature - 273.5).toFixed(0) + String.fromCharCode(176);;
            weatherCondition.textContent = data.description.toUpperCase();
           }

       }) 
    })
})