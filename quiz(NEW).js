//Keys
var Luiz = '86228e9ea08f4ba99c66512deff69e2a';
var Brooke = '89bdc8c8b8e54e228879e6b64d54b9c1';
var Alex = 'c2afdee2474f483f939c3870eb87ac75';
var Eric = '22a96171e0b14743b65103698a203660';
//if you will test the app, please change to your API Key.
var apiKey = Eric;

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
        choices: ['Cosmo', 'margarita', 'Sangria', 'Whisky Sour']
    },
     {//questionsArr[5], index = 6
        question: 'What’s Your Favorite Type of Cuisine?',
        choices: ['French', 'Indian', 'Mexican', 'Thai']
    }
]
var index = 0;
var answers = [];
var cuisine;
var drink;
var music;

/*Functions*/
var nextQuestion = function(event){
    //How to check whether we already came from the last question?
    if(index == questionsArr.length){
        //console.log(event.path[0].outerText);
        answers = answers.concat(event.path[0].outerText);
        endQuiz();
        return;
    }

    //console.log(event.path[0].outerText);
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
    //console.log("You Finished the quiz!");
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
    //console.log("See results!");

    //can we copy and paste the modal?
    //need to get keyword or keywords from the answersArr and do a fetch from API with the parameters.
    music = answers[4];
    drink = answers[5];
    cuisine = answers[6];

    //activate modal

    $("#myModal").addClass("is-active");

    $("#body").on("click", function(event) {
        if(event.target.className == "modal-background" || event.target.className == "delete"){
            $("#myModal").removeClass("is-active");
            $(".modal-card-body").text("");
        }
    });

    fetchCuisine();
    //get cuisine, then get drink, then get music
};

var fetchCuisine = function() {

    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey="+ apiKey + "&cuisine=" + cuisine;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //console.log(data);
                    fetchCuisineID(data.results[0].id);
                });
            }
            //if request was not successful
            else{//when does this else happen??
                alert("Error: Unable to connect to Recipe Library! (Max API requests exceeded for this key)");
            }
        })
        .catch(function(error){
            alert("No internet connection!");
        }) 

}

var fetchCuisineID = function(recipeId){
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey + "&includeNutrition=false";
    //fetching by id to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //console.log(data)//this should be the recipe by the cuisine
                    fetchDrink(data)
                    //We need title, image, ingredients, instructions
                });
            }
            //if request was not successful
            else{//Happens when API key uses gets expired
                alert("Error: Unable to connect to Recipe Library! (Max API requests exceeded for this key)");
            }
        })
        .catch(function(error){
            alert("No internet connection!");
        })
}

var fetchDrink = function(cuisineRecipe){
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey="  + apiKey + "&query=" + drink;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //console.log(data);
                    //console.log(cuisineRecipe);
                    fetchDrinkById(cuisineRecipe, data);
                    //drink = data.results;
                    //fetchMusic();
                });
            }
            //if request was not successful
            else{//when does this else happen??
                alert("Error: Unable to connect to Recipe Library! (Max API requests exceeded for this key)");
            }
        })
        .catch(function(error){
            alert("No internet connection!");
        })
};

var fetchDrinkById = function(cuisineRecipe, drinkId){
    var apiUrl = "https://api.spoonacular.com/recipes/" + drinkId + "/information?apiKey=" + apiKey + "&includeNutrition=false";
    //fetching by id to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //console.log(data, cuisineRecipe);
                    fetchMusic(cuisineRecipe, data);
                    //We need title, image, ingredients, instructions
                });
            }
            //if request was not successful
            else{//Happens when API key uses gets expired
                alert("Error: Unable to connect to Recipe Library! (Max API requests exceeded for this key)");
            }
        })
        .catch(function(error){
            alert("No internet connection!");
        })
}

var fetchMusic = function(cuisineRecipe, drinkRecipe){
    console.log(cuisineRecipe, drinkRecipe);

    //fetch the music with the music variable
};
    

var displayOptions = function(cuisineResults, drinkResults, musicResults){
    //reset results
    $("#display-recipes").text("");
    $("#no-results").text("");

    //for(var i=0; i<results.length; i++){
        console.log(cuisineResults, drinkResults, musicResults);
        //once music API is added, remember to add those results to the card
        //createCardRecipe(results[i].title, results[i].image, results[i].id)
   // }
};

var createCardRecipe = function(title, id, imageUrl){
    // variable pointing to recipes container
    var recipesContainerEl = document.querySelector("#display-recipes");
    //create button to whom image and title will be appended.
    var cardButton = document.createElement("button");
    cardButton.classList = "recipe-card"
    cardButton.id = id;

    //create img and text title, and append them to button
    var imageEl = document.createElement("img");
    imageEl.classList = "recipe-img";
    imageEl.src = imageUrl;
    imageEl.alt = "the recipe for " + title; 
    var titleEl = document.createElement("h2");
    titleEl.textContent = title;
    titleEl.classList = "recipe-title text-uppercase";

    //append image and text to button
    cardButton.appendChild(imageEl);
    cardButton.appendChild(titleEl);

    cardButton.addEventListener("click", recipeClickHandler);

    //append button to recipes container
    recipesContainerEl.appendChild(cardButton);
};

var allBtns = document.querySelectorAll(".quiz-btn"); //[button1 , button2]
//for loop on the buttons
allBtns.forEach((button)=>{
    button.addEventListener("click", nextQuestion);
})





