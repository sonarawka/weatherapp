const path = require('path')
const express = require('express')

const geoloc = require('./Util/geolocation')
const forecast = require('./Util/forecast');



const app = express();

app.set('view engine', 'ejs')

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title:"Hello budzz..., this is index page!",
        path:'/'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:"Hello budzz..., this is about page!",
        path:'/about'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"Hello budzz..., this is help page!",
        path:'/help'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.cityname){
        return res.send({error:"please enter city name"})
    }
    geoloc(req.query.cityname, (error, data)=>{
        if(error){
            return res.send({error:"No internet"})

        }
        else if(data.error){
            return res.send({error:data.error.message})

        }
        else{
            const latitude= data.data[0].latitude
            const longitude= data.data[0].longitude
            forecast(latitude, longitude, (error, data)=>{
                if(error){
                    return res.send({error:"No internet"})
                }
                else if(data.error){
                    return res.send({error:data.error.message})
                }
                else{
                    
                    res.send({latitude, longitude, temp:data.current.temp_c, condition:data.current.condition.text})
                }
    
            })
        }})
})

app.get('/budz', (req, res)=>{
    res.send("hello from budz")
})




app.listen(3000)