const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=af912d950376212113328425447479c0&query=${lat},${long}&units=m`;
    
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, 
                {
                    weather: body.current.weather_descriptions[0], 
                    temperature: body.current.temperature,
                    feels_like: body.current.feelslike
                }
            )
        }
    });
}

module.exports = forecast;
