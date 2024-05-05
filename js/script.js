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