const request = require('request');
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWtzaGF5YiIsImEiOiJja3dvdHBidjQwNmFsMm9sY2htNWx4ejdkIn0.u4Zo9yP3BdthYFP-rG8skg&limit=1`;
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location, Try another search.', undefined);
        } else {
            const {features} = body;
            const {center: latitudeArray, place_name: location} = features[0];
            const latitude = latitudeArray[1];
            const longitude = latitudeArray[0];
            callback(undefined,{
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geoCode;