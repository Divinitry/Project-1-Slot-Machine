// Global variables
let currentMoney = 100;
let betAmount = 0;

const betOneButton = document.getElementById("betOneButton");
const betTwoButton = document.getElementById("betTwoButton");
const betThreeButton = document.getElementById("betThreeButton");

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
    if (currentMoney < 1){
        // Have an alert here that tells the player they lost
        setTimeout(() => {
            location.reload()
        }, 3000)
    }
}
function gameWon() {
    if (currentMoney === 1500){
        // have an alert to tell the player they won with animations
        // Maybe have a prompt asking if they want to continue and see if they can get as much money as possible
        /* if (playerChoice = no){
            setTimout(() => {
                location.Reload
            }2000)
        } else{
            alert "good luck"
        }
        */
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
    moneyDisplay.innerText = `$${currentMoney}`;
}
function updateBetAmount(amount) {
    if(betAmount + amount <= currentMoney){
        betAmount += amount;
        betDisplay.innerText = betAmount;
        updateButtons();
    }else if(betAmount += amount > currentMoney){
        alert("not enough money")
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

slotButton.addEventListener("click", function(){
    lever.style.pointerEvents = "auto";
})

lever.addEventListener("click", function(){
    document.getElementById("lever").style.display = "none";
    document.getElementById("pulledlever").style.display = "flex";
    
    setInterval(() => {
    document.getElementById("lever").style.display = "flex";
    document.getElementById("pulledlever").style.display = "none";
    }, 300)

    setTimeout(() => {
        lever.style.pointerEvents = "none";
    },1000)
   })

// --------------------------- Logic for slot spin ---------------------------

document.getElementById("lever").addEventListener("click", spin); 

const columnArrays = [
  ["🍒", "🍇", "🍉", "💎", "🍎", "🌶️"],
  ["🍇", "🍒", "💎", "🍉", "🌶️", "🍎"],
  ["💎", "🍇", "🍎", "🍒", "🌶️", "🍉"]

//        To test jackpot 
// ["💎","💎","💎","💎","💎","💎"],
// ["💎","💎","💎","💎","💎","💎"],
// ["💎","💎","💎","💎","💎","💎"]

// ["🍒","🍒","🍒","🍒","🍒","🍒"],
// ["🍒","🍒","🍒","🍒","🍒","🍒"],
// ["🍒","🍒","🍒","🍒","🍒","🍒"]
];

const multipliers = {
    "🍒" : 1,
    "🍇" : 1.5,
    "🍉" : 2,
    "💎" : 5,
    "🍎" : 2.5,
    "🌶️" : 3,
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
      column[1].innerText = columnArrays[index][currentIndex]; 
      column[0].innerText = columnArrays[index][(currentIndex - 1 + columnArrays[index].length) % columnArrays[index].length]; 
      column[2].innerText = columnArrays[index][(currentIndex + 1) % columnArrays[index].length]; 
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const currentIndex = Math.floor(Math.random() * columnArrays[index].length);
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
        moneyDisplay.innerText = `$${currentMoney}`;
    };

    if (results[0] === results[1] && results[0] === results[2]) {
        if(results[0] === "💎"){
            matchedEmoji = results[0];
            multiplierValue = multipliers[matchedEmoji];
            currentMoney += (betAmount * multiplierValue) * 4;
            moneyDisplay.innerText = `$${currentMoney}`;
        }else {
            matchedEmoji = results[0];
            multiplierValue = multipliers[matchedEmoji];
            currentMoney += (betAmount * multiplierValue) * 2;
            moneyDisplay.innerText = `$${currentMoney}`;
        }
    } else if (results[0] === results[1]) {
        handleMatchingResults(0);
    } else if (results[0] === results[2]) {
        handleMatchingResults(0);
    } else if (results[1] === results[2]) {
        handleMatchingResults(1);
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

setTimeout(() =>{
    afterSpin()
}, 5000)
}
