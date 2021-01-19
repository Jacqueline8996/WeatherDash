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
        displaydaily(histBtn);
    })
    


}
function displaydaily(cityname) {

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+apiKey+"&units=imperial";

    console.log("what my URL",queryURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        var whatCity = $("<p>").html(cityname);
        $(".dailybreakdown").append(whatCity);

        var tempature = (response["list"]["0"]["main"]["temp"])+"Fs";
        // $("#temp").text("temp: " + response.value)
        console.log("what is the temp", response);
        console.log("what is the temp", response["list"]["0"]["main"]["temp"]);
        console.log("what is the temp", response);
        // Creating an element to have the tempature displayed
        var whatTemp = $("<p>")
        var pOne = whatTemp.text("Tempature: " + tempature);
        $(".dailybreakdown").append(pOne);



    });

}

//Gets the name of the town 
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var citySearch = $("#cityInput").val();
    console.log("what is the town places",citySearch);
    searchHistory(citySearch);
    displaydaily(citySearch);

})

