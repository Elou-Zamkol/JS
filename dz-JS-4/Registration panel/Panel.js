document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
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





//-------------------------------------------------------------------------------------------------------------


const loginFormContainer = document.getElementById('loginFormContainer');
const registerFormContainer = document.getElementById('registerFormContainer');

function hideElementWithFade(element) {
    return new Promise(resolve => {
        element.classList.add('hidden');

        function onTransitionEnd(e) {
            if (e.propertyName === 'opacity') {
                element.style.display = 'none';
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            }
        }

        element.addEventListener('transitionend', onTransitionEnd);
    });
}

function showElementWithFade(element) {
    return new Promise(resolve => {
        element.style.display = 'block';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                element.classList.remove('hidden');
            });
        });

        function onTransitionEnd(e) {
            if (e.propertyName === 'opacity') {
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            }
        }

        element.addEventListener('transitionend', onTransitionEnd);
    });
}


document.getElementById('toRegister').addEventListener('click', async (event) => {
    event.preventDefault();
    await hideElementWithFade(loginFormContainer);
    await showElementWithFade(registerFormContainer);
});

document.getElementById('toLogin').addEventListener('click', async (event) => {
    event.preventDefault();
    await hideElementWithFade(registerFormContainer);
    await showElementWithFade(loginFormContainer);
});

loginFormContainer.style.display = 'block';
registerFormContainer.style.display = 'none';
registerFormContainer.classList.add('hidden');