const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=19f8224ad4e1d0f6b89873349c8ff69c&query=${latitude},${longitude}&units=f`;
    console.log(url);
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            const {current} = body;
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degree out. It feels like ${current.feelslike} degree out. The humidity is ${current.humidity}%.`);
        }
    });
};

module.exports = forecast;