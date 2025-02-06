const pay = document.querySelector("#pay")
const submit = document.querySelector("#submit")
const thanksScreen = document.querySelector(".completed")
const main = document.querySelector(".container")

const urlParams = new URLSearchParams(window.location.search);
const totalAmount = urlParams.get('total');

if (totalAmount) {
    document.getElementById('number').textContent = `${totalAmount}`;
}

// 
pay.addEventListener('click', () => {
    main.style.display = "none";
    thanksScreen.style.display = "flex";
});




// Loading 

