

export function showNotification(message, color = "#ff4444") {
    const notif = document.getElementById("notification");
    notif.textContent = message;
    notif.style.backgroundColor = color;
    notif.classList.add("show");

    setTimeout(() => {
        notif.classList.remove("show");
    }, 3000);
}