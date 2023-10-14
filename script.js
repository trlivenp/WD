const apiKey = '28f847b931e8c735120fcb3ed48fc1f0';

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    
    // Make an API request to fetch weather data for the entered city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Process the current weather data and update the UI
            const currentWeatherData = {
                city: data.name,
                date: new Date(data.dt * 1000).toLocaleDateString(),
                icon: data.weather[0].icon,
                temperature: `${Math.round(data.main.temp - 273.15)}°C`,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} m/s`,
            };
            updateCurrentWeather(currentWeatherData);
            
            // Add the city to the search history
            addToSearchHistory(data.name);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('City not found. Please try another city.');
        });
});

// Function to update the current weather section
function updateCurrentWeather(data) {
    const currentWeather = document.getElementById('currentWeather');
    currentWeather.innerHTML = `
        <h3>${data.city}</h3>
        <p>Date: ${data.date}</p>
        <p>Weather: <img src="https://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon"></p>
        <p>Temperature: ${data.temperature}</p>
        <p>Humidity: ${data.humidity}</p>
        <p>Wind Speed: ${data.windSpeed}</p>
    `;
}

// Function to add the city to the search history
function addToSearchHistory(city) {
    const searchHistory = document.getElementById('searchHistory');
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', () => {
        // Simulate clicking on a city in the search history
        document.getElementById('cityInput').value = city;
        document.getElementById('searchBtn').click();
    });
    searchHistory.appendChild(listItem);
}

// Function to fetch the 5-day forecast for a city
function fetchFiveDayForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Process the 5-day forecast data and update the UI
            const forecastData = data.list;
            updateForecast(forecastData);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Unable to fetch 5-day forecast. Please try again later.');
        });
}

// Function to update the 5-day forecast section
function updateForecast(data) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.length; i += 8) {
        const date = new Date(data[i].dt * 1000).toLocaleDateString();
        const icon = data[i].weather[0].icon;
        const temperature = `${Math.round(data[i].main.temp - 273.15)}°C`;
        const windSpeed = `${data[i].wind.speed} m/s`;
        const humidity = `${data[i].main.humidity}%`;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>Date: ${date}</p>
            <p>Weather: <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon"></p>
            <p>Temperature: ${temperature}</p>
            <p>Wind Speed: ${windSpeed}</p>
            <p>Humidity: ${humidity}</p>
        `;
        forecastElement.appendChild(forecastItem);
    }
}

// Update the 'click' event listener for the search button
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;

    // Make an API request to fetch weather data for the entered city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Process the current weather data and update the UI
            const currentWeatherData = {
                city: data.name,
                date: new Date(data.dt * 1000).toLocaleDateString(),
                icon: data.weather[0].icon,
                temperature: `${Math.round(data.main.temp - 273.15)}°C`,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} m/s`,
            };
            updateCurrentWeather(currentWeatherData);

            // Add the city to the search history
            addToSearchHistory(data.name);

            // Fetch the 5-day forecast for the city
            fetchFiveDayForecast(data.name);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('City not found. Please try another city.');
        });
});

