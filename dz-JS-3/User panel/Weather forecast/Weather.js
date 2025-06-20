
import { bubbles } from '/Function.js';

bubbles()


//--------------------------------------Загрузка---------------------------------------------------------

async function doStuff(cities) {

    if (cities !== 0){
        Loading.style.display = 'none';
        Container.style.display = 'block';
    }
}


const Container = document.getElementById('Container');
const Loading = document.getElementById('Loading');

Container.style.display = 'none';
Loading.style.display = 'block';


//---------------------------------------------------------------------------------------------------

const Email = sessionStorage.getItem("UserEmail");
const userStr = localStorage.getItem(Email);
let user = userStr ? JSON.parse(userStr) : null;

if (!user || !user.address) {
    window.location.href = "../../Registration panel/Registr.html";
}

const apiKey = "dbde8fa8e1904f5da8724a3188076258";
const lat = user.address.lat;
const lon = user.address.lng;
let cities = [];
let currentPage = 1;
const perPage = 5;


//--------------------------------------------------------------------------------------------------------

async function loadWeatherData() {

    const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&units=metric&appid=${apiKey}`;
    const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);

    try {
        const res = await fetch(proxyUrl);
        const data = await res.json();
        cities = data.list;
        doStuff(cities.length);
        showPage(currentPage);
    } catch (err) {
        console.error("Ошибка при запросе погоды:", err);
    }
}

function showPage(page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageCities = cities.slice(start, end);

    const container = document.getElementById("weatherContainer");
    container.innerHTML = "";

    pageCities.forEach(city => {
        const div = document.createElement("div");
        div.className = "weather-card";
        div.innerHTML = `
            <h3>${city.name}</h3>
            <p>Температура: ${city.main.temp}°C</p>
            <p>Погода: ${city.weather[0].description}</p>
            <p>Влажность: ${city.main.humidity}%</p>
            <p>Ветер: ${city.wind.speed} м/с</p>
        `;
        container.appendChild(div);
    });

    document.getElementById("pageNum").textContent = `Страница ${page}`;
    document.getElementById("prevBtn").disabled = page === 1;
    document.getElementById("nextBtn").disabled = end >= cities.length;
}

document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
};

document.getElementById("nextBtn").onclick = () => {
    if ((currentPage * perPage) < cities.length) {
        currentPage++;
        showPage(currentPage);
    }
};


document.getElementById("Previous-page").onclick = () => {
    window.location.href = "../kart.html";
}

loadWeatherData();
