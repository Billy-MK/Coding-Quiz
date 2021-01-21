var startButton = $("#startButton");
var quizDescription = $(".quizDescription");
var questionNumber = 1;
var questions = ["What is the correct syntax to create a new div using jQuery?", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8", "Question 9", "Question 10"];
var answers = {
    1:[" $(div) ", " $'<div>' ", " $('<div>') ", " $(<div>) "],
    2:["Answer 1 to Question 2", "Answer 2 to Question 2", "Answer 3 to Question 2", "Answer 4 to Question 2"],
    3:["answer1", "answer2", "answer3", "answer4"],
    4:["answer1", "answer2", "answer3", "answer4"],
    5:["answer1", "answer2", "answer3", "answer4"],
    6:["answer1", "answer2", "answer3", "answer4"],
    7:["answer1", "answer2", "answer3", "answer4"],
    8:["answer1", "answer2", "answer3", "answer4"],
    9:["answer1", "answer2", "answer3", "answer4"],
    10:["answer1", "answer2", "answer3", "answer4"]
}
var score = 0;

// The list of correct answers for all questions (0-3)

var correctAnswers = [2,1,2,3,0,1,2,3,0,1];

// Removes the description text and begins the first question

function gameStart() {
    quizDescription.remove();
    $(".quiz").empty();
    nextQuestion();
}

// Start button

startButton.on("click", gameStart);

// nextQuestion function adds the question and answers to the page

function nextQuestion() {

    // Clears text from previous question and answers

    $(".questions").empty();
    $(".answers").empty();

    // Updates score
    scoreUpdate();

    // Adds the question text to the page

    var questionDiv = $("<div>");
    questionDiv.addClass("question");
    questionDiv.text("Question " + (questionNumber) + ": " + questions[questionNumber - 1]);
    $(".questions").append(questionDiv);

    // Adds 4 answer buttons with correct/incorrect IDs based on the answers array defined earlier

    for (var i = 0; i < 4; i++) {

        // creates a button with classes

        var answerDiv = $("<button>");
        answerDiv.addClass("answer m-1");

        // Checks if the button being created is the correct answer
        // If it is the correct answer, adds id "correct", if not, adds class "incorrect"

        if (i === correctAnswers[questionNumber - 1]) {
            answerDiv.attr("id", "correct");
        } else {
            answerDiv.addClass("incorrect");
        }

        // Gets an array of the answers for the current question

        var answerArray = answers[questionNumber];

        // Adds the answer of index i to the text of the button

        answerDiv.text(answerArray[i]);

        //appends the buttons and a page break to the html

        $(".answers").append(answerDiv);
        $(".answers").append("<br>");
    }

    // If the user clicks on the correct answer, runs correctResponse function

    $("#correct").on("click", function() {
        correctResponse();
    });

    // If the user clicks on an incorrect answer, runs the incorrectResponse function

    $(".incorrect").on("click", function() {
        incorrectResponse();
    });

}

function scoreUpdate() {
    $(".score").text("Score: " + score + "/" + (questionNumber - 1));
}

// correctResponse adds 1 to the score, sets the feedback div text to "correct", adds 1 to the question number and proceeds to the next question

function correctResponse() {
    var feedbackDiv = $(".feedback");
    feedbackDiv.text("Correct!");
    score += 1;
    questionNumber += 1;

    // Updates score
    scoreUpdate();

    // Checks if this is the final question and runs appropriate function
    if (questionNumber > questions.length) {
        isComplete();
    } else {
        nextQuestion();
    }
}

// incorrectResponse sets the feedback div text to "incorrect", adds 1 to the question number and proceeds to the next question

function incorrectResponse() {
    var feedbackDiv = $(".feedback");
    feedbackDiv.text("Incorrect.");
    questionNumber += 1;

    // Updates score
    scoreUpdate();

    // Checks if this is the final question and runs appropriate function
    if (questionNumber > questions.length) {
        isComplete();
    } else{
        nextQuestion();
    }
}

function isComplete() {
    
    // Empties elements
    $(".questions").empty();
    $(".answers").empty();
    $(".feedback").empty();
    
    // Checks if the current score is higher than the previous high score and updates the high score if it is
    var highScore = localStorage.getItem("high score");
    if (score > highScore) {
        localStorage.setItem("high score", score);
    }

    // Displays the high score on the page after checking the local memory for the updated high score
    var highScoreDiv = $(".highScore");
    highScoreDiv.addClass("highScore");
    highScore = localStorage.getItem("high score");
    highScoreDiv.text("High Score = " + highScore);

    // Generates a button to start the quiz over
    var newGameButton = $("<button>");
    newGameButton.addClass("btn btn-lg btn-primary mt-3").text("Play again?").on("click", function() {
        score = 0;
        questionNumber = 1;
        gameStart();
    })
    highScoreDiv.append(newGameButton);
}