const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

const weatherData = require('../utils/WeatherData')

const port = process.env.PORT || 3000

const publicpath = path.join(__dirname,'../public');

const viewspath = path.join(__dirname,'../templates/views')

const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine' , 'hbs');
app.set('views' , viewspath);
hbs.registerPartials(partialspath);

app.use(express.static(publicpath));

app.get('',(req,res)=> {
    res.render('index' , {
        title: 'WEATHER APP'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address

    if(!address)
    {
        return res.send({
            error: "search box is empty"
        })
    }
    weatherData(address,(error , {temperature , description ,cityName} = {}) =>
    {
        if(error)
        {
            return res.send({
                error
            })
        }
        console.log(temperature,description,cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", ( req ,res)=>{
    res.render('404',{
        title: "PAGE NOT FOUND"
    })
})

app.listen(port , ()=> {
console.log("server is running at port ", port)
});