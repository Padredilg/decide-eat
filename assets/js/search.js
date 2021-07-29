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
                    displayOptions(data.results, keyword);
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

var displayOptions = function(array, keyword){
    if(array.length == 0){
        $("#no-results").text("No results found for " + keyword + ".");
        //write: No recipes found for keyword.
        return false;
    }

    $("#no-results").text("");
    //else, create cards
    for(var i=0; i<array.length; i++){
        //maybe we can create card buttons that englobe the image with name at the bottom and when clicked display the info
        console.log(array[i].title);
        
        //addEventListener for click, then open modal with info from the option clicked
        console.log(array[i].id);
    }
};

var searchHandler = function(event) {
    event.preventDefault();

    var searchString = searchKeyEl.value.trim();

    if(searchString == ""){
        return false;
    }
    else{
        keyword = searchString;
        $("#string-span").text(keyword);//recipes for keyword
        $('#search').children('input').val('');//clear input value
        getRecipes(keyword);
    }
};

//callers/listeners
searchEl.addEventListener("submit", searchHandler);
getkeyword();



// var displayRepos = function(repos, searchTerm){
//     //clear old content
//     repoContainerEl.textContent = "";
//     repoSearchTerm.textContent = searchTerm;

//     if(repos.length === 0){
//         repoContainerEl.textContent = "No repositories found.";
//         return;
//     }

//     for(var i=0; i<repos.length; i++){//looping through all repos that a give user has
//         //format repo name
//         var repoName = repos[i].owner.login + "/" + repos[i].name;

//         //create a container for each repo
//         var repoEl = document.createElement("a");
//         repoEl.classList = "list-item flex-row justify-space-between align-center";
//         repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

//         //create a span element to hold repository name
//         var titleEl = document.createElement("span");
//         titleEl.textContent = repoName;

//         //append span to container, 
//         repoEl.appendChild(titleEl);

//         //create a status element
//         var statusEl = document.createElement("span");
//         statusEl.classList = "flex-row align-center";

//         //check if current repo has issues or not
//         if (repos[i].open_issues_count > 0){
//             statusEl.innerHTML = 
//             "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//         }
//         else{
//             statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//         }

//         //append second span to container
//         repoEl.appendChild(statusEl);

//         //append container to dom
//         repoContainerEl.appendChild(repoEl);
//     }
// }



