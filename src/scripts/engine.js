const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        lifes: document.querySelector("#lifes"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        p: document.querySelector(".p-time"),
        resultGame1: document.querySelector("#result-game-time"),
        resultGame2: document.querySelector("#result-game-life"),
    },

    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        life: 3,
        curretTime: 60,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function speedUp() {
    state.values.gameVelocity -= 20;
    clearInterval(state.actions.timerId);

    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        state.view.resultGame1.textContent = state.values.result;

        showAlert1();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");

                speedUp();
            }

            if (state.values.hitPosition !== state.view.enemy) {
                state.values.life--;
                state.view.lifes.textContent = state.values.life;
                state.values.hitPosition = null;
            }

            if (state.values.life <= 0) {

                state.view.resultGame2.textContent = state.values.result;

                showAlert2();
            }
        });
    })
}

function showAlert1() {
    var alert1 = document.getElementById("alert-time");
    alert1.style.display = "block";
}

function closeAlert1() {
    var alert1 = document.getElementById("alert-time");
    alert1.style.display = "none";
}

function showAlert2() {
    var alert2 = document.getElementById("alert-lifes");
    alert2.style.display = "block";
}

function closeAlert2() {
    var alert2 = document.getElementById("alert-lifes");
    alert2.style.display = "none";
}

function initialize() {
    addListenerHitBox();
}

initialize();