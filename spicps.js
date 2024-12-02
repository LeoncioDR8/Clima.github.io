let currCity = "Mexico City"; 
let units = "metric";
const API_KEY = 'Your_API_key'; // Reemplaza con tu API Key


const city = document.querySelector(".weather__city");
const datetime = document.querySelector(".weather__datetime");
const weather__forecast = document.querySelector('.weather__forecast');
const weather__temperature = document.querySelector(".weather__temperature");
const weather__icon = document.querySelector(".weather__icon");
const weather__minmax = document.querySelector(".weather__minmax");
const weather__realfeel = document.querySelector('.weather__realfeel');
const weather__humidity = document.querySelector('.weather__humidity');
const weather__wind = document.querySelector('.weather__wind');
const weather__pressure = document.querySelector('.weather__pressure');

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
            weather__temperature.innerHTML = `${data.main.temp.toFixed(1)}&#176;`;
            weather__icon.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
            `;
            weather__minmax.innerHTML = `
                <p>Min: ${data.main.temp_min.toFixed(1)}&#176;</p>
                <p>Max: ${data.main.temp_max.toFixed(1)}&#176;</p>
            `;
            weather__realfeel.innerHTML = `${data.main.feels_like.toFixed(1)}&#176;`;
            weather__humidity.innerHTML = `${data.main.humidity}%`;
            weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
            weather__pressure.innerHTML = `${data.main.pressure} hPa`;
        })
        .catch(error => console.error('Error al obtener los datos del clima:', error));
}

document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if (units !== "metric") {
        units = "metric";
        getWeather();
    }
});

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        units = "imperial";
        getWeather();
    }
});

function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}

function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
}

document.querySelector(".weather__search").addEventListener('submit', e => {
    e.preventDefault();
    const search = document.querySelector(".weather__searchform");

    currCity = search.value;
    getWeather();

    search.value = "";
});


window.addEventListener('load', getWeather);
