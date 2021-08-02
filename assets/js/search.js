//querySelectors
var searchEl = document.querySelector("#search");
var searchKeyEl = document.querySelector("#search-key");

//variables
var keyword;

//functions
var getkeyword = function(){
    var queryString = document.location.search;
    keyword = queryString.split("=")[1];

    if(keyword){
        $("#string-span").text(keyword);//recipes for keyword
        getRecipes(keyword);
    }
};

var getRecipes = function(keyword) {
    //we are using the search as a query
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=86228e9ea08f4ba99c66512deff69e2a&query=" + keyword;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //pass data to new function that will display all images with their names and descriptions and recipes
                    //if response is ok, then open new page with this data. Pass data.results.id to new function
                    //on new function do a new fetch with the passed id
                    // console.log(data);
                    displayOptions(data.results);
                });
            }
            //if request was not successful
            else{//when does this else happen??
                alert("Error: No" + keyword + "found!");
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

    //card will be a button that when clicked will display a modal.

    //maybe id wont be useful now. We will just create the buttons. when buttons are clicked then we worry about id
};

var recipeClickHandler = function (event){
    console.log(event);

    //addEventListener for click, then open modal with info from the option clicked
};

var searchHandler = function(event) {
    event.preventDefault();

    var searchString = searchKeyEl.value.trim();

    if(searchString == ""){
        return false;
    }
    else{
        keyword = searchString;
        $("#string-span").text(keyword);//recipe results for keyword
        $('#search').children('input').val('');//clear input value
        getRecipes(keyword);
    }
};

//callers/listeners
getkeyword();
searchEl.addEventListener("submit", searchHandler);
