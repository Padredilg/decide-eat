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

If searchbar is used, search with query
if category is used, search by culinary
why only 10 results appear?
*/

var searchEl = document.querySelector("#search");
var searchKeyEl = document.querySelector("#search-key");

//get an event listener to get the value from the searchbar
var searchHandler = function(event) {
    event.preventDefault();

    var searchString = searchKeyEl.value.trim();

    if(searchString == ""){
        return false;
    }

    location.href = "./search-results.html?search=" + searchString;
}

searchEl.addEventListener("submit", searchHandler);
