const pay = document.querySelector("#pay");
const cancel = document.querySelector("#cancel");
const submit = document.querySelector("#submit");
const thanksScreen = document.querySelector(".completed");
const main = document.querySelector(".container");
const timer = document.querySelector(".timer");
const failed = document.querySelector(".failed")

const urlParams = new URLSearchParams(window.location.search);
const sessionID = urlParams.get("id");

pay.addEventListener("click", paymentSucess);
cancel.addEventListener("click", paymentCanceled);

// SUPABASE initialization

const SUPABASE_URL = "https://wqlhcbqycjhrkewmpmmr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbGhjYnF5Y2pocmtld21wbW1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgyNjYxNywiZXhwIjoyMDU0NDAyNjE3fQ.85Y8f7Qcl7gS9NSWuRTkkag4MSwD1c_rTlOglASSwtU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

//Fetches the data from supabase using session ID
let data = [];
let cart_data = [];
let total_amount = 0;
let createdAt = ""

async function fetchDataById(id) {
  const { data, error } = await supabase
    .from("PaymentSystem")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  } else {
    console.log("Fetched Data:", data);
    return data;
  }
}

fetchDataById(sessionID).then((res) => {
  if (res) {
    data = res[0];
    total_amount = data["total_amount"]
    cart_data = data["cart_data"];
    createdAt = data["created_at"]
    loadTimer();
    loadCart();
  }
});

function loadTimer(){
    const createdAtDate = new Date(createdAt);
    const endTime = new Date(createdAtDate.getTime() + 2 * 60 * 1000);
    const timerElement = document.getElementById("timer");
  
    const updateTimer = () => {
      const now = new Date();
      const timeLeft = endTime - now;  // Time remaining in milliseconds
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);  // Stop the interval when the timer reaches 0
        timerElement.innerHTML = "00:00";
        console.log("timer ended");
        paymentCanceled();
      } else {
        const minutes = Math.floor(timeLeft / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        // Format time as MM:SS
        const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerElement.innerHTML = formattedTime;
      }
    };

    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);
    // Initialize the first update
    updateTimer();
}


function loadCart(){
    cart_data.forEach((cartItem)=>{
        makeCartElement(cartItem.imageLink, cartItem.name, cartItem.price, cartItem.quantity)
    })
    document.querySelector("#number").textContent = total_amount
}

function makeCartElement(imageLink, name, price, quant){
    const cart = document.querySelector(".cart");
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<div class="visual">
                    <img src="${imageLink}" alt="">
                </div>
                <div class="details">
                    <p id="name">${name}</p>
                    <p id="price">₹${price}x${quant}=₹${price*quant}.00</p> 
                </div>`
    cart.appendChild(item)
}

function paymentCanceled(){
    updateOrderStatus(sessionID, "failed");
    main.style.display = "none";
    failed.style.display = "flex";
    timer.style.display = "none";
    // alert("payment failed")
    console.log("Payment failed")
}

function paymentSucess(){
    updateOrderStatus(sessionID, "completed");
    main.style.display = "none";
    thanksScreen.style.display = "flex";
    timer.style.display = "none";
}

async function updateOrderStatus(id, newStatus) {
    const { data, error } = await supabase
      .from("PaymentSystem")  // Replace with your table name
      .update({ status: newStatus })  // Update the 'status' column to the new value
      .eq("id", id);  // Filter by the given id
  
    if (error) {
      console.error("Error updating status:", error);
      return null;
    } else {
      console.log("Order status updated:", data);
      return data;  // Return the updated data
    }
  }