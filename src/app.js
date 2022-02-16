const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);


// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'James Gabbitus'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Some helpful info.',
        title: 'Help',
        name: 'James Gabbitus'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'James Gabbitus'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
    
            res.send({
                location,
                forecastData,
                address: req.query.address
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'This help article was not found.',
        title: '404',
        name: 'James Gabbitus'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        title: '404',
        name: 'James Gabbitus'
    });
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
