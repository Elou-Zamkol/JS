
const Email = sessionStorage.getItem("UserEmail");
const userStr = localStorage.getItem(Email);
let user = userStr ? JSON.parse(userStr) : null;

if (!user) { window.location.href = "../Registration panel/Regist.html"; }

document.getElementById('userName').textContent = user.Name;
document.getElementById('userEmail').textContent = Email;





//-------------------------------Сортировка по жанрам------------------------------------------------------------------------------

const buttons = document.querySelectorAll('.genre-menu button');
const images = document.querySelectorAll('.Foto img');
const carou = document.querySelectorAll('.carousel-div');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const genre = button.dataset.genre;

        images.forEach(img => {
            const imgGenre = img.dataset.genre;
            img.style.display = (genre === 'all' || genre === imgGenre) ? 'block' : 'none';
        });

        carou.forEach(carousel => {
            carousel.style.display = (genre === 'all' || genre === 'carousel') ? 'flex' : 'none';
        });
    });
});





//-------------------------------Тематика------------------------------------------------------------------------------

const toggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem("siteTheme") || "dark";

document.body.classList.add(currentTheme);
toggle.checked = currentTheme === "light";

toggle.addEventListener('change', () => {
    const theme = toggle.checked ? "light" : "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("siteTheme", theme);
});


//-----------------------------------Карусель-------------------------------------------------------------------------


let carousels = document.querySelectorAll('.carousel');

// Для каждой карусели сохраняем текущий индекс
let indices = Array.from(carousels).map(() => 0);

function showNextSlides() {
    carousels.forEach((carousel, i) => {
        let slides = carousel.querySelectorAll('.slide');
        // Скрыть текущий
        slides[indices[i]].classList.remove('active');
        // Обновить индекс
        indices[i] = (indices[i] + 1) % slides.length;
        // Показать новый
        slides[indices[i]].classList.add('active');
    });
}

// Запускаем таймер на 3 секунды
setInterval(showNextSlides, 5000);