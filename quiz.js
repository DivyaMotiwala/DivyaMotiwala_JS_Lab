function Question(questionId, questionText) {
    this.questionId = questionId;
    this.questionText = questionText;
}

const question1 = new Question(1, "Javascript supports");
const question2 = new Question(2, "Which language is used for styling web pages?");
const question3 = new Question(3, "Which is not a Javascript Framework ?");
const question4 = new Question(4, "Which is used for connecting to Databse ?");
const question5 = new Question(5, "Javascript is a ");

function Answer(answerText) {
    this.answerText = answerText;
}

const answer1a = new Answer("Functions");
const answer1b = new Answer("XHTML");
const answer1c = new Answer("CSS");
const answer1d = new Answer("HTML");

const answer2a = new Answer("HTML");
const answer2b = new Answer("JQuery");
const answer2c = new Answer("CSS");
const answer2d = new Answer("XML");

const answer3a = new Answer("Python Script");
const answer3b = new Answer("JQuery");
const answer3c = new Answer("Django");
const answer3d = new Answer("Node JS");

const answer4a = new Answer("PHP");
const answer4b = new Answer("HTML");
const answer4c = new Answer("JS");
const answer4d = new Answer("All");

const answer5a = new Answer("Language");
const answer5b = new Answer("Programming Language");
const answer5c = new Answer("Development");
const answer5d = new Answer("All");

function QuestionAnswer(questionObj, answerObj, correctAnswerObj, questionNo) {
    this.questionObj = questionObj;
    this.answerObj = answerObj;
    this.correctAnswerObj = correctAnswerObj;
    this.questionNo = questionNo;

    this.isItACorrectAnswer = function (userSelectedAnswer) {

        if (userSelectedAnswer === correctAnswerObj.answerText) {
            console.log("Correct Answer")
            return true;
        } else {
            console.log("Incorrect Answer")
            return false;
        }
    }
}

const qa1 = new QuestionAnswer(question1,
    [answer1a, answer1b, answer1c, answer1d],
    answer1a, 1);

const qa2 = new QuestionAnswer(question2,
    [answer2a, answer2b, answer2c, answer2d],
    answer2c, 2);

const qa3 = new QuestionAnswer(question3,
    [answer3a, answer3b, answer3c, answer3d],
    answer3c, 3);

const qa4 = new QuestionAnswer(question4,
    [answer4a, answer4b, answer4c, answer4d],
    answer4a, 4);

const qa5 = new QuestionAnswer(question5,
    [answer5a, answer5b, answer5c, answer5d],
    answer5b, 5);


function QuizApplication(qaArray) {
    this.qaArray = qaArray;
    this.pageIndex = 0;
    this.score = 0;

    this.initAndDisplayPage = function () {
        this.pageIndex = 0;
        this.attachListeners();
        this.displayQuizPage();
    }

    this.displayNextPage = function () {
        this.pageIndex++;
        this.attachListeners();
        this.displayQuizPage();
    }
    this.loadAndStart = function () {
        this.initAndDisplayPage();

    }

    this.attachListeners = function () {
        const questionAnswerObj = qaArray[this.pageIndex];
        const currentQuizAppObj = this;

        for (let index = 0; index < questionAnswerObj.answerObj.length; index++) {
            let buttonId = "btn" + index;
            const buttonHTMLElement = document.getElementById(buttonId);
            buttonHTMLElement.onclick = function (event) {

                const currentTarget = event.currentTarget;
                //Check if answer is correct
                //Calculate score

                const userSelectedAnswer = currentTarget.children[0].innerHTML;
                const result = questionAnswerObj.isItACorrectAnswer(userSelectedAnswer);
                if (result) {
                    currentQuizAppObj.incrementScore();
                }

                //Move to next page
                currentQuizAppObj.next();

            }
        }
    }

    this.incrementScore = function () {
        this.score++;
    }
    this.next = function () {
        if (this.isThisTheLastQuestion())
            this.displayResultPage();
        else
            this.displayNextPage();

    }

    this.isThisTheLastQuestion = function () {
        if (this.pageIndex === this.qaArray.length - 1) {
            return true;
        } else {
            return false;
        }
    }
    this.displayResultPage = function () {

        const percentage = (this.score/ this.qaArray.length)*100;

        const resultPageContent = `
        <h1>QUIZ RESULT</h1>
        <h3 id='score'>Your scores ${this.score}. Mark percentage ${percentage}.</h3>
        `;

        const quizHTMLElement = document.getElementById("quiz");
        quizHTMLElement.innerHTML = resultPageContent;
    }
    this.displayQuizPage = function () {

        this.displayQASection();
        this.displayQuestionProgressSection(qaArray.length);
    }
    this.displayQASection = function () {

        const qaObj = qaArray[this.pageIndex];
        const questionText = qaObj.questionObj.questionText;
        const questionHtmlElement = document.getElementById("question");
        questionHtmlElement.innerHTML = questionText;

        const ansArray = qaObj.answerObj;
        for (let index = 0; index < ansArray.length; index++) {
            let answerHTMLElementId = "choice" + index;
            const ansElement = document.getElementById(answerHTMLElementId);
            ansElement.innerHTML = ansArray[index].answerText;
        }

    }
    this.displayQuestionProgressSection = function (totalQuestions) {
        let progressText = `Question ${this.pageIndex + 1} of ${totalQuestions}`;
        const footerHTMLElement = document.getElementById("progress");
        footerHTMLElement.innerHTML = progressText;
    }
}

const quizApplication = new QuizApplication(
    [qa1, qa2, qa3, qa4, qa5]
)
quizApplication.loadAndStart();