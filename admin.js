const adminLogin = document.querySelector(".admin-login");
const admin = document.querySelector(".admin");
const adminButton = document.getElementById("admin");
const loginButton = document.querySelector("#login-button");
const userName = "admin"
const password = "admin"
const allProducts = document.querySelectorAll(".product")
maxQuantitySnacks = 30
maxQuantityChoco = 30
maxQuantityJuice = 20

adminButton.addEventListener("click",()=>{
    main.style.display = "none"
    adminLogin.style.display = "flex"
})

loginButton.addEventListener("click", ()=>{
    const user = document.getElementById("username");
    const psd = document.getElementById("password");
    if(user.value === userName && psd.value === password){
        adminLogin.style.display = "none"
        admin.style.display = "flex"
        loadAdminControl();
        user.value = ""
        psd.value = ""
    }else{
        document.getElementById("login-feedback").textContent = "Username or Password is wrong"
    }
})

function loadAdminControl(){
    Object.keys(products).forEach((key) => {
        loadItem(key);
    });
}

function loadItem(i){
    let item = products[i]
    newItem = document.createElement("div")
    newItem.innerHTML = `<div class="visual">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="details">
                            <div class="quantity det">
                                <p>Quantity: </p>
                                <button id="minus"><i class="fa-solid fa-minus"></i></button>
                                <p id="quantity-num">${item.quantity}</p>
                                <button id="plus"> <i class="fa-solid fa-plus"></i> </button>
                            </div>
                            <div class="price-change det">
                                <p>Price: ₹</p>
                                <input type="number" name="price" id="price-change" value="${item.price}">
                            </div>
                            <div class="image-change det">
                                <p>Image: </p>
                                <input type="text" class="image-link" name="imageLink" id="${i}" placeholder="New image link here">
                            </div>
                            <button id="save">SAVE</button>
                        </div>
                        `
    if(item.quantity === 0){
        newItem.style.backgroundColor = "#cc0000"
    }
    newItem.classList.add("product-cont")
    newItem.classList.add(i)
    admin.appendChild(newItem)
    const hr = document.createElement("hr")
    hr.classList.add("adminHR")
    admin.appendChild(hr)
    handleOperations(newItem)
}
// Handeling all the operations inside each product admin control
function handleOperations(product){
    const plus = product.querySelector("#plus")
    const minus = product.querySelector("#minus")
    const save = product.querySelector("#save")
    const quant = product.querySelector("#quantity-num")
    const image = product.querySelector(".visual").querySelector("img")
    
    plus.addEventListener("click", ()=>{
        if(parseInt(quant.textContent )>=20){
            if ([...product.classList].some(className => className.includes("juice"))) {
                alert("Max Limit Reached")
                return
            }
            if(parseInt(quant.textContent) >= 30){
                alert("Max Limit Reached")
                return
            }
        }
        quant.textContent = parseInt(quant.textContent) + 1
    })

    minus.addEventListener("click",()=>{
        if(parseInt(quant.textContent) == 0){
            alert("How can it be negative 😕")
            return
        }
        quant.textContent = parseInt(quant.textContent) - 1
    })
    // Saves all the changes
    save.addEventListener("click", ()=>{
        let quantity = parseInt(quant.textContent)
        let imagePath = product.querySelector("#"+product.classList[1]).value
        let testImage = new Image();
        let price = product.querySelector("#price-change").value
        let oldImagePath = image.src

        if(imagePath.length > 0){
            testImage.onload = function (){
                image.setAttribute("src", imagePath);
                console.log("Image link working.");
                proceedWithSave(price,quantity,imagePath,product.classList[1])
                reloadMachineProduct(product.classList[1], imagePath, price)
            }
            testImage.onerror = function () {
                alert("Image link dosen't worked. Didn't saved data. Please Try Again")
                console.log("Image link not working, reverted to old image.");
            };
            testImage.setAttribute("src", imagePath)
        }else{
            proceedWithSave(price,quantity,oldImagePath,product.classList[1])
            reloadMachineProduct(product.classList[1], oldImagePath, price)
        }
    })
}
// Saves everything in localStroage
function proceedWithSave(price,quantity,imagePath,id){
    products[id].image = imagePath
    products[id].quantity = quantity
    products[id].price = price
    localStorage.setItem("product", JSON.stringify(products));
    alert("Changes saved")
    const x = productContainer.querySelector("."+id)
    console.log(x)
}
// Logs out from admin controls
document.querySelector(".logOut").addEventListener("click",()=>{
    admin.style.display = "none"
    main.style.display = "flex"
    document.querySelectorAll(".product-cont").forEach((item)=>{
        item.remove()
    })
    document.querySelectorAll(".adminHR").forEach((item)=>{
        item.remove()
    })
})
// Reflects the changes immediately on the machine
function reloadMachineProduct(id,img,price){
    allProducts.forEach((prod)=>{
        if(prod.classList.contains(id)){
            prod.querySelector("img").setAttribute("src", img)
            prod.querySelector("#price").textContent = "₹ "+price+".00"
        }
    })
}