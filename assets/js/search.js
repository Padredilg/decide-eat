//Keys
var Luiz = '86228e9ea08f4ba99c66512deff69e2a';
var Brooke = '';
var Alex = 'c2afdee2474f483f939c3870eb87ac75';
var Eric = '';
//if you will test the app, please change to your API Key.
var apiKey = Alex;

//querySelectors
var searchEl = document.querySelector("#search");
var searchKeyEl = document.querySelector("#search-key");
var categoryBtn =document.querySelector(".btn");

//variables
var keyword;

//functions
var getkeyword = function(){
    var queryString = document.location.search;
    keyword = queryString.split("=")[1];

    if(keyword){
        $("#string-span").text(keyword);//recipes for keyword

        if(keyword == "Italian" || keyword == "Thai" || keyword == "Indian" || keyword == "Mexican" || 
        keyword == "American" || keyword == "Korean" || keyword == "German" || keyword == "Vietnamese" || 
        keyword == "Chinese" || keyword == "Greek"){//comes from category button
            getRecipesByCuisine(keyword);
        }
        else{
            getRecipesByQuery(keyword);
        }
    }
};

var getRecipesByQuery = function(keyword) {
    //we are using the search as a query
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey="  + apiKey + "&query=" + keyword;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //console.log(data);
                    displayOptions(data.results);
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

var getRecipesByCuisine = function(keyword) {
    //we are using the search as a query
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=86228e9ea08f4ba99c66512deff69e2a&cuisine=" + keyword;
    //fetching by cuisine to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    // console.log(data);
                    //pass data to new function that will display all images with their names and descriptions and recipes
                    //if response is ok, then open new page with this data. Pass data.results.id to new function
                    //on new function do a new fetch with the passed id
                    // console.log(data);
                    displayOptions(data.results);
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

var displayOptions = function(results){
    //reset results
    $("#display-recipes").text("");
    $("#no-results").text("");


    if(results.length == 0){
        $("#no-results").text("No results found for " + keyword + ".");
        return false;
    }

    for(var i=0; i<results.length; i++){
        createCardRecipe(results[i].title, results[i].id, results[i].image)
    }
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

var recipeClickHandler = function(event){
    $("#myModal").addClass("is-active");

    $("#body").on("click", function(event) {
        if(event.target.className == "modal-background" || event.target.className == "delete"){
            $("#myModal").removeClass("is-active");
            $(".modal-card-body").innerHTML("");
            $(".modal-card-title").text("Loading...");
        }
    });

    var buttonId = event.path[1].id;

    getModalInfo(buttonId);

    //populate the modal with title, image, summary, ingredients, and how to make.
    //title, image, summary, ingredients will come from information
    //how to make comes from annalyze recipe
    //both can be fetched by the ID
};

var getModalInfo = function(recipeId){
    // console.log(recipeId);
    //we will perform the fetch here and console log the new data
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey + "&includeNutrition=false";
    //fetching by id to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    populateModal(data.image, data.title, data.instructions, data.extendedIngredients, data.readyInMinutes, data.servings);
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
    
};

var populateModal = function(image, title, instructions, extendedIngredients, readyInMinutes, servings){
    console.log(image);
    console.log(title);
    console.log(instructions);
    console.log(extendedIngredients);
    console.log(readyInMinutes);
    console.log(servings);

    //create var pointing to modal content
    var containerEl = document.querySelector(".modal-card-body");

    //create var for title and its textContent is the title
    var titleEl = document.querySelector(".modal-card-title");
    titleEl.textContent = title;

    //create var for image with src being the image passed
    var imageEl = document.createElement("img");
    imageEl.src = image;
    imageEl.alt = title;
    //create var for instructions and textContent is the instructions passed
    // create var for preparingTime
    //create var for ingredients, create var for servings

    //Use these variables to populate the modal --> #myModal
};

var searchHandler = function(event) {
    event.preventDefault();

    var searchString = searchKeyEl.value.trim();

    if(searchString == ""){
        return false;
    }
    else{
        searchString = searchString.toLowerCase();

        if(keyword == "italian" || keyword == "thai" || keyword == "indian" || keyword == "mexican" || 
        keyword == "american" || keyword == "korean" || keyword == "german" || keyword == "vietnamese" || 
        keyword == "chinese" || keyword == "greek"){
            
            keyword = searchString;
            $("#string-span").text(keyword);//recipe results for keyword
            $('#search').children('input').val('');//clear input value
            getRecipesByCuisine(keyword);
        }
        else{
            keyword = searchString;
            $("#string-span").text(keyword);//recipe results for keyword
            $('#search').children('input').val('');//clear input value
            getRecipesByQuery(keyword);
        }        
    }
};

//callers/listeners
getkeyword();
searchEl.addEventListener("submit", searchHandler);

//When Alex does the pull, merge, then delete category.html and category.js, and do a new pull for others to get.
//Make sure to correctly link the buttons in the index to the search html page.
//Update searchHandler to include all cases from the buttons

