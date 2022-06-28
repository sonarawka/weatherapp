const request = require('request')

const geolocation = (cityName, callback)=>{
    const url = `http://api.positionstack.com/v1/forward?access_key=081f5290275e06d62c4f3db4f6c7dd48&query=${cityName}`
    request({url}, (error, response)=>{
        const data = JSON.parse(response.body.toString())
        callback(error, data)
    })
}

module.exports = geolocation;