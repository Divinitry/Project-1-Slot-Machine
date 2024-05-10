// Global variables
let currentMoney = 100;
let wager5 = 5;
let wager10 = 10;
let wager15 = 15;
let wager20 = 20;
let wager25 = 25;
let wager30 = 30;

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
const thirtyButton = document.getElementById("30DollarButton");

function pauseButtons(){
    fiveButton.disabled = true;
    tenButton.disabled = true;
    fifteenButton.disabled = true;
    twentyButton.disabled = true;
    twentyFiveButton.disabled = true;
    thirtyButton.disabled = true;
}

// --------------------------- Logic for picking money and enabling/disabling buttons ---------------------------

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
thirtyButton.addEventListener("click", function () {
    buttonHandler(wager30);
});

let selectedWager;
let confirmedWager;

function buttonHandler(wager) {
    selectedWager = wager;
    if (currentMoney >= selectedWager) {
        confirmButton.disabled = false;
    } else {
        alert(`Not enough money to wager $${selectedWager} dollars, you currently have $${currentMoney}`);
        // CHANGE THIS TO AN ACTUAL NICE LOOKING ALERT! ^
    }
}

confirmButton.addEventListener("click", function(){
    if (selectedWager !== undefined) {
        currentMoney -= selectedWager;
        moneyDisplay.innerText = `$${currentMoney}`;
        slotButton.disabled = false;
        confirmButton.disabled = true;
        pauseButtons();
        confirmedWager = selectedWager;
    } 
});

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

// --------------------------- Logic for slot spin ---------------------------

document.getElementById("lever").addEventListener("click", spin); 

const columnArrays = [
//   ["🍒", "🍇", "🍉", "☀️", "👽", "🕹️"],
//   ["🍇", "🍒", "☀️", "🍉", "🕹️", "👽"],
//   ["☀️", "🍇", "👽", "🍒", "🕹️", "🍉"]

  ["☀️","☀️","☀️","☀️","☀️","☀️"],
  ["☀️","☀️","☀️","☀️","☀️","☀️"],
  ["☀️","☀️","☀️","☀️","☀️","☀️"]
];

const multipliers = {
    "🍒" : 1,
    "🍇" : 1.5,
    "🍉" : 2,
    "☀️" : 5,
    "👽" : 2.5,
    "🕹️" : 3,
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
    let numMatching = 0;


    if (results[0] === results[1] && results[0] === results[2]) {
        matchedEmoji = results[0];
        multiplierValue = multipliers[matchedEmoji]
        if (results[0] === "☀️"){
            currentMoney = (currentMoney + confirmedWager * multiplierValue) * 4
        } else {
            currentMoney = (currentMoney + confirmedWager * multiplierValue) * 2
        }
        moneyDisplay.innerText = `$${currentMoney}`;
    } else if (results[0] === results[1]) {
        matchedEmoji = results[0];
        multiplierValue = multipliers[matchedEmoji]
        currentMoney = currentMoney + confirmedWager * multiplierValue
        moneyDisplay.innerText = `$${currentMoney}`;
    } else if (results[0] === results[2]) {
        matchedEmoji = results[0];
        multiplierValue = multipliers[matchedEmoji]
        currentMoney = currentMoney + confirmedWager * multiplierValue
        moneyDisplay.innerText = `$${currentMoney}`;
    } else if (results[1] === results[2]) {
        matchedEmoji = results[1];
        multiplierValue = multipliers[matchedEmoji]
        currentMoney = currentMoney + confirmedWager * multiplierValue
        moneyDisplay.innerText = `$${currentMoney}`;
    }

    if (matchedEmoji) {

        multiplierValue = multipliers[matchedEmoji];
        console.log(`Multiplier value for ${matchedEmoji} is: ${multiplierValue}`);
    } else {
        console.log("No matching emoji found in the results.");
    }
}, 4000);
}




