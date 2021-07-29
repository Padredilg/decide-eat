/*
Once the person clicks the take quiz button
then they are taken to a new page where the wuiz will commence

Who is the audience? -- Couples looking for a nice dinner for their date

AS A person on a date night
I WANT to prepare the perfect dinner inn
SO THAT I can have a nice and romantic dinner

GIVEN an app with a quiz and categories to help a person decide on the dinner plan

WHEN I first see the app
THEN I am presented with several options to help me decide on how to execute my dinner date night
    -The person may use the search bar to find 
        - a specific recipe
        - a culinary style
    -The person may take a quiz to help them figure the perfect dinner
    -The person may choose the style from the category selection

WHEN I search for a recipe
THEN I am presented with a complimentary cocktail recipe and music playlist

WHEN I click on take quiz
THEN I am presented with a series of questions that will help me set the perfect dinner scenario for the occasion

WHEN I finish the quiz
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I choose a category of food in the last section
THEN I am presented with recipes for that culinary style, plus cocktail suggestions and music

WHEN I see the Elevate your Date section
THEN I 

WEBAPI might already have a set of many recipes in it
link spotify(or another music app for music) -- we could use the keyword from the culinary chosen to look for a playlist

include filters for whether the user wants to find cuisines, or diets, or just anything

*/

var searchEl = document.querySelector("#search");
var searchKeyEl = document.querySelector("#search-key");

//get an event listener to get the value from the searchbar
var searchHandler = function(event) {
    event.preventDefault();

    var searchString = searchKeyEl.value.trim();

    getRecipes(searchString);
}

var getRecipes = function(searchBarValue) {
    searchKeyEl.value = "";

    if(searchBarValue == ""){
        return false;
    }
    //we are using the search as a query
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=86228e9ea08f4ba99c66512deff69e2a&query=" + searchBarValue;
    //fetching by query to find foods with that name.
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    //pass data to new function that will display all images with their names and descriptions and recipes
                    //if response is ok, then open new page with this data. Pass data.results.id to new function
                    //on new function do a new fetch with the passed id
                    console.log(data);
                    displayOptions(data.results);
                });
            }
            //if request was not successful
            else{
                alert("Error: No" + searchBarValue + "found!");
            }
        })
        .catch(function(error){
            alert("No internet connection!");
        })      
};

var displayOptions = function(array){
    for(var i=0; i<array.length; i++){
        console.log(array[i].title);
        console.log(array[i].id);
    }
}



searchEl.addEventListener("submit", searchHandler);
