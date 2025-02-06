let feedbackData = {};
document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked')?.value || "";
    const productQuality = document.getElementById("product_quality").value;
    const comments = document.getElementById("comments").value;
    const name = document.getElementById("User_name").value;

    feedbackData = {
        name : name,
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
        comment : feedbackData["comments"],
        name : feedbackData["name"]
    }
    let {data,error} = await supabase
    .from("feedback")
    .insert([Fdata])

    if(error){
        console.log("Error submeting feedback: ",error);
    }
    else{
        console.log("Feedback saved to database")
        nextStep()
    }
}

function nextStep(){
    feedback.style.display = "none";
    document.querySelector(".feedbackSubmitted").style.display = "flex"
    document.querySelector(".failed").style.display = "none"
}