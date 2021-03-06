const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFubGVjIiwiYSI6ImNreGg5dXg1czMxYmIydnFoOXljaWlleDkifQ.wkLtBgq8ULoID_Tsw7bXXQ&limit=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geo Location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Sorry! Unable to find the location as entered. Please try again.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name, 
                latitude: body.features[0].center[0], 
                longitude: body.features[0].center[1]})
        }
    })
}

module.exports = geocode