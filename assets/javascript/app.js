// The array of questions for our quiz game. The first answer is the correct one
let questions = [
    { q: "'Katniss Everdeen' takes her sister's place in the 'Hunger Games'. Which district does she represent?",
    a1: "12", a2: "6", a3: "3", a4: "7" },
    { q: "Where was American television presenter and tabloid talk show host Jerry Springer born?", 
        a1: "A subway", a2: "An ocean liner", a3: "A shopping mall", a4: "A plane" },
        { q: "Which planet in our solar system spins the fastest?", 
        a1: "Jupiter", a2: "Mercury", a3: "Neptune", a4: "Earth" },
        { q: "Which of the following James Bond films was the first to be released?", 
        a1: "From Russia With Love", a2: "You Only Live Twice", a3: "Thunderball", a4: "Goldfinger" },
        { q: "Useful for calculating internet speed and bandwidth, how many megabits are there in a megabyte?", 
        a1: "Eight", a2: "Six", a3: "Sixteen", a4: "Twelve" }
];

// array used to randomize answer appearance order
const sortingArray = [1,2,3,4]
const numberOfQuestions = questions.length
let currentQuestionIndex = -1
let wins = 0
let losses = 0
let unanswered = 0
//for timer
var intervalID  //will become settimeout object
let secondsCounter = 15

let displayQuestionsDiv = $("#displayQuestions");


//***************** EVENT LISTENERS HERE ************************************
$("#startButton").on("click", function() {
    startNewQuestion();
});


// Answer button click, check if correct, this is the way that worked for dynamically created buttons
$(document).on("click",".answer-button",function(event) {
    // Stop the timer
    clearInterval(intervalId);
    // console.log($(this))
    if (this["id"] === "a1") {
        wins++
        showRightAnswerDisplay()
    }
    else {
        // $(this).attr("class","col-12 btn btn-danger btn-lg btn-block mx-auto my-3 py-2 disabled")
        losses++
        showWrongAnswerDisplay("Nope!")
    }
});

$(document).on("click","#startOver",function(event) {
    currentQuestionIndex = -1;
    wins = 0;
    losses = 0;
    unanswered = 0;
    startNewQuestion();
});


//***************** FUNCTIONS HERE *************************************

//Shows correct answer then starts new question after delay
function showWrongAnswerDisplay(strType) {
    displayQuestionsDiv.empty()
    let newDiv = $("<div>");
    newDiv.html("<h1 class='text-center mb-4' id='rightOrWrong'>" + strType + "</h1>");
    displayQuestionsDiv.append(newDiv);
    newDiv = $("<div>");
    newDiv.html("<h3 class='text-center mb-4'>The correct answer is: " + questions[currentQuestionIndex].a1 + "</h3>");
    displayQuestionsDiv.append(newDiv)
    // display gif here 
    showGif()
    // delay before starting new question
    setTimeout(function() {
        startNewQuestion()
    }, 5000);
}

function showRightAnswerDisplay() {
    displayQuestionsDiv.empty()
    let newDiv = $("<div>");
    newDiv.html("<h1 class='text-center mb-4'>Good Job!!</h1>");
    displayQuestionsDiv.append(newDiv);
    // display gif here 
    showGif()
    setTimeout(function() {
        startNewQuestion()
    }, 5000);
}
    
function showGif() {
    newDiv = $("<div>");
    let qNumber = currentQuestionIndex+1
    newDiv.html("<img style='display: block; margin-left: auto; margin-right: auto;' src='./assets/images/q" + qNumber + "gif.gif'/>");
    displayQuestionsDiv.append(newDiv);
}

function startNewQuestion() {
    //  Make sure there are more questions, if not, game over
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length) {
        $("#displayQuestions").empty();
        
        // This is where you show All done, here's how you did: , correct answers, incorrect answers:, unanswered, Start over?
            let newDiv = $("<div>");
            newDiv.html("<h1 class='text-center mb-4' id='rightOrWrong'>All Done! Here's how you did:</h1>");
            displayQuestionsDiv.append(newDiv);
            newDiv = $("<div>");
            newDiv.html("<h3 class='text-center mb-1'>Correct answers: " + wins + "</h3>");
            displayQuestionsDiv.append(newDiv)
            newDiv = $("<div>");
            newDiv.html("<h3 class='text-center mb-1'>Incorrect answers: " + losses + "</h3>");
            displayQuestionsDiv.append(newDiv)
            newDiv = $("<div>");
            newDiv.html("<h3 class='text-center mb-1'>Unanswered: " + unanswered + "</h3>");
            displayQuestionsDiv.append(newDiv)
            // start over button
            newDiv = $("<div>");
            newDiv.attr("class","col-12 btn btn-info btn-lg btn-block mx-auto my-3 py-2");
            newDiv.attr("id","startOver")
            newDiv.text("Start Over");
            displayQuestionsDiv.append(newDiv)
            //step out of this function
            return
    }
                        
    // variable for loop to create answer buttons
    let answerNumber = ""
    // Get rid of the start button and old elements and add the elements for the display,
    // First the time remaining div, the question, then loop to create the answer buttons
    displayQuestionsDiv.empty()
    let newDiv = $("<div>");
    newDiv.html("<h1 class='text-center mb-4' id = 'timeRemainingText'>Time Remaining:  15</h1>");
    displayQuestionsDiv.append(newDiv);
    
    // Now assign new div with question info
    newDiv = $("<div>");
    newDiv.html("<h2 id = 'questionText' class = 'text-center mb-4'></h2>");
    displayQuestionsDiv.append(newDiv);
    $("#questionText").text(questions[currentQuestionIndex].q)
    
    // Randomize the order of the answers since first question in array is the correct answer, a1
    sortingArray.sort(function() {
        return 0.5 - Math.random();
    });
        
    // Create and append the answer buttons (bootstrap divs), give each the id of the answer so we know correct answer, a1 is correct answer
    for (let i = 0; i < 4; i++) {
        answerNumber = "a" + sortingArray[i]    
        newDiv = $("<div>");
        // button is full width since parent is col-8, allows for answer to fit in button
        newDiv.attr("class","col-12 btn btn-info btn-lg btn-block mx-auto my-3 py-2 answer-button");
        newDiv.attr("id",answerNumber)
        // newDiv.attr("onclick","answerBtnClick(" + answerNumber +")");
        newDiv.text(questions[currentQuestionIndex][answerNumber]);
        displayQuestionsDiv.append(newDiv)
    }
    secondsCounter = 15
    startTimer()
}

function startTimer() {
    // timer. when timer runs out it shows similar to wrong answer, but says Out of time!  
    intervalId = setInterval(function() {
        secondsCounter--
        $("#timeRemainingText").text("Time Remaining:  " + secondsCounter)
        if (secondsCounter === 0) {
            clearInterval(intervalId);
            unanswered++
            showWrongAnswerDisplay("Out of time!!")
        }
    }, 1000);
}


// This did not work for the dynamically created elements
// $("#a1").on("click", function() {
    //     // alert($(this).val())
//     // alert($(this).id())
//     alert("hello")
// });

