let feedbackData = {};
document.getElementById("submit").addEventListener("click", function (event) {
    console.log("heh")
    event.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked')?.value || "";
    const productQuality = document.getElementById("product_quality").value;
    const comments = document.getElementById("comments").value;
    
    feedbackData = {
        rating: rating,
        productQuality: productQuality,
        comments: comments
    };
    saveFeedbackToSupabase()
});

async function saveFeedbackToSupabase(){
    let Fdata = {
        satisfaction : feedbackData["rating"],
        quality : feedbackData["productQuality"],
        comment : feedbackData["comments"]
    }
    let {data,error} = await supabase
    .from("feedback")
    .insert([Fdata])

    if(error){
        console.log("Error submeting feedback: ",error);
    }
    else{
        console.log("Feedback saved to database")
    }
}
