var startButton = $("#startButton");
var quizDescription = $(".quizDescription");
var questionNumber = 1;
var questions = ["What is the correct syntax to create a new div using jQuery?", 
    "In an array fruits = ['apple','orange','banana','kiwi'], fruits[3] represents which variable?", 
    "What is the importance of an alt tag in HTML images?", 
    "Using Bootstrap, what class would you use to make a column that spans 1/3rd of the width of the container it's in?", 
    "I have a div with a class = 'captainAmerica', and I would like to make the width 300px. How would I do this using a css stylesheet?",
    "Stylesheets should always be referenced in what part of the HTML document?",
    "What is the priority from highest to lowest of CSS styling?",
    "How do I create a for loop that adds all the numbers from 'var numbers = [2, 5, 7] together in a new variable called sum? (both variables have already been declared)",
    "How does one leave a comment in HTML?",
    "What should you always include with any project?"];
var answers = {
    1:[" $(div) ", " $'<div>' ", " $('<div>') ", " $(<div>) "],
    2:["apple", "orange", "banana", "kiwi"],
    3:["To improve accessibility of your page to users using screen readers", "To provide an alternate url for the image in case the first url doesn't work", "To add a caption to the image", "To place a second image in the same element"],
    4:["col-md-1/3", "col-md-4", "col-md-3", "col-md-0.33"],
    5:["captainAmerica {width = 300px}", ".captainAmerica {width = 300px}", "captainAmerica {width: 300px}", ".captainAmerica {width: 300px}"],
    6:["The beginning", "The end", "Anywhere", "The stylesheet section"],
    7:["ID, In-line, class, tag", "tag, ID, class, In-line", "In-line, ID, class, tag", "class,tag, In-line, ID"],
    8:["for (numbers[all], sum(numbers), return(sum));", "for (var i = 0, i < numbers.length, i++) {sum += numbers[i]}", "for (var i = 0; i < numbers.length; i++) {sum += numbers[i]}", "for (i = numbers[0], i = numbers[1], i = numbers[2]) {sum = i++}"],
    9:["// comment", "<!-- comment -->", "/* comment */", "# comment"],
    10:["A README", "A MEME", "A SCREAMIN' MEEMIE", "SUMTHIN STEAMY"]
}
var score = 0;

// The list of correct answers for all questions (0-3)

var correctAnswers = [2,3,0,1,3,0,2,2,1,0];

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

    // Clears previous questions and answers

    $(".questions").empty();
    $(".answers").empty();
    $(".nextQuestionButton").empty();

    // Updates score
    scoreUpdate();

    // Adds the question text to the page

    var questionDiv = $("<div>");
    questionDiv.addClass("question");
    questionDiv.text(questionNumber + ": " + questions[questionNumber - 1]);
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
        answerFunction();
        correctResponse();
        $("#correct").attr("disabled", true).css("color", "black");
        $(".incorrect").attr("disabled", true).css("color", "black");
    });
    
    // If the user clicks on an incorrect answer, runs the incorrectResponse function
    
    $(".incorrect").on("click", function() {
        answerFunction();
        incorrectResponse();
        $(".incorrect").attr("disabled", true).css("color", "black");
        $("#correct").attr("disabled", true).css("color", "black");
    });
    
}

// Sets background color of correct answers to green and incorrect to red and creates the "next question" button

function answerFunction() {
    $(".incorrect").css("background-color", "#ff6347");
    $("#correct").css("background-color", "#90ee90");
    var nextQuestionButton = $("<button>");
    nextQuestionButton.addClass("btn btn-lg btn-primary mx-auto").text("Next Question").on("click", function() { 
        nextQuestion();
    });
    $(".nextQuestionButton").append(nextQuestionButton);
}

// correctResponse adds 1 to the score, adds 1 to the question number and proceeds to the next question

function correctResponse() {
    score += 1;
    questionNumber += 1;
    
    // Updates score
    scoreUpdate();
    
    // Checks if this is the final question and runs appropriate function
    if (questionNumber > questions.length) {
        isComplete();
    }
}

// incorrectResponse adds 1 to the question number and proceeds to the next question

function incorrectResponse() {
    questionNumber += 1;
    
    // Updates score
    scoreUpdate();
    
    // Checks if this is the final question and runs appropriate function
    if (questionNumber > questions.length) {
        isComplete();
    } 
}

function scoreUpdate() {
    $(".score").text("Score: " + score + "/" + (questionNumber - 1));
}

function isComplete() {
    
    // Empties elements
    $(".questions").empty();
    $(".answers").empty();
    $(".nextQuestionButton").empty();
    
    // Checks if the current score is higher than the previous high score and updates the high score if it is
    var highScore = localStorage.getItem("high score");
    if (score > highScore) {
        localStorage.setItem("high score", score);
    }
    
    // Displays the high score on the page after checking the local memory for the updated high score
    var highScoreDiv = $(".highScore");
    highScoreDiv.addClass("highScore");
    highScore = localStorage.getItem("high score");
    highScoreDiv.text("High Score = " + highScore +"/10");

    // Generates a button to start the quiz over
    var newGameButton = $("<button>");
    newGameButton.addClass("btn btn-lg btn-primary mt-3").text("Try again?").on("click", function() {
        score = 0;
        questionNumber = 1;
        gameStart();
    })
    highScoreDiv.append(newGameButton);
}