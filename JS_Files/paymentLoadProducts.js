// import { createClient } from 'jsr:@supabase/supabase-js@2'
// Initialize Supabase

const SUPABASE_URL = "https://wqlhcbqycjhrkewmpmmr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbGhjYnF5Y2pocmtld21wbW1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgyNjYxNywiZXhwIjoyMDU0NDAyNjE3fQ.85Y8f7Qcl7gS9NSWuRTkkag4MSwD1c_rTlOglASSwtU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
  }
}

async function fetchOrders() {
  let { data, error } = await supabase
    .from("vending-machine-database")
    .select("*");

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Fetched Orders:", data);
  }
}

