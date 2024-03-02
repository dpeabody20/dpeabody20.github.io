
function load() {//called on load of the body
    resize();
    changeAircraft("ME");//'ME' stands for manual entry, which is the default selection.
}
function resize() {//called on resize of the body (window resize)
    let c = document.getElementById("W&B");
    c.style.scale = window.outerWidth / 680;
}
function changeAircraft(new_aircraft) {
    //reference for input elements
    let empty_weight_element = document.getElementById("empty_weight");
    let empty_cg_element = document.getElementById("empty_cg");
    let bag_weight_2_element = document.getElementById("bag_area_2");

    //reference for max value tag elements
    let max_bag_1_element = document.getElementById("max_bag_1");
    let max_bag_2_element = document.getElementById("max_bag_2");
    let max_gal_element = document.getElementById("max_gal");

    let using_preset = !(new_aircraft == "ME");//true when the user doesn't have [Manual Entry] selected
    empty_weight_element.disabled = using_preset;
    empty_cg_element.disabled = using_preset;

    //retrieve weights from the preset constant values
    empty_weight_element.value = aircraft_weight[new_aircraft];
    empty_cg_element.value = aircraft_cg[new_aircraft];

    //display bag limits
    bag_weight_2_element.disabled = false;
    if (aircraft_baggage_configuration[new_aircraft] == "c") {
        max_bag_1_element.innerHTML = "(max " + station_max_value["extended_baggage_forward"] + "lb)";
        max_bag_2_element.innerHTML = "(max " + station_max_value["extended_baggage_aft"] + "lb)";
    } else {
        max_bag_1_element.innerHTML = "(max " + station_max_value["standard_baggage_compartment"] + "lb)";
        if (aircraft_baggage_configuration[new_aircraft] == "b") {
            max_bag_2_element.innerHTML = "(max " + station_max_value["standard_baggage_tube"] + "lb)";
        } else {
            max_bag_2_element.innerHTML = "";
            bag_weight_2_element.disabled = true;
            bag_weight_2_element.value = "";
        }
    }

    //display fuel limits
    max_gal_element.innerHTML = "(max " + fuel_max_value[aircraft_long_range_tank[new_aircraft]] + ")";

}
function calculatePerformance() {

    //data collection variables
    let performance_input_page = document.getElementById("performance_input_page");
    let results_page = document.getElementById("results_page");
    let header = document.getElementById("header");

    let aircraft = document.getElementById("aircraft").value;
    let empty_weight = Number(document.getElementById("empty_weight").value);
    let empty_cg = Number(document.getElementById("empty_cg").value);

    let front_weight = Number(document.getElementById("front_weight").value);
    let front_weight_2 = Number(document.getElementById("front_weight_2").value);
    let rear_weight = Number(document.getElementById("rear_weight").value);
    let rear_weight_2 = Number(document.getElementById("rear_weight_2").value);
    
    let bag_weight = Number(document.getElementById("bag_area_1").value);
    let bag_weight_2 = Number(document.getElementById("bag_area_2").value);

    let fuel = Number(document.getElementById("fuel").value);
    let fuel_use = Number(document.getElementById("fuel_use").value);

    let field_elevation_ele = document.getElementById("field_elevation");
    let field_temperature_ele = document.getElementById("field_temperature");
    let altimeter_setting_ele = document.getElementById("altimeter_setting");

    let field_elevation = Number(field_elevation_ele.value);
    let field_temperature = Number(field_temperature_ele.value);
    let altimeter_setting = Number(altimeter_setting_ele.value);

    let disclaimer = document.getElementById("disclaimer");
    
    //display variables
    let aircraftId = document.getElementById("aircraftId");
    let aircraftCallsign = document.getElementById("aircraftCallsign");

    let da = document.getElementById("da");

    let toWeightText = document.getElementById("toWeightText");
    let ldgWeightText = document.getElementById("ldgWeightText");
    let ZFWeightText = document.getElementById("ZFWeightText");

    let toWeight = document.getElementById("toWeight");
    let ldgWeight = document.getElementById("ldgWeight");
    let ZFWeight = document.getElementById("ZFWeight");

    let toDist = document.getElementById("toDist");
    let toDist50 = document.getElementById("toDist50");
    let ldgDist = document.getElementById("ldgDist");
    let ldgDist50 = document.getElementById("ldgDist50");

    let VglideText = document.getElementById("Vglide");
    let VyText = document.getElementById("Vy");
    let VccText = document.getElementById("Vcc");
    let VaText = document.getElementById("Va");
    let VappText = document.getElementById("Vapp");

    //verify info is valid
    //mostly negative checks here:
    if (empty_weight <= 0) {
        alert("Weight is not a valid value. Must be positive.");
        return;
    }
    if (empty_cg <= 0) {
        alert("Arm is not a valid value. Must be positive.");
        return;
    }
    if ((front_weight < 0) || (front_weight_2 < 0)) {
        alert("Front Seats are not a valid value. Must be positive.");
        return;
    }
    if ((rear_weight < 0) || (rear_weight_2 < 0)) {
        alert("Rear Seats are not a valid value. Must be positive.");
        return;
    }
    if ((bag_weight < 0) || (bag_weight_2 < 0)) {
        alert("Baggage is not a valid value. Must be positive.");
        return;
    }
    if (altimeter_setting.value <= 0) {
        alert("Altimiter setting is not a valid value. Must be positive.");
        return;
    }
    if (!disclaimer.checked) {
        alert("Please check the disclaimer box to continue.");
        return;
    }
    //check bag and fuel max
    let max_bag_weight_1 = 0;
    let max_bag_weight_2 = 0;
    if (aircraft_baggage_configuration[aircraft] == "c") {
        max_bag_weight_1 = station_max_value["extended_baggage_forward"];
        max_bag_weight_2 = station_max_value["extended_baggage_aft"];
        if (bag_weight + bag_weight_2 > station_max_value["extended_baggage_total"]) {
            alert("Baggage exceeds maximum station weight. Forward and aft cannot be greater than 100lb combined. AFM 2-11");
            return;
        }
    } else {
        max_bag_weight_1 = station_max_value["standard_baggage_compartment"];
        max_bag_weight_2 = station_max_value["standard_baggage_tube"];
    }
    if ((bag_weight > max_bag_weight_1) || (bag_weight_2 > max_bag_weight_2)) {
        alert("Baggage exceeds maximum station weight. AFM 2-11");
        return;
    }
    if (fuel > fuel_max_value[aircraft_long_range_tank[aircraft]]) {
        alert("Fuel quantity exceeds limits.");
        return;
    }
    //TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED - TEMPORARY DIABLED
    if (fuel < 5) {
        alert("Fuel must be at least 5 gallons to calculate performance.");
        return;
    }
    if (fuel_use > fuel) {
        alert("Fuel use is greater than fuel available.");
        return;
    }
    if (fuel_use < 5) {//this won't ruin the calculation, but it will just go ahead and assume 5 gallons of fuel use for the trip, which is also the min aobut to calculate performance.
        fuel_use = 5;
    }
    if (field_elevation < -1000 || field_elevation > 12000) {
        alert("Field Elevation must be within the bounds [-1000, 12000]");
        return;
    }
    if (field_temperature < -40 || field_temperature > 50) {
        alert("Temperature must be within the bounds [-40, 50]");
        return;
    }
    if (altimeter_setting < 29 || altimeter_setting > 31) {
        alert("Altimiter setting must be within the bounds [29.01, 30.99]");
        return;
    }
    //blank checks
    if (field_elevation_ele.value == "") {
        alert("Field Elevation cannot be blank.");
        return;
    }
    if (field_temperature_ele.value == "") {
        alert("Field Temperature cannot be blank.");
        return;
    }

    //compute weight and balance
    let total_ZF_weight = empty_weight + front_weight + front_weight_2 + rear_weight + rear_weight_2 + bag_weight + bag_weight_2 - (2*oil_mass);
    let total_ramp_weight =  total_ZF_weight + (fuel*fuel_mass);
    let total_takeoff_weight = total_ramp_weight - (taxi_fuel_burn * fuel_mass);
    let total_landing_weight = total_ramp_weight - (fuel_use*fuel_mass);

    let ZF_moment = (empty_weight * empty_cg) + ((front_weight+front_weight_2) * station_arm["front_seats"]) + ((rear_weight+rear_weight_2) * station_arm["rear_seats"]) - (2*oil_mass*station_arm["oil"]);

    if (aircraft_baggage_configuration[aircraft] == "c") {
        ZF_moment += (bag_weight * station_arm["extended_baggage_forward"]) + (bag_weight_2 * station_arm["extended_baggage_aft"]);
    } else {
        ZF_moment += (bag_weight * station_arm["standard_baggage_compartment"]) + (bag_weight_2 * station_arm["standard_baggage_tube"]);
    }

    let ramp_moment = ZF_moment + (fuel * fuel_mass * station_arm["wing_tanks"]);
    let takeoff_moment = ramp_moment - (taxi_fuel_burn * fuel_mass * station_arm["wing_tanks"]);
    let landing_moment = ramp_moment - (fuel_use * fuel_mass * station_arm["wing_tanks"]);

    let ZF_cg = ZF_moment / total_ZF_weight;
    //let ramp_cg = ramp_moment / total_ramp_weight;
    let takeoff_cg = takeoff_moment / total_takeoff_weight;
    let landing_cg = landing_moment / total_landing_weight;

    //verify weight and balance is within limits
    let WBFlag = false;
    if (total_takeoff_weight > aircraft_max_takeoff_weight) {
        alert("Takeoff weight is beyond maximum.");
        toWeightText.style.color = caution_number_color;
        WBFlag = true;
    } else {
        toWeightText.style.color = "";
    }
    if (total_landing_weight > aircraft_max_landing_weight[aircraft]) {
        alert("Landing weight is beyond maximum.");
        ldgWeightText.style.color = caution_number_color;
        WBFlag = true;
    } else {
        ldgWeightText.style.color = "";
    }
    //forward CG limit
    if (takeoff_cg < forward_max_cg_value || ZF_cg < forward_max_cg_value || total_takeoff_weight > ((156.452 * takeoff_cg) - 12623.678) || total_ZF_weight > ((156.452 * ZF_cg) - 12623.678)) {
        alert("Aircraft is beyond forward CG limit.");
        WBFlag = true;
    }
    //aft CG limit
    if (takeoff_cg > aft_max_cg_value[aircraft_long_range_tank[aircraft]] || ZF_cg > aft_max_cg_value[aircraft_long_range_tank[aircraft]]) {
        alert("Aircraft is beyond aft CG limit.");
        WBFlag = true;
    }

    //---COMPUTE PERFORMANCE---
    let isa_temperature = 15 - (field_elevation * 0.002);
    let pressure_altitude = field_elevation + ((altimeter_setting - 29.92) * -930);
    let density_altitude = pressure_altitude + (118.8 * (field_temperature - isa_temperature));
    
    //takeoff
    //let takeoff_atmospheric_parameter = (0.183908 * Math.exp(0.000303751 * pressure_altitude) + 3.34675) * Math.exp((0.00695801 * Math.exp(0.0000987383 * pressure_altitude) + 0.00108574) * field_temperature) + (0.00028 * pressure_altitude) - 2;
    
    //console.log("atmospheric parameter: " + takeoff_atmospheric_parameter);

    //TAKEOFF DISTANCE
    //this finds the two closest pressure altitude and temperature values in the available dataset to linearly interpolate from
    let pressure_index_1 = 0;
    let pressure_index_2 = takeoff_atmospheric_data["altitude"].length - 1;
    //find lower bound for pressure
    for (let i = 0; i < takeoff_atmospheric_data["altitude"].length - 1; i++) {
        if (pressure_altitude >= takeoff_atmospheric_data["altitude"][i]) {
            pressure_index_1 = i;
        }
    }
    //find upper bound for pressure
    for (let i = takeoff_atmospheric_data["altitude"].length - 1; i > 0; i--) {
        if (pressure_altitude < takeoff_atmospheric_data["altitude"][i]) {
            pressure_index_2 = i;
        }
    }
    let temp_index_1 = 0;
    let temp_index_2 = takeoff_atmospheric_data["temp"].length - 1;
    //find lower bound for pressure
    for (let i = 0; i < takeoff_atmospheric_data["temp"].length - 1; i++) {
        if (field_temperature >= takeoff_atmospheric_data["temp"][i]) {
            temp_index_1 = i;
        }
    }
    //find upper bound for pressure
    for (let i = takeoff_atmospheric_data["temp"].length - 1; i > 0; i--) {
        if (field_temperature < takeoff_atmospheric_data["temp"][i]) {
            temp_index_2 = i;
        }
    }
    //linearly interpolate to find takeoff parameter for both the higher and lower altitude lines.
    let lower_atmospheric_parameter = linear_interpolate(takeoff_atmospheric_data["temp"][temp_index_1], takeoff_atmospheric_data["temp"][temp_index_2], takeoff_atmospheric_data["data"][pressure_index_1][temp_index_1], takeoff_atmospheric_data["data"][pressure_index_1][temp_index_2], field_temperature);
    let upper_atmospheric_parameter = 0;
    if (field_temperature >= 30 && pressure_altitude >= 8000) { //this is an edge case since we don't have data beyond 30C for the 10000 line
        upper_atmospheric_parameter = linear_interpolate(takeoff_atmospheric_data["temp"][4], takeoff_atmospheric_data["temp"][5], takeoff_atmospheric_data["data"][pressure_index_2][4], takeoff_atmospheric_data["data"][pressure_index_2][5], field_temperature);
    } else {//this will run most of the time for sure!
        upper_atmospheric_parameter = linear_interpolate(takeoff_atmospheric_data["temp"][temp_index_1], takeoff_atmospheric_data["temp"][temp_index_2], takeoff_atmospheric_data["data"][pressure_index_2][temp_index_1], takeoff_atmospheric_data["data"][pressure_index_2][temp_index_2], field_temperature);
    }
    //now interpolate between 2 pressure altitude lines to find the parameter
    let takeoff_atmospheric_parameter = linear_interpolate(takeoff_atmospheric_data["altitude"][pressure_index_1], takeoff_atmospheric_data["altitude"][pressure_index_2], lower_atmospheric_parameter, upper_atmospheric_parameter, pressure_altitude);
    
    if (takeoff_atmospheric_parameter > 13) {//check that a safe takeoff can be made
        alert("Density altitude is too high for a predictable takeoff distance under any weight.");
        return;
    }

    //CALCULATE TAKEOFF WEIGHT PARAMETER
    //first which secions of line should we use
    let weight_index_1 = 0;
    let weight_index_2 = 2;
    if (total_takeoff_weight > takeoff_weight_data["weight"][1]) {
        weight_index_2 = 1;
    } else {
        weight_index_1 = 1;
    }
    //now find which two lines we should use for interpolating between.
    let weight_line_index_1 = 0;
    let weight_line_index_2 = 3;
    //find lower weight line
    for (let i = 0; i < takeoff_weight_data["data"].length - 1; i++) {
        if (takeoff_atmospheric_parameter >= takeoff_weight_data["data"][i][0]) {
            weight_line_index_1 = i;
        }
    }
    //find upper weight line
    for (let i = takeoff_weight_data["data"].length - 1; i > 0; i--) {
        if (takeoff_atmospheric_parameter < takeoff_weight_data["data"][i][0]) {
            weight_line_index_2 = i;
        }
    }
    let bottom_weight_line_parameter = linear_interpolate(takeoff_weight_data["weight"][weight_index_1], takeoff_weight_data["weight"][weight_index_2], takeoff_weight_data["data"][weight_line_index_1][weight_index_1], takeoff_weight_data["data"][weight_line_index_1][weight_index_2], total_takeoff_weight);
    let top_weight_line_parameter = linear_interpolate(takeoff_weight_data["weight"][weight_index_1], takeoff_weight_data["weight"][weight_index_2], takeoff_weight_data["data"][weight_line_index_2][weight_index_1], takeoff_weight_data["data"][weight_line_index_2][weight_index_2], total_takeoff_weight);
    //this is just finding how far our parameter is between our weight lines, and using that same percentage to follow the line down to our weight. (linear interpolation)
    let takeoff_distance_parameter = (((takeoff_atmospheric_parameter - takeoff_weight_data["data"][weight_line_index_1][0]) / (takeoff_weight_data["data"][weight_line_index_2][0] - takeoff_weight_data["data"][weight_line_index_1][0])) * (top_weight_line_parameter - bottom_weight_line_parameter)) + bottom_weight_line_parameter;
    //offical takeoff distance
    let takeoff_distance = (328.084 * takeoff_distance_parameter) + 328.084;
    //now calculate over 50 foot obsticle
    let takeoff_distance_50 = (459.318 * takeoff_distance_parameter) + 590.551;
    
    //warning if takeoff distance is off the charts
    toDist.style.color = "";
    toDist50.style.color = "";
    if (takeoff_distance < 328.084 || takeoff_distance_50 > 4593.176) {
        alert("CAUTION: Takeoff Distance is outside of predictable range. Values displayed may be unreliable");
        toDist.style.color = caution_number_color;
        toDist50.style.color = caution_number_color;
    }

    //LANDING DISTANCE
    //Pressure and temperature indecies as calculated before are still completely valid

    //linearly interpolate to find takeoff parameter for both the higher and lower altitude lines.
    lower_atmospheric_parameter = linear_interpolate(landing_atmospheric_data["temp"][temp_index_1], landing_atmospheric_data["temp"][temp_index_2], landing_atmospheric_data["data"][pressure_index_1][temp_index_1], landing_atmospheric_data["data"][pressure_index_1][temp_index_2], field_temperature);
    upper_atmospheric_parameter = 0;
    if (field_temperature >= 30 && pressure_altitude >= 8000) { //this is an edge case since we don't have data beyond 30C for the 10000 line
        upper_atmospheric_parameter = linear_interpolate(landing_atmospheric_data["temp"][4], landing_atmospheric_data["temp"][5], landing_atmospheric_data["data"][pressure_index_2][4], landing_atmospheric_data["data"][pressure_index_2][5], field_temperature);
    } else {//this will run most of the time for sure!
        upper_atmospheric_parameter = linear_interpolate(landing_atmospheric_data["temp"][temp_index_1], landing_atmospheric_data["temp"][temp_index_2], landing_atmospheric_data["data"][pressure_index_2][temp_index_1], landing_atmospheric_data["data"][pressure_index_2][temp_index_2], field_temperature);
    }
    //now interpolate between 2 pressure altitude lines to find the parameter
    let landing_atmospheric_parameter = linear_interpolate(landing_atmospheric_data["altitude"][pressure_index_1], landing_atmospheric_data["altitude"][pressure_index_2], lower_atmospheric_parameter, upper_atmospheric_parameter, pressure_altitude);
    
    if (landing_atmospheric_parameter > 13) {//check that a safe landing can be made
        alert("Density altitude is too high for a predictable landing distance under any weight.");
        return;
    }

    //CALCULATE LANDING WEIGHT PARAMETER
    //weight_index_1 and 2 are already calculated
    //now find which two lines we should use for interpolating between.
    weight_line_index_1 = 0;
    weight_line_index_2 = 5;
    //find lower weight line
    for (let i = 0; i < landing_weight_data["data"].length - 1; i++) {
        if (landing_atmospheric_parameter >= landing_weight_data["data"][i][0]) {
            weight_line_index_1 = i;
        }
    }
    //find upper weight line
    for (let i = landing_weight_data["data"].length - 1; i > 0; i--) {
        if (landing_atmospheric_parameter < landing_weight_data["data"][i][0]) {
            weight_line_index_2 = i;
        }
    }
    bottom_weight_line_parameter = linear_interpolate(landing_weight_data["weight"][weight_index_1], landing_weight_data["weight"][weight_index_2], landing_weight_data["data"][weight_line_index_1][weight_index_1], landing_weight_data["data"][weight_line_index_1][weight_index_2], total_takeoff_weight);
    top_weight_line_parameter = linear_interpolate(landing_weight_data["weight"][weight_index_1], landing_weight_data["weight"][weight_index_2], landing_weight_data["data"][weight_line_index_2][weight_index_1], landing_weight_data["data"][weight_line_index_2][weight_index_2], total_takeoff_weight);
    //this is just finding how far our parameter is between our weight lines, and using that same percentage to follow the line down to our weight. (linear interpolation)
    let landing_distance_parameter = (((landing_atmospheric_parameter - landing_weight_data["data"][weight_line_index_1][0]) / (landing_weight_data["data"][weight_line_index_2][0] - landing_weight_data["data"][weight_line_index_1][0])) * (top_weight_line_parameter - bottom_weight_line_parameter)) + bottom_weight_line_parameter;
    //offical landing distance
    let landing_distance_50 = (328.084 * landing_distance_parameter) + 328.084;
    //now calculate without 50 foot obsticle (just the roll)
    let landing_distance = (150.736 * landing_distance_parameter) + 150.872;
    
    //warning if landing distance is off the charts
    ldgDist.style.color = "";
    ldgDist50.style.color = "";
    if (landing_distance < 328.084 || landing_distance_50 > 4593.176) {
        alert("CAUTION: Landing Distance is outside of predictable range. Values displayed may be unreliable");
        ldgDist.style.color = caution_number_color;
        ldgDist50.style.color = caution_number_color;
    }
    
    
    //CALCULATE V SPEEDS
    //first get weight bracket
    weight_index_1 = 0;//reusing weight_index variables. I know, im a terrible programmer, but somehow the job gets done.
    weight_index_2 = aircraft_speed_data["weights"].length - 1;
    //find lower weight boundary
    for (let i = 0; i < aircraft_speed_data["weights"].length - 1; i++) {
        if (total_takeoff_weight >= aircraft_speed_data["weights"][i]) {
            weight_index_1 = i;
        }
    }
    //find upper weight boundary
    for (let i = aircraft_speed_data["weights"].length - 1; i > 0; i--) {
        if (total_takeoff_weight < aircraft_speed_data["weights"][i]) {
            weight_index_2 = i;
        }
    }

    let lower_weight = aircraft_speed_data["weights"][weight_index_1];
    let upper_weight = aircraft_speed_data["weights"][weight_index_2];
    //now calculate our speeds using liner interpolation
    let Vglide = linear_interpolate(lower_weight, upper_weight, aircraft_speed_data["Vglide"][weight_index_1], aircraft_speed_data["Vglide"][weight_index_2], total_takeoff_weight);
    let Vy = linear_interpolate(lower_weight, upper_weight, aircraft_speed_data["Vy"][weight_index_1], aircraft_speed_data["Vy"][weight_index_2], total_takeoff_weight);
    let Vcc = linear_interpolate(lower_weight, upper_weight, aircraft_speed_data["Vcc"][weight_index_1], aircraft_speed_data["Vcc"][weight_index_2], total_takeoff_weight);
    let Vapp = linear_interpolate(lower_weight, upper_weight, aircraft_speed_data["Vapp"][weight_index_1], aircraft_speed_data["Vapp"][weight_index_2], total_takeoff_weight);
    //calculate Va using the formula below
    let Va = Va_max * Math.sqrt(total_landing_weight / aircraft_max_takeoff_weight);
    
    //---DISPLAY PERFORMANCE---
    //header
    let date = new Date();
    header.innerHTML = "<button onclick='back()' style='font-size: 2.35vw; padding: 0.7vw 1.5vw;'>←Go Back</button>&nbsp;Generated " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + "Z [You may screenshot this page]";
    
    //ID
    aircraftId.innerHTML = aircraft;
    aircraftCallsign.innerHTML = aircraft_callsign[aircraft];

    //Density altitude
    da.innerHTML = Math.round(density_altitude);
    da.style.color = "";
    if (density_altitude >= 5000) {
        da.style.color = landing_color;
    }
    
    //weight and balance chart
    draw_weight_and_balance_setting();
    draw_envelope(aircraft, WBFlag);
    draw_aircraft(total_takeoff_weight, takeoff_cg, total_landing_weight, landing_cg, total_ZF_weight, ZF_cg, aircraft);
    
    //weight and balance numbers
    toWeight.innerHTML = Math.round(total_takeoff_weight);
    ldgWeight.innerHTML = Math.round(total_landing_weight);
    ZFWeight.innerHTML = Math.round(total_ZF_weight);

    toWeight.style.color = takeoff_color;
    ldgWeight.style.color = landing_color;
    ZFWeight.style.color = zero_color;
    
    //v speeds
    VglideText.innerHTML = Math.round(Vglide);
    VyText.innerHTML = Math.round(Vy);
    VccText.innerHTML = Math.round(Vcc);
    VaText.innerHTML = Math.round(Va);
    VappText.innerHTML = Math.round(Vapp);

    //takeoff and landing performance numbers (AND ROUND UP TO NEAREST TENS PLACE)
    toDist.innerHTML = takeoff_distance + 10 - (takeoff_distance % 10);
    toDist50.innerHTML = takeoff_distance_50  + 10 - (takeoff_distance_50 % 10);
    ldgDist.innerHTML = landing_distance + 10 - (landing_distance % 10);
    ldgDist50.innerHTML = landing_distance_50  + 10 - (landing_distance_50 % 10);

    //show the div!
    performance_input_page.style.display = "none";
    results_page.style.display = "block";
    //adjust viewport
    //document.getElementById("viewport"). setAttribute("content", "width=700, user-scalable=0");
    

}


function back() {//goes back to the page where you can input information.
    performance_input_page.style.display = "block";
    results_page.style.display = "none";
    document.getElementById("viewport"). setAttribute("content", "width=device-width, initial-scale=1, user-scalable=1");
}


function linear_interpolate(x1, x2, y1, y2, x) {
    return (((y2-y1)/(x2-x1)) * (x - x1)) + y1;
}
function tx(x) {//convert x value in in to px of the canvas
    return (x-93)*32 + 60;
}
function ty(y) {//convert x value in lb to px of the canvas
    return 260 - ((y-1600)*0.183);
}




function draw_aircraft(to_weight, to_cg, ldg_weight, ldg_cg, zero_weight, zero_cg, aircraft) {
    let c = document.getElementById("W&B");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([]);
    

    
    //line connecting cgs for fuel
    ctx.beginPath();
    ctx.moveTo(tx(to_cg),ty(to_weight));
    ctx.lineTo(tx(ldg_cg),ty(ldg_weight));
    ctx.lineTo(tx(zero_cg),ty(zero_weight));
    ctx.stroke();

    ctx.lineWidth = 4;
    //takeoff
    ctx.strokeStyle = "#40B240";
    ctx.beginPath();
    ctx.arc(tx(to_cg),ty(to_weight), 2, 0, 2 * Math.PI);
    ctx.stroke();

    //landing
    ctx.strokeStyle = "#EDE23D";
    ctx.beginPath();
    ctx.arc(tx(ldg_cg),ty(ldg_weight), 2, 0, 2 * Math.PI);
    ctx.stroke();

    //zero fuel
    ctx.strokeStyle = "#549DC8";
    ctx.beginPath();
    ctx.arc(tx(zero_cg),ty(zero_weight), 2, 0, 2 * Math.PI);
    ctx.stroke();
}
function draw_envelope(aircraft, WBFlag) {//draws the envelope on the graph based on whether it's a long range tank or not.
    let c = document.getElementById("W&B");
    let ctx = c.getContext("2d");
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 15]);
    ctx.font = "12px Arial";
    ctx.fillStyle = "#FF9EFF";
    ctx.strokeStyle = "#FF9EFF";

    let aft_max_cg = aft_max_cg_value[aircraft_long_range_tank[aircraft]];
    let xpos = 286;
    if (aircraft_long_range_tank[aircraft]) {
        xpos = 305;
    }

    //utility max line
    ctx.beginPath();
    ctx.moveTo(tx(93),ty(aircraft_utility_category_max_weight));
    ctx.lineTo(tx(103),ty(aircraft_utility_category_max_weight));
    ctx.stroke();
    ctx.fillText("Utility Max", xpos, ty(aircraft_utility_category_max_weight)+14);

    //landing max line
    ctx.fillStyle = "#73C3DA";
    ctx.strokeStyle = "#73C3DA";
    ctx.beginPath();
    ctx.moveTo(tx(93),ty(aircraft_max_landing_weight[aircraft]));
    ctx.lineTo(tx(103),ty(aircraft_max_landing_weight[aircraft]));
    ctx.stroke();
    ctx.fillText("Landing Max", 70, ty(aircraft_max_landing_weight[aircraft])+14);

    //takeoff max line
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(tx(93),ty(aircraft_max_takeoff_weight));
    ctx.lineTo(tx(103),ty(aircraft_max_takeoff_weight));
    ctx.stroke();
    ctx.fillText("Takeoff Max", 70, ty(aircraft_max_takeoff_weight)+14);

    //envelope
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    if (WBFlag) {
        ctx.strokeStyle = caution_number_color;
    }
    ctx.beginPath();
    ctx.moveTo(tx(forward_max_cg_value),ty(1720));
    ctx.lineTo(tx(forward_max_cg_value),ty(2161));
    ctx.lineTo(tx(97.6),ty(2646));
    ctx.lineTo(tx(aft_max_cg),ty(2646));
    ctx.lineTo(tx(aft_max_cg),ty(1720));
    ctx.lineTo(tx(forward_max_cg_value),ty(1720));
    ctx.stroke();
}
function draw_weight_and_balance_setting() {//400x300 canvas cg 93-103 (10range over 320px = 32px/in). weight 1600-2800 (1200 range over 220px = 0.183px per lb)
    let c = document.getElementById("W&B");
    let ctx = c.getContext("2d");
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.font = "15px Arial";
    ctx.setLineDash([]);

    ctx.clearRect(0,0,400,300);

    ctx.beginPath();
    ctx.moveTo(tx(103),ty(1600));
    ctx.lineTo(tx(93),ty(1600));
    ctx.lineTo(tx(93),ty(2800));
    

    //horizontal axis
    ctx.fillText("GC pos. (in)", 150, 295);
    for (let i = 94; i< 103; i+=2) {
        //ctx.moveTo(tx(i),ty(lb));
        //ctx.lineTo(tx(i),ty(ub));
        ctx.fillText(i, tx(i)-10, ty(1600)+18);
    }

    //vertical axis
    ctx.fillText("Weight (lb)", 5, 20);
    for (let i = 8; i<= 14; i++) {
        //ctx.moveTo(tx(lb),ty(i*200));
        //ctx.lineTo(tx(ub),ty(i*200));
        ctx.fillText(i*200, tx(93)-40, ty(i*200)+5);
    }

    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#555555";
    
    let ub = 2800;
    let lb = 1600;
    for (let i = 94; i<= 103; i++) {
        ctx.moveTo(tx(i),ty(lb));
        ctx.lineTo(tx(i),ty(ub));
    }
    

    ub = 103;
    lb = 93;
    for (let i = 9; i<= 14; i++) {
        ctx.moveTo(tx(lb),ty(i*200));
        ctx.lineTo(tx(ub),ty(i*200));
    }
    ctx.stroke();
    
}
