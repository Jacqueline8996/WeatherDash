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

function uVData(latitude, longitude){

    var uvUrL = "http://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;

    console.log("what my URL",uvUrL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: uvUrL,
    method: "GET"
    }).then(function(response) {
        console.log("my response", response)
        var uvIndex = parseInt(response["value"]);
        var whatUv = $("<p>");
        var pFour = whatUv.text("UV Index: " + uvIndex);

        if (uvIndex >= 11) {
            whatUv.addClass("extreme");
        } 
        else if(uvIndex <= 11 && uvIndex >=8){
            whatUv.addClass("very-High");
        }
        else if(uvIndex <= 7 && uvIndex >= 6){
            whatUv.addClass("high");
        }
        else if(uvIndex <= 5 && uvIndex >= 3){
            whatUv.addClass("moderate");
        }
        else{
            whatUv.addClass("low");
        }
        
        $("#displayInfo").append(pFour);

    });
}

function clearDiv(){
    $(".dailyTitle").empty();
    $("#nameOfCity").empty();
    $("#todayDate").empty();
    $("#icon").empty();
    $("#displayInfo").empty();

}


function displaydaily(cityname) {
    
    $(".dailyTitle").empty();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+apiKey+"&units=imperial";

    console.log("what my URL",queryURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        //title of the city and weather icon
        var whatCity = response["city"]["name"];
        console.log("my city is ,", whatCity);
        $("#nameOfCity").append(whatCity);

        //finding date for today
        var whatDateTime = response["list"][0]["dt_txt"];
        var whatDateWhole = whatDateTime.split(" ");
        var whatDateSplit = whatDateWhole[0].split("-");
        var whatDate = "(" + whatDateSplit[1]+ "/" + whatDateSplit[2] + "/" + whatDateSplit[0] + ")";
        $("#todayDate").append(whatDate);
        console.log("what date",whatDate);

        var iconcode = response["list"][0]["weather"][0]["icon"]
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $("#icon").append('<img id="weatherImage"' + "src="+ iconurl + ' />');
        
        console.log("my response ", response);
        // Creating an element to have the tempature displayed
        var tempature = (response["list"][0]["main"]["temp"]);
        var whatTemp = $("<p>")
        // var degree = $("<sup>")

        var pOne = whatTemp.text("Tempature: " + tempature + "F");
        $("#displayInfo").append(pOne);

        //finds and adds humidity
        var humidity = (response["list"][0]["main"]["humidity"]);
        var whatHum = $("<p>")
        var pTwo = whatHum.text("Humidity: " + humidity + "%");
        $("#displayInfo").append(pTwo);

        //find and add wind speed 
        var windSpeed = (response["list"][0]["wind"]["speed"]);
        var whatSpeed = $("<p>")
        var pThree = whatSpeed.text("WindSpeed: " + windSpeed + "MPH");
        $("#displayInfo").append(pThree);

        //finds and adds UV Index 
        var latiCo = (response["city"]["coord"]["lat"]);
        var longCo = (response["city"]["coord"]["lon"]);
        uVData(latiCo,longCo);
        

    });

}

//Gets the name of the town 
$("#searchBtn").on("click", function (event) {
    $(document).ready();
    event.preventDefault();
    // document.getElementById("weathericon").style.visibility = "hidden";
    var citySearch = $("#cityInput").val();
    console.log("what is the town places",citySearch);
    searchHistory(citySearch);
    displaydaily(citySearch);
    
    

})

