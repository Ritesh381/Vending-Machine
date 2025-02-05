const pay = document.querySelector("#pay")
const submit = document.querySelector("#submit")
const thanksScreen = document.querySelector(".completed")
const main = document.querySelector(".container")

pay.addEventListener("click", ()=>{
    main.style.display = "none"
    thanksScreen.style.display = "flex"
})