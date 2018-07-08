$(document).ready(function () {

    // checks if user's browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) { // gets user's position

            // url of json link, depending on user's position
            var url =
                "https://fcc-weather-api.glitch.me/api/current?lat=" +
                position.coords.latitude +
                "&lon=" +
                position.coords.longitude;

            // gets json data, updating it into html
            $.getJSON(url, function (json) {
                $("#location").html(json.name);
                $("#description").html(json.weather[0].description);
                $("#temperature").html(json.main.temp + " °C");
                if (json.weather[0].icon == undefined) {
                    $("#weatherIcon").html(
                        "<img src=\"https://openweathermap.org/img/w/" + json.weather[1].icon + ".png\"" + "></img>"
                    );
                } else {
                    $("#weatherIcon").html(
                        "<img src=" + '"' + json.weather[0].icon + '"' + "></img>"
                    );
                }
                // toggles data from celsius to fahrenheit and vice-versa
                var clicks = 0;
                $("#toggleTemp").click(function () {
                    clicks++;
                    if (clicks % 2 === 1) {
                        $("#toggleTemp").html("Change to Celsius");
                        $("#temperature").html((json.main.temp * 9 / 5 + 32).toFixed(2) + " °F");
                    } else {
                        $("#toggleTemp").html("Change to Fahrenheit");
                        $("#temperature").html(json.main.temp + " °C");
                    }
                });
            });
        });
    }
});  