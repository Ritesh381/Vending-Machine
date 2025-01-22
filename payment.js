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