var getkeyword = function(){
    var queryString = document.location.search;
    var keyword = queryString.split("=")[1];
    console.log(keyword);

    //if some value for keyword exists
    if(keyword){
        //give text to the span element in the header title in the html file
        // keywordEl.textContent = keyword;
        //create the issues with the username/keyword coming from the right side of the = to the right of the ? in the url
        getRecipes(keyword);
    }
    else{//go to main to try to get some value
        document.location.replace("./index.html");
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

var displayOptions = function(array){
    for(var i=0; i<array.length; i++){
        //maybe we can create card buttons that englobe the image with name at the bottom and when clicked display the info
        console.log(array[i].title);
        
        //addEventListener for click, then open modal with info from the option clicked
        console.log(array[i].id);

        

    }
}



getkeyword();