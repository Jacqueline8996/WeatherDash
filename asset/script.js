var apiKey = "dcb8c612edc0549f82dca82fa9beb12d";
var storedHistory = [];

function searchHistory(cityname){
    var saveCity = cityname;
    storedHistory.push(saveCity);
    console.log("how long is my list", storedHistory);
    

    var pastSearch = $("<button>").text(cityname);
    pastSearch.addClass("oldSearches");
    pastSearch.attr('id', 'historyBtn');

    $(".pastCity").prepend(pastSearch);
    $("#historyBtn").on("click", function(event){
        event.preventDefault();
        // clearDiv();
        // var histBtn = $("#historyBtn").html();
        console.log("what is the town places",pastSearch.text());
        console.log ("you clicked", pastSearch.text());
        clearDiv();
        displaydaily(pastSearch.text());
        // fiveDay(pastSearch.text());

    })

}
function saveData(){
    localStorage.setItem("cities", JSON.stringify(storedHistory));
    const localArray = localStorage.getItem("cities");
    console.log("what is in my old array", localArray);

}

function uVData(latitude, longitude){

    var uvUrL = "https://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: uvUrL,
    method: "GET"
    }).then(function(response) {
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
    $("#fivedayTitle").empty();
    $(".wordsTitle").empty();
    $("#day1cast").empty();
    $("#day2cast").empty();
    $("#day3cast").empty();
    $("#day4cast").empty();
    $("#day5cast").empty();
}

function fiveDay(latitude,longitude,todaydate){
    // clearDiv();
    $(".fiveDay").addClass("boarderFive");
    var whatTitle = $("<p>").attr('id', 'fivedayTitle');
    var pForTitle = whatTitle.text("5-DAY Forcast");
    $(".fiveDay").prepend(pForTitle);
    var dateVar = todaydate;

    // "current+minutely,hourly,"
    var fiveURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=current+minutely,hourly,"+"&appid="+apiKey+"&units=imperial";
   

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: fiveURL,
    method: "GET"
    }).then(function(response) {
        var whatTitleFor = $("<p>")
        $(whatTitleFor).html("date"+1)

        //get the 5 day forcast
        for(i = 1; i < 6; i++) {

            //getting date 
            var dateForcast = JSON.parse(dateVar[2])+i;
            var pDate = $("<p>");
            var whatDateForcast = pDate.html(dateVar[1]+ "/" + dateForcast + "/" + dateVar[0]);
            pDate.addClass("dateForcast");

            $("#day"+i+"cast").append(whatDateForcast);
            $("#day"+i+"cast").addClass("forcast")

            //get the icon 
            var iconcode = response["daily"][i]["weather"][0]["icon"];
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
            $("#day"+i+"cast").append('<img id="weatherImage2"' + "src="+ iconurl + ' />');
            
            //get the tempature
            var tempaturefor = (response["daily"][i]["temp"]["day"]);
            var whatTempfor = $("<p>");
            var pForOne = whatTempfor.text("Temp: " + tempaturefor + " F");
            $("#day"+i+"cast").append(pForOne);

            //finds and adds humidity
            var humidityFor = (response["daily"][i]["humidity"]);
            var whatHumFor = $("<p>");
            var pForTwo = whatHumFor.text("Humidity: " + humidityFor + "%");
            $("#day"+i+"cast").append(pForTwo);

            //add class for the forcast boxes
            $("#day"+i+"cast").addClass("forcast")

        }
        
    });
       
}


function displaydaily(cityname) {
    // clearDiv();
    
    $(".displayDashboard").addClass("boarderDaily")
    // $(".dailyTitle").empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid="+apiKey+"&units=imperial";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        //title of the city and weather icon
        var whatCity = response["city"]["name"];
        $("#nameOfCity").append(whatCity);

        //finding date for today
        var whatDateTime = response["list"][0]["dt_txt"];
        var whatDateWhole = whatDateTime.split(" ");
        var whatDateSplit = whatDateWhole[0].split("-");
        var whatDate = "(" + whatDateSplit[1]+ "/" + whatDateSplit[2] + "/" + whatDateSplit[0] + ")";
        $("#todayDate").append(whatDate);

        //Adding in ICON To the event 
        var iconcode = response["list"][0]["weather"][0]["icon"]
        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        $("#icon").append('<img id="weatherImage"' + "src="+ iconurl + ' />');
        
        // Creating an element to have the tempature displayed
        var tempature = (response["list"][0]["main"]["temp"]);
        var whatTemp = $("<p>");
        // var degree = $("<sup>")

        var pOne = whatTemp.text("Tempature: " + tempature + "F");
        $("#displayInfo").append(pOne);

        //finds and adds humidity
        var humidity = (response["list"][0]["main"]["humidity"]);
        var whatHum = $("<p>");
        var pTwo = whatHum.text("Humidity: " + humidity + "%");
        $("#displayInfo").append(pTwo);

        //find and add wind speed 
        var windSpeed = (response["list"][0]["wind"]["speed"]);
        var whatSpeed = $("<p>");
        var pThree = whatSpeed.text("WindSpeed: " + windSpeed + "MPH");
        $("#displayInfo").append(pThree);

        //finds and adds UV Index 
        var latiCo = (response["city"]["coord"]["lat"]);
        var longCo = (response["city"]["coord"]["lon"]);
        uVData(latiCo,longCo);
        
        // var cityId = (response["city"]["id"]);
        fiveDay(latiCo,longCo,whatDateSplit);

    });

}


//Gets the name of the town 
$("#searchBtn").on("click", function (event) {
    saveData();
    $(document).ready();
    event.preventDefault();
    clearDiv();
    var citySearch = $("#cityInput").val();
    searchHistory(citySearch);
    displaydaily(citySearch);


})
