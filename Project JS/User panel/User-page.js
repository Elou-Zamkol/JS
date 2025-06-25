
const Email = sessionStorage.getItem("UserEmail");
const userStr = localStorage.getItem(Email);
let user = userStr ? JSON.parse(userStr) : null;

if (!user) { window.location.href = "../Registration panel/registr.html"; }

document.getElementById('userName').textContent = user.Name;
document.getElementById('userEmail').textContent = Email;


document.getElementById('Weather').onclick = function () {  window.location.href = "./Weather by city/Weather.html"; };
document.getElementById('News').onclick = function () {  window.location.href = "./News/New.html"; };
document.getElementById('movies').onclick = function () {  window.location.href = "./Search and display movies/Movies.html"; };






