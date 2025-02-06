const SUPABASE_URL = "https://wqlhcbqycjhrkewmpmmr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbGhjYnF5Y2pocmtld21wbW1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgyNjYxNywiZXhwIjoyMDU0NDAyNjE3fQ.85Y8f7Qcl7gS9NSWuRTkkag4MSwD1c_rTlOglASSwtU";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let sessionID = ""

async function insertOrder(cartvalue, dat) {
    let newOrder = {
        status: "pending",
        cart_data: dat,
        total_amount: cartvalue,
    };
    
  let { data, error } = await supabase
    .from("PaymentSystem")
    .insert([newOrder])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Inserted Order:", data);
    sessionID = data[0]["id"]
    console.log("Session ID: "+sessionID)   

    // Generating the qr code with session id as query of it
    let qrCode = new QRCode(qr, {
        text: "https://thesnackpoint.netlify.app/payment.html?total="+cartValue+"&id="+sessionID,
        width: 200,
        height: 200
    });
    continueWithPayment(sessionID)
  }
}

function saveToSupabase(){
    let productData = []
    let quant ={}
    cartList.forEach((id)=>{
        quant[id] = quant[id] ? quant[id] + 1 : 1;
    })
    new Set(cartList).forEach((id)=>{
        let dataJson = {
            "name" : products[id].name,
            "price" : products[id].price,
            "quantity" : quant[id],
            "imageLink" : products[id].image
        }
        productData.push(dataJson)
    })
    console.log("Sending to supabase:"+ productData)
    insertOrder(cartValue,productData)
}


// Checking every 3 seconds if the payment is completed

let statusCheckInterval;

async function checkOrderStatus(sessionID) {
    if (statusCheckInterval) {
        clearInterval(statusCheckInterval); // Stop any existing interval if it's running
    }

    statusCheckInterval = setInterval(async () => {
        let { data, error } = await supabase
            .from('PaymentSystem')
            .select('status')
            .eq('id', sessionID)
            .single();

        if (error) {
            console.error("Error fetching order status:", error);
            clearInterval(statusCheckInterval); // Stop the interval if there's an error
        } else {
            console.log("Current status:", data.status);

            if (data.status !== 'pending') {
                console.log("Order status has changed to:", data.status);
                clearInterval(statusCheckInterval);
                if(data.status == "completed"){
                    successScreen();
                    emptyCart();
                }else{
                    failedScreen()
                }
            }
        }
    }, 3000); // Check every 3 seconds
}




function continueWithPayment(session){
    checkOrderStatus(session)
}