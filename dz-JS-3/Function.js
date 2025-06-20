export function bubbles(){
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.bubbles-background');
        container.innerHTML = ''; // Очистка контейнера

        const bubbleCount = 80;

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Случайные параметры пузырька:
            const size = (Math.random() * 20 + 10).toFixed(2) + 'px'; // 10-30px
            const left = (Math.random() * 100).toFixed(2) + '%'; // по горизонтали
            const duration = (Math.random() * 10 + 10).toFixed(2) + 's'; // 10-20с
            const delay = (Math.random() * 20).toFixed(2) + 's'; // задержка для распределения
            const startTop = (100 + Math.random() * 20).toFixed(2) + '%'; // немного ниже видимой области

            bubble.style.setProperty('--size', size);
            bubble.style.setProperty('--left', left);
            bubble.style.setProperty('--duration', duration);
            bubble.style.setProperty('--delay', delay);
            bubble.style.setProperty('--start-top', startTop);

            container.appendChild(bubble);
        }
    });
}