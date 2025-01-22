// Getting items from PUSH area

const pushArea = document.querySelector(".push");
const collect = document.querySelector(".collect");
const first = document.querySelector(".first").querySelector("img");
const second = document.querySelector(".second").querySelector("img");
const pushText = pushArea.querySelector("p");
let cartOn = false;

function handlePushClick() {
  if (cartOn) {
    return;
  }
  cartOn = true;
  first.style.display = "block";
  second.style.display = "block";
  let i = 2;
  let firstbool = true;
  let secondbool = true;

  pushText.style.display = "none";
  collect.style.display = "flex";
  let n = cartList.length;
  console.log(n, cartList.length)

  first.src = products[cartList[0]].image; // First image

  if (n > 1 && products[cartList[1]]) {
    second.src = products[cartList[1]].image; // Second image
  } else {
    secondbool = false;
  }

  first.addEventListener("click", (e) => {
    n = cartList.length;
    console.log("n: "+ n)
    e.stopPropagation();
    if (i < n && products[cartList[i]]) {
      first.src = products[cartList[i]].image;
      i++;
    } else {
      first.style.display = "none";
      first.src = "";
      firstbool = false;
      if (!secondbool) {
        console.log(cartList, secondbool, firstbool, products[cartList[i]], i, n)
        closePush();
      }
    }
  });

  second.addEventListener("click", (e) => {
      e.stopPropagation();
      n = cartList.length;
    if (i < n && products[cartList[i]]) {
      second.src = products[cartList[i]].image;
      i++;
    } else {
      second.style.display = "none";
      second.src = ""
      secondbool = false;
      if (!firstbool) {
        console.log(cartList, secondbool, firstbool, products[cartList[i]], i, n)
        closePush();
      }
    }
  });
}


function emptyCart() {
    console.log(cartList, products);
    pushArea.addEventListener("click", handlePushClick);
}

function closePush() {
    i=2
    cartOn = false;
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
  resetTimer();parseInt
  pushArea.removeEventListener("click", handlePushClick)
}




// There is some problem with n in handlePushClick() debug that

// Whats next
// Fix the bug which arises when we try to buy more than 1 time 
// Add some delay when the items are purchased (It instantly switches screens)
// If a item and added and then removed from cart the messages disappears Fix that
// Detuct the quantity of the item when the purchase is successful
// Disable the eventListeners of the items when in payment mode
// Add the QR code and try the backend thing
// Add a button which with password fills the quantity of items in vending machine
// Work on good UI
// Add some animations
// Add a screensaver on the screen and when clicked everything turns on, when inactivity the screensaver turns on
