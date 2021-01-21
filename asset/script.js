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
        fiveDay(histBtn);
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

function fiveDay(latitude,longitude,todaydate){

    var whatTitle = $("<p>");
    var pForTitle = whatTitle.html("5-DAY Forcast");
    $("#fivedayTitle").append(pForTitle);
    var dateVar = todaydate;
    // var dateVar = [2021,01,31];
    
    console.log("what today date", dateVar)

    // "current+minutely,hourly,"
    var fiveURL = "http://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=current+minutely,hourly,"+"&appid="+apiKey+"&units=imperial";
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id="+cityID+"&cnt=5"+"&appid="+apiKey+"&units=imperial";

    console.log("what my URL for 5 day",fiveURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
    url: fiveURL,
    method: "GET"
    }).then(function(response) {
        console.log("response5day",response);
        var whatTitleFor = $("<p>")
        $(whatTitleFor).html("date"+1)


        //get the 5 day forcast
        for(i = 1; i < 6; i++) {
            //getting date 


            // var whatDateForcast = "(" + dateVar[1]+ "/" + dateVar[2] + "/" + dateVar[0] + ")";
            // $("#day"+i+"cast").append(whatDateForcast);
            // console.log("what date for the forcast",whatDateForcast);

            //get the icon 
            var iconcode = response["daily"][i]["weather"][0]["icon"];
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $("#day"+i+"cast").append('<img id="weatherImage2"' + "src="+ iconurl + ' />');
            
            //get the tempature
            console.log("my response ", response);
            var tempaturefor = (response["daily"][i]["temp"]["day"]);
            var whatTempfor = $("<p>")
            var pForOne = whatTempfor.text("Temp: " + tempaturefor + " F");
            $("#day"+i+"cast").append(pForOne);


            //finds and adds humidity
            var humidityFor = (response["daily"][i]["humidity"]);
            var whatHumFor = $("<p>")
            var pForTwo = whatHumFor.text("Humidity: " + humidityFor + "%");
            $("#day"+i+"cast").append(pForTwo);

            //add class for the forcast boxes
            $("#day"+i+"cast").addClass("forcast")

        }
        
      
    });

       
}


function displaydaily(cityname) {
    
    // $(".dailyTitle").empty();
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
        
        // var cityId = (response["city"]["id"]);
        fiveDay(latiCo,longCo,whatDateSplit);

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
