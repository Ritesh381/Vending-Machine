const pay = document.querySelector("#pay");
const payment = document.querySelector(".payment");
const paymentSuccess = document.querySelector(".payment-success");
const paymentFailed = document.querySelector(".payment-failed");
const main = document.querySelector(".default")
const cancel = document.querySelector("#cancel")
const mainMenu = document.querySelectorAll(".main-menu")
const tryAgain = document.querySelector(".try-again")

pay.addEventListener("click",()=>{
    if(cartValue > 0){
        main.style.display = "none"
        payment.style.display = "flex";
        paymentSuccess.style.display = "none";
        paymentFailed.style.display = "none";
    }
})
cancel.addEventListener("click", ()=>{
    main.style.display = "none"
    payment.style.display = "none";
    paymentSuccess.style.display = "none";
    paymentFailed.style.display = "flex";
})
tryAgain.addEventListener("click", ()=>{
    main.style.display = "none"
    payment.style.display = "flex";
    paymentSuccess.style.display = "none";
    paymentFailed.style.display = "none";
})
mainMenu.forEach((butt)=>{
    butt.addEventListener("click", ()=>{
        main.style.display = "flex"
        payment.style.display = "none";
        paymentSuccess.style.display = "none";
        paymentFailed.style.display = "none";
    })
})


// let data = 
// localStorage.setItem("product", JSON.stringify(data))