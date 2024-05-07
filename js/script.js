// Global variables
let currentMoney = 100;
let wager5 = 5;
let wager10 = 10;
let wager15 = 15;
let wager20 = 20;
let wager25 = 25;
let wager100 = 100;

const moneyDisplay = document.getElementById("money-display");
moneyDisplay.innerText = `$${currentMoney}`;

const confirmButton = document.getElementById("confirm-button");
confirmButton.disabled = true;

const slotButton = document.getElementById("coin-slot")
slotButton.disabled = true;

const lever = document.getElementById("lever")
lever.style.pointerEvents = "none";

const fiveButton = document.getElementById("5DollarButton");
const tenButton = document.getElementById("10DollarButton");
const fifteenButton = document.getElementById("15DollarButton");
const twentyButton = document.getElementById("20DollarButton");
const twentyFiveButton = document.getElementById("25DollarButton");
const oneHundredButton = document.getElementById("100DollarButton");

function pauseButtons(){
    fiveButton.disabled = true;
    tenButton.disabled = true;
    fifteenButton.disabled = true;
    twentyButton.disabled = true;
    twentyFiveButton.disabled = true;
    oneHundredButton.disabled = true;
}

fiveButton.addEventListener("click", function () {
    buttonHandler(wager5);
});
tenButton.addEventListener("click", function () {
    buttonHandler(wager10);
});
fifteenButton.addEventListener("click", function () {
    buttonHandler(wager15);
});
twentyButton.addEventListener("click", function () {
    buttonHandler(wager20);
});
twentyFiveButton.addEventListener("click", function () {
    buttonHandler(wager25);
});
oneHundredButton.addEventListener("click", function () {
    buttonHandler(wager100);
});

function buttonHandler(wager) {
    selectedWager = wager
    if (currentMoney >= selectedWager) {
        confirmButton.disabled = false; 
    } else {
        alert(`Not enough money to wager $${selectedWager} dollars, you currently have $${currentMoney}`);
        // CHANGE THIS TO AN ACTUAL NICE LOOKING ALERT! ^
    }
    confirmButton.addEventListener("click", function(){
        currentMoney -= selectedWager;
        moneyDisplay.innerText = `$${currentMoney}`;
        slotButton.disabled = false;
        confirmButton.disabled = true;
        pauseButtons()
        selectedWager = 0
    })
}

lever.addEventListener("click", function(){
    document.getElementById("lever").style.display = "none";
    document.getElementById("pulledlever").style.display = "flex";
    
    setInterval(() => {
    document.getElementById("lever").style.display = "flex";
    document.getElementById("pulledlever").style.display = "none";
    }, 300)
   })

slotButton.addEventListener("click", function(){
    lever.style.pointerEvents = "auto";
})


/* 

update document.get for when u make the lever and make each slot display different fruits when it spins, just + 1 index and change the emojis

const arr = ["🍒", "🍇", "🍉", "☀️", "👽", "🕹️"];
const symbolsGet = document.querySelectorAll('.slot-symbol');

document.getElementById("button").addEventListener("click", spin);

function spin() {
  symbolsGet.forEach((symbolGet) => {
    let currentIndex = 0;
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomEmoji = arr[randomIndex];

    
    const interval = setInterval(() => {
      symbolGet.innerText = arr[currentIndex];
      currentIndex++;
      if (currentIndex === arr.length) {
        currentIndex = 0;
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      symbolGet.innerText = randomEmoji;
    }, 3000);
  });
} 


*/

// three seperate functions - CAROUSEL FOR THE ITEMS