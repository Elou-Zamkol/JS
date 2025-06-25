document.getElementById("Previous-page").onclick = () => {
    window.location.href = "../User-page.html";
}


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





//=====================================================



const apiKey = 'b4f03db1';
let currentPage = 1;
let currentSearch = '';

const moviesContainer = document.getElementById('moviesContainer');
const pagination = document.getElementById('pagination');



const modal = document.getElementById('modal');
const modalDetails = document.getElementById('modalDetails');

const closeModalBtn = document.getElementById('closeModal');


searchMovies("Iron", currentPage);



document.getElementById('getWeatherBtn').addEventListener('click', () => {
    currentSearch = document.getElementById('cityInput').value.trim();
    if (!currentSearch) {
        showNotification("Введите название фильма.")
        return;
    }
    currentPage = 1;
    searchMovies(currentSearch, currentPage);
});


async function searchMovies(query, page) {
    showLoader()
    try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&page=${page}`;
        const res = await fetch(url);

        const data = await res.json();

        if (data.Response === "True") {
            showMovies(data.Search);
            setupPagination(parseInt(data.totalResults));
        } else {
            showNotification(data.Error)
            pagination.innerHTML = '';
        }
    } catch (error) {
        showNotification("Ошибка сети или API.")

    }finally {
        hideLoader()
    }
}


function setupPagination(totalResults) {
    const totalPages = Math.ceil(totalResults / 10);
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages && i <= 5; i++) { // максимум 5 страниц
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.disabled = i === currentPage;

        btn.onclick = () => {
            currentPage = i;
            searchMovies(currentSearch, currentPage);
        };
        pagination.appendChild(btn);

    }

}


closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});


async function fetchMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('Ошибка при загрузке данных фильма');
    return res.json();
}

function showModal(data) {

    modalDetails.innerHTML = `
    <h2>${data.Title} (${data.Year})</h2>
    <p><strong>Режиссёр:</strong> ${data.Director}</p>
    <p><strong>Актёры:</strong> ${data.Actors}</p>
    <p><strong>Рейтинг IMDb:</strong> ${data.imdbRating}</p>
    <p><strong>Описание:</strong> ${data.Plot}</p>
    <img src="${data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg'}" alt="Постер фильма" style="max-width: 100%; margin-top: 10px; border-radius: 8px;">
  `;
    modal.classList.remove('hidden');
}


function showMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-card';
        div.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
        div.onclick = async () => {
            try {
                const details = await fetchMovieDetails(movie.imdbID);
                showModal(details);
            } catch (e) {
                alert('Не удалось загрузить детали фильма');
            }
        };
        moviesContainer.appendChild(div);
    });
}
