const pay = document.querySelector("#pay");
const payment = document.querySelector(".payment");
const paymentSuccess = document.querySelector(".payment-success");
const paymentFailed = document.querySelector(".payment-failed");
const main = document.querySelector(".default");
const cancel = document.querySelector("#cancel");
const mainMenu = document.querySelector(".main-menu");
const tryAgain = document.querySelector(".try-again");
const money = document.querySelector("#money");

pay.addEventListener("click", () => {
  if (cartValue > 0) {
    money.textContent = "₹ " + cartValue + ".00";
    paymentScreen();
  }
});

cancel.addEventListener("click", failedScreen);

tryAgain.addEventListener("click", paymentScreen);

mainMenu.addEventListener("click", () => {
  main.style.display = "flex";
  payment.style.display = "none";
  paymentSuccess.style.display = "none";
  paymentFailed.style.display = "none";
  document.querySelector("#empty").textContent =
    "Cart Empty Add Items by clicking on them";
  resetTimer();
});

function paymentScreen() {
  main.style.display = "none";
  payment.style.display = "flex";
  paymentSuccess.style.display = "none";
  paymentFailed.style.display = "none";
  startTimer();
}

function successScreen() {
  main.style.display = "none";
  payment.style.display = "none";
  paymentSuccess.style.display = "flex";
  paymentFailed.style.display = "none";
  resetTimer();
}

function failedScreen() {
  main.style.display = "none";
  payment.style.display = "none";
  paymentSuccess.style.display = "none";
  paymentFailed.style.display = "flex";
  resetTimer();
}

// 2 min timer for paying and proceding
// Starts when PAY is clicked
// Stopped when the payemnt is completed(Get response OK from API) , (Currently when the QR is cliked the timer stops and resets)
// If cliked Cancel the timer stops and resets

let timerInterval;
let remainingTime = 120;

const qr = document.querySelector(".QR");
const timer = document.querySelector("#timer");

// Format seconds to MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Update the timer display
function updateTimerDisplay() {
  timer.textContent = formatTime(remainingTime);
}

// Start the timer
function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals
  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay();
    } else {
      failedScreen();
    }
  }, 1000);
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = 120;
  updateTimerDisplay();
}

// Getting request that payment completed

// Currently using QR click as OK response but later will be replaced by phone authentication

qr.addEventListener("click", () => {
  successScreen();
  emptyCart();
});

// Getting items from PUSH area

const pushArea = document.querySelector(".push");
const collect = document.querySelector(".collect");
const first = document.querySelector(".first").querySelector("img");
const second = document.querySelector(".second").querySelector("img");
const pushText = pushArea.querySelector("p");

function emptyCart() {
  let i = 2;
  let firstbool = true;
  let secondbool = true;
  console.log(cartList);
  pushArea.addEventListener("click", () => {
    pushText.style.display = "none";
    collect.style.display = "flex";
    let n = cartList.length;

    first.src = products[cartList[0]].image; // First image
    if (n > 1) second.src = products[cartList[1]].image; // Second image
    else{
      secondbool = false;
    }
    // Handle clicks on the first image
    first.addEventListener("click", (e) => {
      e.stopPropagation();
      if (i < n) {
        first.src = products[cartList[i]].image;
        i++;
      } else {
        first.src = "";
        firstbool = false;
        if (!secondbool) {
          closePush();
        }
      }
    });

    // Handle clicks on the second image
    second.addEventListener("click", (e) => {
      e.stopPropagation();
      if (i < n) {
        second.src = products[cartList[i]].image;
        i++;
      } else {
        second.src = "";
        secondbool = false;
        // console.log(second.src)
        if (!firstbool) {
          closePush(); // Check if both are cleared
        }
      }
    });
  });
}

function closePush() {
  collect.style.display = "none";
  pushText.style.display = "block";
  cartList = [];
  cartValue = 0;
  document.querySelectorAll(".cart-item").forEach((item)=>{
    item.remove();
  })
  updatePrice("0")
  main.style.display = "flex";
  paymentSuccess.style.display = "none";
  document.querySelector("#empty").textContent =
    "Cart Empty Add Items by clicking on them";
  resetTimer();
}
