request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    //const url = 'http://api.weatherstack.com/current?access_key=c498f44122e68a75b124eaec91e8cc48&query=' + longitude + ',' + latitude + '&units=m'

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=1ebb1b1b6ad712978fad167aed8562b4&units=metric'
    
    // 'https://api.openweathermap.org/data/2.5/weather?lat=45.5&lon=72.5&appid=1ebb1b1b6ad712978fad167aed8562b4&units=metric'
    

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
            
        } else if (body.error) {
            callback('Unable to find location.', undefined )
            
        } else {
            callback('', body.weather[0].description + '. The current temperature is ' + body.main.temp + ' degrees out. However, it feels like ' + body.main.feels_like + ' degrees out.')
        }
    })
}

module.exports = forecast