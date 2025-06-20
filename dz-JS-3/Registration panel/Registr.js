import bcrypt from "https://esm.sh/bcryptjs@2.4.3";
sessionStorage.removeItem("UserEmail");

import { showNotification }  from "../Notifications/Exsept.js";



let buttonRegister = document.getElementById('buttonRegister');
let buttonEntrance = document.getElementById('buttonEntrance');
let Name, Email, registerPassword, confirmPassword

buttonRegister.onclick = async function () {

    Name = document.getElementById('registerUsername').value;
    Email = document.getElementById('registerEmail').value;
    registerPassword = document.getElementById('registerPassword').value;
    confirmPassword = document.getElementById('confirmPassword').value;
    const storedUser = JSON.parse(localStorage.getItem(Email));

    //-----------------------------------------------------------------------------------------------

    const validations = [
        { value: Name, min: 4, message: "Имя должно быть как минимум из 4 символов" },
        { value: Email, min: 7, message: "Email должно быть как минимум из 7 символов" },
        { value: registerPassword, min: 6, message: "Пароль должно быть как минимум из 6 символов" },
        { value: confirmPassword, min: 6, message: "Подтверждение пароля должно быть как минимум из 6 символов" }
    ];

    for (let check of validations) {
        if (check.value.length < check.min) {
            showNotification(check.message);
            return;
        }
    }

    if (storedUser !== null) {
        showNotification("Пользователь уже есть")
        return;
    } else if (registerPassword !== confirmPassword) {
        showNotification("Пароли не совпадают")
        return;
    }

    //-----------------------------------------------------------------------------------------------


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerPassword, saltRounds);

    let user = {
        Name: Name,
        Password: hashedPassword,
        address: {
            lat: null,
            lng: null
        }
    };
    localStorage.setItem(Email, JSON.stringify(user));
    sessionStorage.setItem("UserEmail", Email);
    window.location.href = "../User panel/kart.html";


};


buttonEntrance.onclick = async function () {
    Email = document.getElementById('loginEmail').value;
    let Password = document.getElementById('loginPassword').value;

    const storedUserStr = localStorage.getItem(Email);

    //-----------------------------------------------------------------------------------------------
    if (storedUserStr === null) { showNotification("Такого пользователя нет"); return; }

    const storedUser = JSON.parse(storedUserStr);


    const isMatch = await bcrypt.compare(Password, storedUser.Password);

    if (!isMatch) { showNotification("Пароль не верный"); return; }

    //-----------------------------------------------------------------------------------------------
    sessionStorage.setItem("UserEmail", Email);

    window.location.href = "../User panel/kart.html";
};





