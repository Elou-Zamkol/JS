
import { bubbles } from '../Function.js'

bubbles();

import { showNotification }  from "../Notifications/Exsept.js";


const Email = sessionStorage.getItem("UserEmail");
const userStr = localStorage.getItem(Email);
let user = userStr ? JSON.parse(userStr) : null;

if (!user) { window.location.href = "../Registration panel/Registr.html"; }


let map = L.map('map').setView([40.361244, 49.818423], 10);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps',
    maxZoom: 20
}).addTo(map);



let marker = null;
let selected = document.getElementById('selected');


map.on('click', function(e) {
    const {lat, lng} = e.latlng;
    if (marker) marker.setLatLng(e.latlng);
    else marker = L.marker(e.latlng).addTo(map);
    selected.textContent = `Вы выбрали: [${lat.toFixed(5)}, ${lng.toFixed(5)}]`;
    user.address = {lat, lng};
});


document.getElementById('saveBtn').onclick = function() {
    if (!user.address.lat || !user.address.lng) {
        // alert("Сначала выберите адрес на карте!");
        showNotification("Сначала выберите адрес на карте!")
        return;
    }
    localStorage.setItem(Email, JSON.stringify(user));
    window.location.href = "Weather forecast/Weather.html";
};


document.getElementById("Previous-page").onclick = () => {
    window.location.href = "../Registration panel/Registr.html";
}



