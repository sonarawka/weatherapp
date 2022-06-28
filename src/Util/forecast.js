const request = require('request')

const forecast = (lat, long, callback)=>{
    const url =`http://api.weatherapi.com/v1/current.json?key=863dd2d44a08467499c115807222506&q=${lat},${long}&aqi=no`
    request({url}, (error, response)=>{
        const data =JSON.parse(response.body.toString())
        callback(error, data)
    })

}

module.exports = forecast;