const pushArea = document.querySelector(".push");
const collect = document.querySelector(".collect");
const pushText = pushArea.querySelector("p");
const collectProduct = collect.querySelector("img");
let cartOn = false;
let i = 0;

function emptyCart() {
  console.log(cartList, products);
  pushArea.addEventListener("click", handlePushClick);
}

function handlePushClick() {
  if (cartOn) {
    return;
  }
  cartOn = true;
  pushText.style.display = "none";
  collect.style.display = "flex";
  i = 0;
  collectProduct.setAttribute("src", products[cartList[i]].image);
  i++;
  collect.removeEventListener("click", handleCollectClick);
  collect.addEventListener("click", handleCollectClick);
}

function handleCollectClick(e) {
  e.stopPropagation();
  let n = cartList.length;
  if (i >= n) {
    setTimeout(closePush, 501);
  }
  // Expand and fade animation
  collectProduct.classList.add("expand-fade");
  setTimeout(() => {
    collectProduct.classList.remove("expand-fade");
    if (i < n) {
      collectProduct.setAttribute("src", products[cartList[i]].image);
      i++;
    }
  }, 500);
}

function closePush() {
  cartOn = false;
  collect.style.display = "none";
  pushText.style.display = "block";
  // Deduct items from localStroage products as they are purchased
  cartList.forEach((i)=>{
    products[i].quantity--;
  })
  localStorage.setItem('product', JSON.stringify(products)); 

  cartList = [];
  cartValue = 0;
  document.querySelectorAll(".cart-item").forEach((item) => {
    item.remove();
  });
  updatePrice("0");
  main.style.display = "flex";
  paymentSuccess.style.display = "none";
  document.querySelector("#empty").textContent =
    "Cart Empty Add Items by clicking on items";
  resetTimer();
  parseInt;
  pushArea.removeEventListener("click", handlePushClick);
  checkoutPage = false
}
