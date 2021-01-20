var startButton = $("#startButton");
var quizDescription = $(".quizDescription");
var questionNumber = 1;
var questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8", "Question 9", "Question 10"];
var answers = {
    1:["Answer 1 to Question 1", "Answer 2 to Question 1", "Answer 3 to Question 1", "Answer 4 to Question 1"],
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

var correctAnswers = [0,1,2,3,0,1,2,3,0,1];

// Removes the description text and begins the first question

function gameStart() {
    quizDescription.remove();
    nextQuestion();
}

// Start button

startButton.on("click", gameStart);

// nextQuestion function adds the question and answers to the page

function nextQuestion() {

    // Clears text from previous question and answers

    $(".questions").empty();
    $(".answers").empty();

    // Adds the question text to the page

    var questionDiv = $("<div>");
    questionDiv.addClass("question");
    questionDiv.text(questions[questionNumber - 1]);
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

// correctResponse adds 1 to the score, sets the feedback div text to "correct", adds 1 to the question number and proceeds to the next question

function correctResponse() {
    var feedbackDiv = $(".feedback");
    feedbackDiv.text("Correct!");
    score += 1;
    questionNumber += 1;
    nextQuestion();
}

// incorrectResponse sets the feedback div text to "incorrect", adds 1 to the question number and proceeds to the next question

function incorrectResponse() {
    var feedbackDiv = $(".feedback");
    feedbackDiv.text("Incorrect.");
    questionNumber += 1;
    nextQuestion();
}