
//1-----------------------------------------------------------------------------------

const input = document.getElementById("input1");

input.addEventListener("input", function () {
    let text = input.value;
    let output = "";

    for (let i of text) {
        if (i.charCodeAt(0) < 48 || i.charCodeAt(0) > 57) {
            output += i;
        }
    }

    input.value = output;
});

//2-----------------------------------------------------------------------------

const button2 = document.getElementById("button2");
const button2Rear = document.getElementById("button-rear");

button2.onclick = function () {
    document.querySelector('.background_rear').style.display = 'block';
}
button2Rear.onclick = function () {
    document.querySelector('.background_rear').style.display = 'none';
}


//3-----------------------------------------------------------------------------
const field = document.getElementById('field');
const ball = document.getElementById('ball');
const BALL_SIZE = 100;

field.addEventListener('click', (e) => {
    const rect = field.getBoundingClientRect();
    let x = e.clientX - rect.left - BALL_SIZE / 2;
    let y = e.clientY - rect.top - BALL_SIZE / 2;

    x = Math.max(0, Math.min(x, field.clientWidth - BALL_SIZE));
    y = Math.max(0, Math.min(y, field.clientHeight - BALL_SIZE));

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
});



//4-----------------------------------------------------------------------------


let count = 1;

const button4 = document.getElementById("button4");

button4.onclick = function () {
    count++
    if(count === 1) {
        document.querySelector('#traffic-light-button-1').style.background = 'red'
    } else if(count === 2) {
        document.querySelector('#traffic-light-button-2').style.background = 'yellow'
    } else if(count === 3) {
        document.querySelector('#traffic-light-button-3').style.background = 'green'
    }
    document.querySelector(`#traffic-light-button-${count - 1 === 0 ? 3 : count - 1}`).style.background = 'grey'
    count = count === 3 ? 0 : count
}

//5-----------------------------------------------------------------------------

const spisok = document.getElementById("spisok");

let oldItem = undefined;

spisok.onclick = function (event) {
   if(event.target.dataset.index !== undefined) {
       const item = document.querySelector(`[data-index="${event.target.dataset.index}"]`);
       item.style.backgroundColor = "orange";

       if(oldItem !== undefined) {
           oldItem.style.backgroundColor = ""
       }
       oldItem = item
   }

}


//6-----------------------------------------------------------------------------

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        const tooltip = btn.querySelector('.tooltip')
        tooltip.classList.remove('top', 'bottom')

        if (btn.getBoundingClientRect().top < 50) {
            tooltip.classList.add('bottom')
        } else {
            tooltip.classList.add('top')
        }
    })
})