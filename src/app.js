const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// Set Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Dan\'s Current Weather Application...',
        name: 'Dan Leclaire'
    })    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dan Leclaire'        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'I hope this msg is helpful to you!',
        title: 'Help',
        name: 'Dan Leclaire'        
    })
})


// app.get function code below was for testing purposes
// of the root access of the server.

// app.get('', (req, res) => {
//     res.send('<h1>Weather...</h1>')    
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Daniel',
//         age: 64
//     },
//     {
//         name: 'Denyse',
//         age: 68
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide a location to search...'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
            // console.log('Error:', error)
            // console.log('Data:', data)
    
        forecast(longitude , latitude, (error, forecastData) => {            
            if(error) {
                return res.send({ error })
            } else { 
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                
                // console.log('In ' + location)
                // console.log(forecastData)
            }
        })
        
    })
    // res.send({
    //     weather: 'It is snowing...',
    //     temperature: -4,
    //     location: 'Montreal',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
         error: 'You must provide a search term...'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dan Leclaire',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dan Leclaire',
        errorMsg: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('The server is up and running on port: 3000...')
})
