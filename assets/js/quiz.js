/*Variables*/
var questionsArr = [
    {//questionsArr[0] , index = 1
        question: ' What’s Your Hunger Level?',
        choices: ['Moderate', 'Not that hungry', 'HANGRY', 'I just ate something'],
    },
    {//questionsArr[1], index = 2
        question: 'How Would You Describe Your Eating Style?',
        choices: ['Normal', 'Bird-like', 'Wild Animal', 'Elegant']
    },
    {//questionsArr[2], index = 3
        question: 'Are You a Cat or Dog Person?',
        choices: ['I love both equally', 'Dogs all the way', 'Neither, gross', 'Cats FTW']
    },
    {//questionsArr[3], index = 4
        question: 'Whats your favorite type of music?',
        choices: ['Pop', 'Country', 'Rock', 'Rap']
    },
    {//questionsArr[4], index = 5
        question: 'What Cocktail Do You Like the Most?',
        choices: ['Cosmo', 'margarita', 'Sangria', 'old fashioned']
    },
     {//questionsArr[5], index = 6
        question: 'What’s Your Favorite Type of Cuisine?',
        choices: ['French', 'Indian', 'Mexican', 'Thai']
    }
]
var index = 0;
var answers = [];

/*Functions*/
var nextQuestion = function(event){
    //How to check whether we already came from the last question?
    if(index == questionsArr.length){
        console.log(event.path[0].outerText);
        answers = answers.concat(event.path[0].outerText);
        endQuiz();
        return;
    }

    console.log(event.path[0].outerText);
    answers = answers.concat(event.path[0].outerText);

    //load new set of questions
    var questionEl = document.querySelector("#question");
    questionEl.textContent = questionsArr[index].question

    //load new set of buttons
    var buttonOne = document.querySelector("#button-1");
    buttonOne.textContent = questionsArr[index].choices[0];
    var buttonTwo = document.querySelector("#button-2");
    buttonTwo.textContent = questionsArr[index].choices[1];
    var buttonThree = document.querySelector("#button-3");
    buttonThree.textContent = questionsArr[index].choices[2];
    var buttonFour = document.querySelector("#button-4");
    buttonFour.textContent = questionsArr[index].choices[3];

    index++;
}

var endQuiz = function(){
    console.log("You Finished the quiz!");
    $("#buttons-container").text("");

    var questionEl = document.querySelector("#question");
    questionEl.textContent = "Would you like to check what your perfect dinner will be?"

    var newButton = document.createElement("button");
    newButton.className = "quiz-btn";
    newButton.textContent = "See Results"
    newButton.addEventListener("click", seeResults);

    //Create Take Quiz Again button and append to buttons container -- Will have to reload the page

    var buttonsContainer = document.querySelector("#buttons-container");
    buttonsContainer.appendChild(newButton);
}

var seeResults = function(){
    console.log("See results!");

    //can we copy and paste the modal?
    //need to get keyword or keywords from the answersArr and do a fetch from API with the parameters.
    var music = answers[4];
    var drink = answers[5];
    var cuisine = answers[6];

    console.log(music, drink, cuisine);

    //then display a modal with the data fetched
    //How many fetches will it be? 
    //We need to fetch by name and then collect the id, then fetch by the id to get the modal info, just like in search.js
}

var allBtns = document.querySelectorAll(".quiz-btn"); //[button1 , button2]
//for loop on the buttons
allBtns.forEach((button)=>{
    button.addEventListener("click", nextQuestion);
})





