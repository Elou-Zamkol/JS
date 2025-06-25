
const Email = sessionStorage.getItem("UserEmail");
const userStr = localStorage.getItem(Email);
let user = userStr ? JSON.parse(userStr) : null;

if (!user) { window.location.href = "../../Registration panel/registr.html"; }

document.getElementById('userName').textContent = user.Name;
document.getElementById('userEmail').textContent = Email;



import { showNotification }  from "../../Notifications/Exsepts.js";



const loader = document.getElementById('loader');

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}







const apiKey = 'dbde8fa8e1904f5da8724a3188076258';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

const currentWeather = document.getElementById('currentWeather');
const forecastTable = document.querySelector('#forecastTable tbody');
const chartCanvas = document.getElementById('tempChart').getContext('2d');

let tempChart = null;

async function getWeather() {
    showLoader()
    try {

        const data = await fetchWeather("Баку");
        renderCurrentWeather(data);
        renderForecastTable(data);
        renderChart(data);
    } catch (err) {
        showNotification(err.message || 'Ошибка загрузки данных');
        currentWeather.style.display = 'none';
        forecastTable.innerHTML = '';
        if (tempChart) tempChart.destroy();
    } finally {
        hideLoader();
    }
}

getWeather()




getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return showNotification('Введите название города.');
    showLoader()
    try {
        showNotification('');
        const data = await fetchWeather(city);
        renderCurrentWeather(data);
        renderForecastTable(data);
        renderChart(data);
    } catch (err) {
        showNotification(err.message || 'Ошибка загрузки данных');
        currentWeather.style.display = 'none';
        forecastTable.innerHTML = '';
        if (tempChart) tempChart.destroy();
    } finally {
        hideLoader();
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Город не найден');
    return await res.json();
}

function renderCurrentWeather(data) {
    const item = data.list[0];
    const temp = item.main.temp.toFixed(1);
    const desc = item.weather[0].description;
    const icon = item.weather[0].icon;

    currentWeather.innerHTML = `
        <h2>${data.city.name}</h2>
        <p><strong>${temp}°C</strong> — ${desc}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="иконка">
    `;
    currentWeather.style.display = 'block';
}

function renderForecastTable(data) {
    const tbody = document.querySelector('#forecastTable tbody');
    tbody.innerHTML = ''; // очистить

    // Функция для получения "Сегодня", "Завтра", "Понедельник" и т.п.
    function getDayLabel(dateStr) {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const date = new Date(dateStr);
        const today = new Date();

        // Обнулим время, чтобы сравнивать только даты
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Сегодня';
        if (diffDays === 1) return 'Завтра';
        if (diffDays > 1 && diffDays < 7) return days[date.getDay()];
        return dateStr; // на всякий случай, если дальше недели
    }

    // Соберём прогноз по 12:00 каждого дня, максимум 5 дней
    const dayEntries = {};
    data.list.forEach(entry => {
        const [dateStr, time] = entry.dt_txt.split(' ');
        if (time === "12:00:00" && !dayEntries[dateStr]) {
            dayEntries[dateStr] = entry;
        }
    });

    const sortedDates = Object.keys(dayEntries).sort();

    sortedDates.slice(0, 5).forEach(dateStr => {
        const entry = dayEntries[dateStr];
        const temp = entry.main.temp.toFixed(1);
        const desc = entry.weather[0].description;
        const icon = entry.weather[0].icon;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${getDayLabel(dateStr)}</td>
         
            <td>${temp}</td>
            <td>${desc}</td>
            <td><img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon"></td>
        `;
        tbody.appendChild(row);
    });
}


function renderChart(data) {
    const labels = [];
    const temps = [];


    data.list.slice(0, 8).forEach(entry => {
        const time = entry.dt_txt.slice(11, 16); // "12:00"
        labels.push(time);
        temps.push(entry.main.temp);
    });

    if (tempChart) tempChart.destroy();

    tempChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Температура (днём)',
                data: temps,
                borderColor: '#3B63E3',
                backgroundColor: 'rgba(59, 99, 227, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#3B63E3'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: { callback: val => `${val}°C` }
                }
            }
        }
    });
}



document.getElementById("Previous-page").onclick = () => {
    window.location.href = "../User-page.html";
}
