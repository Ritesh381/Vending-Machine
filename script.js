// Making the geid of vending machine
const productContainer = document.querySelector('.product-container');
const img = "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTgGIV8N6Ra8O1NwpDMMEzzFwV6tHeogzpT2nv0Ajui13SIC1FvjOMaFntWeoIQ7zvFO6tyz_D3CaLoEf16pQpcDHQUUworQinoVmDTd9D16aiOzM876T1W"

// Get items from localStorage
let products = JSON.parse(localStorage.getItem('product')); 
if (products) { 
    console.log(products); 
}else{ 
    console.log("No products found in localStorage, importing from data.json"); 
    fetch("data.json") 
    .then(response => response.json()) 
    .then(fetchedProducts => { 
        products = fetchedProducts; 
        // Save the products in localStorage 
        localStorage.setItem('product', JSON.stringify(products)); 
    }) 
    .catch(error => { 
        console.error('Error loading the file:', error); 
    }); 
} 
// Displaying the products in vending machine grid 
Object.keys(products).forEach((key) => { 
    const product = products[key]; 
    makeProduct(key, product.price, product.image, product.quantity); 
}); 
let empty = 24 - Object.keys(products).length; 
for (let i = 0; i < empty; i++) { 
    makeProduct("", "0", ""); 
}

function makeProduct(id, price, image) {
    const productTemplate = `
    <img src="${image}" alt="empty">
    <p id="price">₹ ${price}.00</p>
    `;
    const newItem = document.createElement("div");
    newItem.classList.add("product");
    newItem.classList.add(id);
    newItem.innerHTML = productTemplate;
    productContainer.appendChild(newItem);
    handleCart(newItem);
}
// Handeling Cart

const cart = document.querySelector(".cart");
let cartList = [];
let cartValue = 0;
function handleCart(product) {
    product.addEventListener("click", () => {
        console.log(product);
        let prodId = product.classList[1];
        cartList.push(prodId);
        console.log(cartList);

        quantityCheck(product)

        if (cartList.length > 0) {
            document.querySelector("#empty").textContent = "";
        }
    });
}
// Make and append into the cart
function makeCartItem(image, price, id, quantity) {
    if(quantity>1){
        const item = cart.querySelector("."+id);
        const counter = item.querySelector(".counter");
        counter.textContent = quantity;
        return
    }
    const newCartItem = document.createElement("div");
    newCartItem.classList.add("cart-item");
    newCartItem.classList.add(id);
    newCartItem.innerHTML = `
    <div class="photo">
        <img src="${image}" alt="Product Image">
    </div>
    <hr>
    <p id="cart-price">₹ ${price}.00</p>
    <div class="counter">${quantity}</div>
    <div class="remove"><i class="fas fa-window-close"></i></div>
    `;
    cart.appendChild(newCartItem);
    handleRemoval(newCartItem);
}
// If cross button is clicked the item from cart is removed
function handleRemoval(product){
    product.querySelector(".remove").addEventListener("click",()=>{
        let target = product.classList[1];
        while (cartList.includes(target)) {
            let index = cartList.indexOf(target);
            cartValue -= products[target].price;
            cartList.splice(index, 1);
        }
        console.log(cartList)
        console.log(cartValue)

        updatePrice("0");
        product.remove();
    })
}
// To keep track of the price
function updatePrice(price) {
    cartValue += parseInt(price);
    document.querySelector("#cost").textContent = "₹ " + cartValue + ".00";
    document.querySelector("#total").textContent = "₹ " + cartValue + ".00";
    let gst = cartValue * 0.08;
    gst = gst.toFixed(2);
    document.querySelector("#gst").textContent = "₹ " + gst;
    document.querySelector("#discount").textContent = "-₹ " + gst;
}
// Handeling cart items quantity and the counter
function quantityCheck(product){
    let prodId = product.classList[1];

    if (products[prodId]) {
        const prod = products[prodId];
        const prodImg = prod.image;
        const prodPrice = prod.price;
        let freq = 0;
        cartList.forEach((i)=>{
            if(i == prodId) freq++;
        })
        // Check if we have it in stock?
        let inStock = parseInt(prod.quantity);
        if(freq>inStock) {
            alert("Sorry We ran out of stock :("); 
            cartList.splice(cartList.indexOf(prodId),1)
            return;
        }
        else if(freq==1) makeCartItem(prodImg, prodPrice, prodId, freq);
        else makeCartItem(prodImg, prodPrice, prodId, freq);
        updatePrice(prod.price);
    }
}