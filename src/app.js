const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

//Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshay Bandivadekar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshay Bandivadekar'
    });
});

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akshay Bandivadekar',
        helpText: 'This is some helpful text.'
    })
});

app.get('/weather', (req, res) => {
    const {address} = req.query;
    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshay Bandivadekar',
        error: 'Help Article not found'
    })
});

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshay Bandivadekar',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;
