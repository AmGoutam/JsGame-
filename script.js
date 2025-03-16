const bubbleContainer = document.querySelector(".bubble_container");
const TimerDispaly = document.getElementById("time");
const targetDisplay = document.getElementById("terget");
const scoreDisplay = document.getElementById("score");
const originalTime = 20;
let leftTime = 20;
let score = 0;
let bubbleCount = 100;
let handleTimer;
function createBubbles() {
    bubbleContainer.innerHTML = "";
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div")
        bubble.classList.add("bubble");
        bubble.textContent = Math.floor(Math.random() * 10)
        bubbleContainer.appendChild(bubble)
    }
}


function generateTarget() {
    const target = Math.floor(Math.random() * 10);
    targetDisplay.textContent = target
}

function startTimer() {
    clearInterval(handleTimer);
    handleTimer = setInterval(() => {
        leftTime--;
        TimerDispaly.textContent = leftTime;
        if(leftTime < 5){
            TimerDispaly.style.color = "red";
        }else{
            TimerDispaly.style.color = "blue";
        }
        if (leftTime === 0) {
            clearInterval(handleTimer);

            let html = `        
            <div class="append_container">
                <h1>Opps..!! Game Over</h1>
                <h1>Try Again..</h1>
                <h3>Score : <strong>${score}</strong></h3>
                <button onclick="resetGame()">Re Start</button>
            </div>`
            bubbleContainer.innerHTML = html;
            targetDisplay.textContent = 0;
        }
    }, 1000)
}

function resetGame() {
    leftTime = originalTime;
    score = 0;
    target = 0;
    TimerDispaly.textContent = originalTime
    scoreDisplay.textContent = 0;
    startGame();
}


function startGame() {
    createBubbles();
    generateTarget();
    startTimer();
}


bubbleContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("bubble")) {
        console.log(event.target.textContent === targetDisplay.textContent)
        if (event.target.textContent === targetDisplay.textContent) {
            score = score + 10;
        } else {
            score = score - 5;
        }
        scoreDisplay.textContent = score
        generateTarget()
        createBubbles()
    }
})

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'r' || event.key === 'F5') { // Check for Ctrl+R or F5
        event.preventDefault(); // Prevent the default action (refresh)
    }
});
