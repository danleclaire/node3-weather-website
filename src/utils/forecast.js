request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c498f44122e68a75b124eaec91e8cc48&query=' + longitude + ',' + latitude + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
            
        } else if (body.error) {
            callback('Unable to find location.', undefined )
            
        } else {
            callback('', body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + ' degrees out. However, it feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast