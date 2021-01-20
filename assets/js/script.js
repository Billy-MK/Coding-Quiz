var startButton = $("#startButton");
var quizDescription = $(".quizDescription");
var questionNumber = 1;
var questions = ["Question 1", "Question 2", "Question 3"];
var answers = {
    1:["Answer 1 to Question 1", "Answer 2 to Question 1", "Answer 3 to Question 1", "Answer 4 to Question 1"],
    2:["Answer 1 to Question 2", "Answer 2 to Question 2", "Answer 3 to Question 2", "Answer 4 to Question 2"]
}

// Removes the description text and begins the first question

function gameStart() {
    quizDescription.remove();
    nextQuestion();
}

// Start button

startButton.on("click", gameStart);

// nextQuestion function adds the question and answers to the page

function nextQuestion() {

    // Adds the question text to the page

    var questionDiv = $("<div>");
    questionDiv.text(questions[questionNumber - 1]);
    $(".questions").append(questionDiv);
    questionNumber += 1;

    // Adds 4 answers based on the answers array defined earlier

    for (var i = 0; i < 4; i++) {
        var answerDiv = $("<button>");
        answerDiv.addClass("answer");
        var answerArray = answers[questionNumber - 1];
        answerDiv.text(answerArray[i]);
        $(".answers").append(answerDiv);
        $(".answers").append("<br>");
    }

}