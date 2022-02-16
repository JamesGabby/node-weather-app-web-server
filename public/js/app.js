const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = '';
    messageTwo.textContent = 'Loading...';

    fetch(`http://localhost:3001/weather?address=${location}`).then((res) => {
        res.json().then((data) => { 
            if (data.error) {
                console.log(data.error);
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = `The current forecast is ${data.forecastData.weather}. The temperature is ${data.forecastData.temperature}°c. It feels like ${data.forecastData.feels_like}°c.`
            }
        });
    });
});