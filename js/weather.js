const url = 'https://goweather.herokuapp.com/weather/oslo';
async function getWeather() {
    const response = await fetch(url);
    try {
        console.log(response);
        if(response.status >= 200 && response.status < 300) {
            const result = await response.json();
            const mainEl = document.getElementById('app');
            const temperatureEl = document.createElement('p');
            temperatureEl.textContent = result.temperature;
            const windEl = document.createElement('p');
            windEl.textContent = result.wind;
            mainEl.append(temperatureEl);
            mainEl.append(windEl); 
            return result;
        } else if(response.status === 404){
            throw new Error('Url ikke funnet');
        } else if(response.status === 401){
            throw new Error('Ikke authorisert');
        } else if(response.status === 500){
            throw new Error('Server er ned');
        } else {
            throw new Error('Noe gikk galt');
        }
    } catch (error) {
        const errorBox = document.querySelector('.error');
        errorBox.textContent = error.message;
        errorBox.classList.toggle('hide-error');
    }
};
const result = getWeather() // invoke av funksjonen getWeather
console.log('wait');