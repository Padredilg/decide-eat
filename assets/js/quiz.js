//Keys
var Luiz = '86228e9ea08f4ba99c66512deff69e2a';
var Brooke = '89bdc8c8b8e54e228879e6b64d54b9c1';
var Alex = 'c2afdee2474f483f939c3870eb87ac75';
var Eric = '22a96171e0b14743b65103698a203660';
//if you will test the app, please change to your API Key.
var apiKey = Luiz;

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
        choices: ['Bloody Mary', 'Margarita', 'Sangria', 'Whisky Sour']
    },
     {//questionsArr[5], index = 6
        question: 'What’s Your Favorite Type of Cuisine?',
        choices: ['French', 'Indian', 'Mexican', 'Thai']
    }
]
var index = 0;
var answers = [];
var cuisine;//string
var drink;//string
var music;//string
var cuisineCard;//title with image
var drinkCard;//title with image
var musicCard;//title with image
var cuisineRecipe;//recipe info
var drinkRecipe;//recipe info

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
    //Store strings
    music = answers[4];
    drink = answers[5];
    cuisine = answers[6];

    //remove see results button
    $("#buttons-container").text("Loading Your Results...");

    //fetch all needed info. Call displayResults when all info is already fetched.
    fetchCuisine();
};

var fetchCuisine = function() {

    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey="+ apiKey + "&cuisine=" + cuisine;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    cuisineCard = data.results[0];
                    fetchCuisineID(data.results[0].id);//number should be randomly generated
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
                    cuisineRecipe = data;
                    fetchDrink()
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

var fetchDrink = function(){
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey="  + apiKey + "&query=" + drink;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //console.log(cuisineRecipe);
                    drinkCard = data.results[0];
                    fetchDrinkById(data.results[0].id);
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

var fetchDrinkById = function(drinkId){
    var apiUrl = "https://api.spoonacular.com/recipes/" + drinkId + "/information?apiKey=" + apiKey + "&includeNutrition=false";
    //fetching by id to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    drinkRecipe = data;
                    fetchMusic();
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

var fetchMusic = function(){

    var apiUrl = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + music + "&api_key=aa6ce103ab1ac07926d6e0c30cc55bbf&format=json";
    //fetching by id to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    musicCard = data.toptracks.track[0];
                    //We need title, image, ingredients, instructions
                    displayResults();
                });
            }
            //if request was not successful
            else{//Happens when API key uses gets expired
                alert("Error: Unable to connect to Library! (Max API requests exceeded for this key)");
            }
        })
        .catch(function(error){
            alert("No internet connection!");
        })


    
};

var displayResults = function(){
    $("#buttons-container").text("");

    createRecipeCard(cuisineCard.title, cuisineCard.image);
    createDrinkCard(drinkCard.title, drinkCard.image);
    createMusicCard(musicCard.name);
    // createMusicCard();
}

var createRecipeCard = function(title, imageUrl){
    // variable pointing to recipes container
    var resultsContainerEl = document.querySelector("#buttons-container");
    resultsContainerEl.classList = "buttons-container2"
    //create button to whom image and title will be appended.
    var cardButton = document.createElement("button");
    cardButton.classList = "result-card"

    //create img and text title, and append them to button
    var imageEl = document.createElement("img");
    imageEl.classList = "result-img";
    imageEl.src = imageUrl;
    imageEl.alt = title; 
    var titleEl = document.createElement("h2");
    titleEl.textContent = title;
    titleEl.classList = "result-title text-uppercase";

    //append image and text to button
    cardButton.appendChild(imageEl);
    cardButton.appendChild(titleEl);

    cardButton.addEventListener("click", recipeClickHandler);

    //append button to recipes container
    resultsContainerEl.appendChild(cardButton);
};

var createDrinkCard = function(title, imageUrl){
    // variable pointing to recipes container
    var resultsContainerEl = document.querySelector("#buttons-container");
    resultsContainerEl.classList = "buttons-container2"
    //create button to whom image and title will be appended.
    var cardButton = document.createElement("button");
    cardButton.classList = "result-card"

    //create img and text title, and append them to button
    var imageEl = document.createElement("img");
    imageEl.classList = "result-img";
    imageEl.src = imageUrl;
    imageEl.alt = title; 
    var titleEl = document.createElement("h2");
    titleEl.textContent = title;
    titleEl.classList = "result-title text-uppercase";

    //append image and text to button
    cardButton.appendChild(imageEl);
    cardButton.appendChild(titleEl);

    cardButton.addEventListener("click", drinkClickHandler);

    //append button to recipes container
    resultsContainerEl.appendChild(cardButton);
};

var createMusicCard = function(title){
        // variable pointing to recipes container
        var resultsContainerEl = document.querySelector("#buttons-container");
        resultsContainerEl.classList = "buttons-container2"
        //create button to whom image and title will be appended.
        var cardButton = document.createElement("button");
        cardButton.classList = "result-card"
    
        //create img and text title, and append them to button
        var imageEl = document.createElement("img");
        imageEl.classList = "result-img2";
        imageEl.src = "./assets/images/song.png";
        imageEl.alt = title; 
        var titleEl = document.createElement("h2");
        titleEl.textContent = title;
        titleEl.classList = "result-title text-uppercase";
    
        //append image and text to button
        cardButton.appendChild(imageEl);
        cardButton.appendChild(titleEl);
    
        cardButton.addEventListener("click", musicClickHandler);
    
        //append button to recipes container
        resultsContainerEl.appendChild(cardButton);

};

var recipeClickHandler = function(){
    console.log("clicked the Recipe");
    
    // open the modal and populate it with the recipe info
    $("#myModal").addClass("is-active");
    $("#body").on("click", function(event) {
        if(event.target.className == "modal-background" || event.target.className == "delete"){
            $("#myModal").removeClass("is-active");
            $(".modal-card-body").text("");
        }
    });

    populateModal(cuisineRecipe);
}

var drinkClickHandler = function(){
    console.log("clicked the Drink");

    // open the modal and populate it with the recipe info
    $("#myModal").addClass("is-active");
    $("#body").on("click", function(event) {
        if(event.target.className == "modal-background" || event.target.className == "delete"){
            $("#myModal").removeClass("is-active");
            $(".modal-card-body").text("");
        }
    });

    populateModal(drinkRecipe);
}

var musicClickHandler = function(){
    // open the modal and populate it with the recipe info
    $("#myModal").addClass("is-active");
    $("#body").on("click", function(event) {
        if(event.target.className == "modal-background" || event.target.className == "delete"){
            $("#myModal").removeClass("is-active");
            $(".modal-card-body").text("");
        }
    });

    //create var pointing to modal content
    var containerEl = document.querySelector(".modal-card-body");

    //create var for title and its textContent is the title
    var titleEl = document.querySelector(".modal-card-title");
    titleEl.textContent = musicCard.name;

    //create var for image with src being the image passed
    var imageEl = document.createElement("img");
    imageEl.src = "./assets/images/song.png";
    imageEl.alt = "music logo";
    imageEl.className = "modal-image2";

    //create var for link
    var linkEl = document.createElement("a");
    linkEl.textContent = "Click here to listen to the perfect music for your date night!"
    linkEl.href = musicCard.url;
    linkEl.className = "modal-section-title2";

    containerEl.appendChild(imageEl);
    containerEl.appendChild(linkEl);
}
    
var populateModal = function(recipe){
    //populateModal(data.image, data.title, data.instructions, data.extendedIngredients, data.readyInMinutes, data.servings);
    console.log(recipe.image, recipe.title, recipe.instructions, recipe.extendedIngredients, recipe.readyInMinutes, recipe.servings);
    //(image, title, instructions, extendedIngredients, readyInMinutes, servings)

    //create var pointing to modal content
    var containerEl = document.querySelector(".modal-card-body");

    //create var for title and its textContent is the title
    var titleEl = document.querySelector(".modal-card-title");
    titleEl.textContent = recipe.title;

    //create var for image with src being the image passed
    var imageEl = document.createElement("img");
    imageEl.src = recipe.image;
    imageEl.alt = recipe.title;
    imageEl.className = "modal-image";

    //create div to have time and servings in-line
    var timeAndServingDiv = document.createElement("div");
    timeAndServingDiv.className = "time-and-serving";
    // create var for preparingTime
    var prepareTimeEl = document.createElement("h6");
    prepareTimeEl.innerHTML = "<i class='fas fa-clock'></i> Approximately: " + recipe.readyInMinutes + " min.";
    timeAndServingDiv.appendChild(prepareTimeEl);
    //create var for servings
    var servingsEl = document.createElement("h6");
    servingsEl.innerHTML = "<i class='fas fa-utensils'></i> Servings: " + recipe.servings;
    timeAndServingDiv.appendChild(servingsEl);

    //create var for ingredients title
    var ingredientsTitleEl = document.createElement("h5");
    ingredientsTitleEl.textContent = "Ingredients"
    ingredientsTitleEl.className = "modal-section-title";
    //create ul to hold elements. each new element added through loop will be an li element
    var ingredientsContainerEl = document.createElement("ul");
    ingredientsContainerEl.className = "ingredients-container";
    for(var i = 0; i<recipe.extendedIngredients.length; i++){
        // console.log(extendedIngredients[i]);
        var ingredientEl = document.createElement("li");
        ingredientEl.textContent = recipe.extendedIngredients[i].originalString;
        ingredientEl.className = "ingredient";
        ingredientsContainerEl.appendChild(ingredientEl);
    }

    //create var for instructions title
    var instructionsTitleEl = document.createElement("h5");
    instructionsTitleEl.textContent = "Instructions"
    instructionsTitleEl.className = "modal-section-title";
    //create var for instructions and textContent is the instructions passed
    var instructionsEl = document.createElement("p");
    instructionsEl.innerHTML = recipe.instructions;
    instructionsEl.className = "recipe-instructions"


    //Append each element to the modal in order
    containerEl.appendChild(imageEl);
    containerEl.appendChild(timeAndServingDiv);
    containerEl.appendChild(ingredientsTitleEl);
    containerEl.appendChild(ingredientsContainerEl);
    containerEl.appendChild(instructionsTitleEl);
    containerEl.appendChild(instructionsEl);


}


var allBtns = document.querySelectorAll(".quiz-btn"); //[button1 , button2]
//for loop on the buttons
allBtns.forEach((button)=>{
    button.addEventListener("click", nextQuestion);
})





