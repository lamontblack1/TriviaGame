
$("#startButton").on("click", function() {
    addDivs();
    alert("hello");
});

function addDivs() {
// Get rid of the start button and add the elements for the display,
// First the time remaining div, the question, then loop to create the answer buttons
 $("#startButton").empty();
 let newDiv = $("<div>");
 let displayQuestionsDiv = $("#displayQuestions");
 newDiv.attr("id","timeRemainingDiv");
 newDiv.html("<p class="text-center"><h2>Time Remaining: </h2></p>");
 displayQuestionsDiv.append(newDiv);

 for (let i = 0; i < 5; i++) {
     let newDiv = $("<div>");
     newDiv.attr("class","col-8 btn btn-lg btn-block mx-auto py-5");
     newDiv.text("Button " + i);
     
 }
}

