document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
});


//-------------------------------------------------------------------------------------------------------------

const loginForm = document.getElementById('loginFormContainer');
const registerForm = document.getElementById('registerFormContainer');

document.getElementById('toRegister').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

document.getElementById('toLogin').addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Начальное состояние
loginForm.classList.add('active');
registerForm.classList.remove('active');

