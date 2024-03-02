function getAirport() {

    //access to document components
    let airport = document.getElementById("airport");
    let get_weather_button = document.getElementById("weatherButton");
    let field_elevation = document.getElementById("field_elevation");
    let field_temperature = document.getElementById("field_temperature");
    let altimeter_setting = document.getElementById("altimeter_setting");

    let metar = document.getElementById("metar");

    //just a visual indicator of processing
    publishResults(1);
    //disable further requests
    get_weather_button.disabled = true;
    airport.disabled = true;
    
    let METARurl = 'https://avwx.rest/api/metar/';
    let StationUrl = 'https://avwx.rest/api/station/';

    let airport_code = airport.value.toLowerCase().trim();
    if (airport_code.length > 4 || airport_code.length < 3) {
        alert("Airport Identifier must be 3-4 characters long.");
        return;
    }

    METARurl += airport_code + "?filter=raw,temperature,altimeter,value";
    StationUrl += airport_code + "?filter=elevation_ft"

    //http requests
    let WX_results_count = 0;
    //let METARJSON = JSON.parse(json);
    const Http1 = new XMLHttpRequest();
    const Http2 = new XMLHttpRequest();

    //first request for metar
    Http1.open("GET", METARurl);
    Http1.setRequestHeader('Authorization', AVWXAuth);
    Http1.send();
    
    Http1.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status==200) {//http request valid
                WX_results_count++;

                //set temp and altimeter setting
                let response = JSON.parse(this.responseText);
                field_temperature.value = response.temperature.value;
                altimeter_setting.value = response.altimeter.value;
                metar.innerHTML = response.raw;

                //disable further data collection from user
                field_temperature.disabled = true;
                altimeter_setting.disabled = true;

            } else {//http request status fail
                WX_results_count--;
            }
            publishResults(WX_results_count);
        }
    }

    //second request for statin elevation
    Http2.open("GET", StationUrl);
    Http2.setRequestHeader('Authorization', AVWXAuth);
    Http2.send();
    
    Http2.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status==200) {//http request valid
                WX_results_count++;

                //set field elevation
                let response = JSON.parse(this.responseText);
                field_elevation.value = response.elevation_ft;

                //disable further data collection from user
                field_elevation.disabled = true;

            } else {//http request status fail
                WX_results_count--;
            }
            publishResults(WX_results_count);
        }
    }

    
}
function publishResults(results_count) {//a value of -1 or -1 will set the results to precessing. a value of 0 means partial data collection, a value of 2 means success. A value of -2 means failure.
    const color_neutral = "#7a7a7a";
    const color_fail = "#b8352c";
    const color_success = "#29781d";

    let WX_results = document.getElementById("weatherResults");

    WX_results.style.color = color_fail;
    if (results_count == 1 || results_count == -1) {
        WX_results.innerHTML = "Collecting Weather Data...";
        WX_results.style.color = color_neutral;
    } else if (results_count == 2) {
        WX_results.innerHTML = "Weather Successfully Retrieved";
        WX_results.style.color = color_success;
        addClearButton();
    } else if (results_count == 0) {
        WX_results.innerHTML = "Weather Partially Retrieved";
        addClearButton();
    } else if (results_count == -2) {
        WX_results.innerHTML = "Weather Collection Failed";
        addClearButton();
    }
}
function addClearButton() {//adds the clear button
    let clearWeather = document.getElementById("clearWeather");
    clearWeather.style.display = "block";
}
function clearWeather() {//resets all weather data and allows adding new data
    
    let clearWeather = document.getElementById("clearWeather");
    let airport = document.getElementById("airport");
    let get_weather_button = document.getElementById("weatherButton");
    let field_elevation = document.getElementById("field_elevation");
    let field_temperature = document.getElementById("field_temperature");
    let altimeter_setting = document.getElementById("altimeter_setting");
    
    let metar = document.getElementById("metar");
    let WX_results = document.getElementById("weatherResults");

    clearWeather.style.display = "none";//remove clear weather button
    airport.value = "";
    airport.disabled = false;
    get_weather_button.disabled = false;

    field_elevation.disabled = false;
    field_temperature.disabled = false;
    altimeter_setting.disabled = false;

    field_elevation.value = "";
    field_temperature.value = "";
    altimeter_setting.value = "";

    metar.innerHTML = "";
    WX_results.innerHTML = "&nbsp;"

}