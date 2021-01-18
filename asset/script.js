// var pastCitydiv = document.queryselector(".pastCity");


var apiKey = "dcb8c612edc0549f82dca82fa9beb12d";

function searchHistory(cityname){

    var pastSearch = $("<button>");
    pastSearch.addClass("oldSearches");
    pastSearch.attr('id', 'historyBtn');
    pastSearch.html(cityname);
    $(".pastCity").append(pastSearch);
    $("#historyBtn").on("click", function (event) {
        var histBtn = $("#historyBtn").html();
        console.log("what is the town places",histBtn);

    })

}





//Gets the name of the town 
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var citySearch = $("#cityInput").val();
    console.log("what is the town places",citySearch);
    searchHistory(citySearch);
    

})

