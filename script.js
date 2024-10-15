const apiKey = '7fea5eb39a1b4edbafe33457241510';  // API key Anda
const city = 'Jakarta';

const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

// Fetch data dari WeatherAPI
fetch(apiURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        
        const current = data.current;
        const forecast = data.forecast.forecastday;

        // Header Info
        document.getElementById('city-temp').textContent = `${current.temp_c}°C`;
        document.getElementById('description').textContent = current.condition.text;

        // Informasi Tambahan
        document.getElementById('wind-info').textContent = `Angin: ${current.wind_kph} km/h`;
        document.getElementById('humidity-info').textContent = `Kelembapan: ${current.humidity}%`;
        document.getElementById('uv-index-info').textContent = `UV Index: ${current.uv}`;
        document.getElementById('pressure-info').textContent = `Tekanan Udara: ${current.pressure_mb} hPa`;
        document.getElementById('feels-like-info').textContent = `Terasa Seperti: ${current.feelslike_c}°C`;

        // Hourly Forecast
        const hourlyDiv = document.getElementById('hourly-forecast');
        const hourlyData = forecast[0].hour;
        hourlyData.slice(12, 24).forEach(hour => {
            const hourBlock = document.createElement('div');
            hourBlock.innerHTML = `
                <p>${hour.time.split(' ')[1]}</p>
                <p>${hour.temp_c}°C</p>
                <img src="${hour.condition.icon}" alt="${hour.condition.text}" />
            `;
            hourlyDiv.appendChild(hourBlock);
        });

        // 7-Day Forecast
        const sevenDayUl = document.getElementById('seven-day-forecast');
        forecast.forEach(day => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${new Date(day.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>${day.day.maxtemp_c}° / ${day.day.mintemp_c}°</span>
            `;
            sevenDayUl.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('city-temp').textContent = 'Error memuat data';
    });
