// Global variables
let currentMoney = 50;
let betAmount = 0;

const betOneButton = document.getElementById("betOneButton");
const betTwoButton = document.getElementById("betTwoButton");
const betThreeButton = document.getElementById("betThreeButton");

const coin = document.getElementById("coin")
const headerBulbs = document.getElementById("title")
const slotMachine = document.getElementById("slot-machine")
const betDisplay = document.getElementById("bet-display");
betDisplay.innerText = `${betAmount}`;
const moneyDisplay = document.getElementById("money-display");
moneyDisplay.innerText = `${currentMoney}`;
const confirmButton = document.getElementById("confirm-button");
confirmButton.disabled = true;
const slotButton = document.getElementById("coin-slot");
slotButton.disabled = true;
const lever = document.getElementById("lever");
lever.style.pointerEvents = "none";
const customAlert = document.getElementById("alert-p");
function customAlertOn(text) {
    customAlert.style.display = "block";
    customAlert.innerText = `${text}`
    customAlert.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
}
function customAlertOff() {
    customAlert.style.display = "none";
}
function pauseButtons() {
    betOneButton.disabled = true;
    betTwoButton.disabled = true;
    betThreeButton.disabled = true;
}
function resumeButtons() {
    betOneButton.disabled = false;
    betTwoButton.disabled = false;
    betThreeButton.disabled = false;
}
function afterSpin() {
    resumeButtons();
    betAmount = 0
}
function gameLost() {
    if (currentMoney < 1) {
        customAlertOn("You ran out of money, better luck next time!")
        setTimeout(() => {
            location.reload()
        }, 3000)
    }
}
function gameWon() {
    if (currentMoney >= 500) {
        customAlertOn("Congratulations! You've won!");
        slotMachine.classList.add("flashGreen");
        headerBulbs.classList.add("flashgreenHeader");
        console.log("Before setTimeout");

        setTimeout(() => {
            console.log("Inside setTimeout before class removal");
            slotMachine.classList.remove("flashGreen");
            headerBulbs.classList.remove("flashgreenHeader");
            console.log("Inside setTimeout after class removal");
            location.reload();
            console.log("Page should reload now");
        }, 5000);
    }
}
function updateButtons() {
    if (currentMoney >= betAmount) {
        confirmButton.disabled = false;
    } else {
        confirmButton.disabled = true;
    }
}
function updateMoneyDisplay() {
    moneyDisplay.innerText = `${currentMoney}`;
}
function updateBetAmount(amount) {
    if (betAmount + amount <= currentMoney) {
        betAmount += amount;
        betDisplay.innerText = betAmount;
        updateButtons();
    }
}

betOneButton.addEventListener("click", function () {
    updateBetAmount(1);
});
betTwoButton.addEventListener("click", function () {
    updateBetAmount(2);
});
betThreeButton.addEventListener("click", function () {
    updateBetAmount(3);
});

confirmButton.addEventListener("click", function () {
    if (betAmount > 0) {
        currentMoney -= betAmount;
        updateMoneyDisplay();
        slotButton.disabled = false;
        confirmButton.disabled = true;
        pauseButtons();
        betDisplay.innerText = 0;
    }
});

slotButton.addEventListener("click", function () {
    lever.style.pointerEvents = "auto";
    slotButton.disabled = true;
    coin.style.display = "block";
})

lever.addEventListener("click", function () {
    document.getElementById("lever").style.display = "none";
    document.getElementById("pulledlever").style.display = "flex";
    coin.style.display = "none"

    setInterval(() => {
        document.getElementById("lever").style.display = "flex";
        document.getElementById("pulledlever").style.display = "none";
    }, 300)

    setTimeout(() => {
        lever.style.pointerEvents = "none";
    }, 1000)
})

// --------------------------- Logic for slot spin ---------------------------

document.getElementById("lever").addEventListener("click", spin);

const columnArrays = [
    ["🍉", "🍎", "🍇", "🍒", "💎", "🌶️"],
    ["🌶️", "🍒", "🍇", "💎", "🍎", "🍉"],
    ["🍎", "🍇", "🍒", "💎", "🍉", "🌶️"]

    //        To test jackpot 
    // ["💎", "💎", "💎", "💎", "💎", "💎"],
    // ["💎", "💎", "💎", "💎", "💎", "💎"],
    // ["💎", "💎", "💎", "💎", "💎", "💎"]

    //        To test 3 matching
    // ["🌶️", "🌶️", "🌶️", "🌶️", "🌶️", "🌶️"],
    // ["🌶️", "🌶️", "🌶️", "🌶️", "🌶️", "🌶️"],
    // ["🌶️", "🌶️", "🌶️", "🌶️", "🌶️", "🌶️"]
];

const multipliers = {
    "🍒": 1,
    "🍇": 1.5,
    "🍉": 2,
    "💎": 5,
    "🍎": 2.5,
    "🌶️": 3,
}

const columns = [
    [
        document.getElementById("slot-column-one1"),
        document.getElementById("slot-column-one2"),
        document.getElementById("slot-column-one3")
    ],
    [
        document.getElementById("slot-column-two1"),
        document.getElementById("slot-column-two2"),
        document.getElementById("slot-column-two3")
    ],
    [
        document.getElementById("slot-column-three1"),
        document.getElementById("slot-column-three2"),
        document.getElementById("slot-column-three3")
    ]
];

const timeouts = [2000, 3000, 4000];

function spin() {
    results = ['', '', '']
    columns.forEach((column, index) => {
        const interval = setInterval(() => {
            const currentIndex = Math.floor(Math.random() * columnArrays[index].length);
            column[0].classList.add('move-down-top');
            column[1].classList.add('move-down-middle');
            column[2].classList.add('move-down-bottom');
            column[1].innerText = columnArrays[index][currentIndex];
            column[0].innerText = columnArrays[index][(currentIndex - 1 + columnArrays[index].length) % columnArrays[index].length];
            column[2].innerText = columnArrays[index][(currentIndex + 1) % columnArrays[index].length];
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            const currentIndex = Math.floor(Math.random() * columnArrays[index].length);
            column[0].classList.remove('move-down-top');
            column[1].classList.remove('move-down-middle');
            column[2].classList.remove('move-down-bottom');
            column[1].innerText = columnArrays[index][currentIndex];
            results[index] = columnArrays[index][currentIndex];
            column[0].innerText = columnArrays[index][(currentIndex - 1 + columnArrays[index].length) % columnArrays[index].length];
            column[2].innerText = columnArrays[index][(currentIndex + 1) % columnArrays[index].length];
        }, timeouts[index]);
    });
    // --------------------------- Logic for money loss and gain for spin ---------------------------
    setTimeout(() => {
        let multiplierValue;
        let matchedEmoji;

        const handleMatchingResults = (emojiIndex) => {
            matchedEmoji = results[emojiIndex];
            multiplierValue = multipliers[matchedEmoji];
            currentMoney += betAmount * multiplierValue;
            moneyDisplay.innerText = `${currentMoney}`;
        };

        if (results[0] === results[1] && results[0] === results[2]) {
            if (results[0] === "💎") {
                matchedEmoji = results[0];
                multiplierValue = multipliers[matchedEmoji];
                currentMoney += (betAmount * multiplierValue) * 4;
                moneyDisplay.innerText = `${currentMoney}`;
                slotMachine.classList.add("flashCyan");
                headerBulbs.classList.add("flashcyanHeader");
                setTimeout(() => {
                    slotMachine.classList.remove("flashCyan");
                    headerBulbs.classList.remove("flashcyanHeader");
                }, 4000);
            } else {
                matchedEmoji = results[0];
                multiplierValue = multipliers[matchedEmoji];
                currentMoney += (betAmount * multiplierValue) * 2;
                moneyDisplay.innerText = `${currentMoney}`;
                slotMachine.classList.add("flashGreen");
                headerBulbs.classList.add("flashgreenHeader");
                setTimeout(() => {
                    slotMachine.classList.remove("flashGreen");
                    headerBulbs.classList.remove("flashgreenHeader");
                }, 2000);
            }
        } else if (results[0] === results[1]) {
            handleMatchingResults(0);
            slotMachine.classList.add("flashyellowDouble");
            headerBulbs.classList.add("flashyellowdoubleHeader");
            setTimeout(() => {
                slotMachine.classList.remove("flashyellowDouble");
                headerBulbs.classList.remove("flashyellowdoubleHeader");
            }, 4000);
        } else if (results[0] === results[2]) {
            handleMatchingResults(0);
            slotMachine.classList.add("flashyellowDouble");
            headerBulbs.classList.add("flashyellowdoubleHeader");
            setTimeout(() => {
                slotMachine.classList.remove("flashyellowDouble");
                headerBulbs.classList.remove("flashyellowdoubleHeader");
            }, 4000);
        } else if (results[1] === results[2]) {
            handleMatchingResults(1);
            slotMachine.classList.add("flashyellowDouble");
            headerBulbs.classList.add("flashyellowdoubleHeader");
            setTimeout(() => {
                slotMachine.classList.remove("flashyellowDouble");
                headerBulbs.classList.remove("flashyellowdoubleHeader");
            }, 4000);
        }

        if (matchedEmoji) {
            multiplierValue = multipliers[matchedEmoji];
            console.log(`Multiplier value for ${matchedEmoji} is: ${multiplierValue}`);
        } else {
            console.log("No matching emoji found in the results.");
        }
        gameLost()
        gameWon()
    }, 4000);

    setTimeout(() => {
        afterSpin()
    }, 5000)
}
