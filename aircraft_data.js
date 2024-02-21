const aircraft_weight = {
    ME: 0,
    N103UV: 1767.89,
    N104UV: 1735.86,
    N105UV: 1754.86,
    N106UV: 1771.86,
    N107UV: 1844.80,
    N108UV: 1777.00,
    N109UV: 1813.33,
    N110UV: 1815.90,
    N112UV: 1815.24,
    N113UV: 1815.64,
    N114UV: 1810.04,
    N115UV: 1808.94,
    N116UV: 1808.76,
    N118UV: 1817.35,
    N119UV: 1813.42,
    N749DS: 1799.10,
    N779US: 1789.94,
    N793US: 1800.84,
    N4012X: 1794.56
};
const aircraft_cg = {
    ME: 0,
    N103UV: 96.598,
    N104UV: 96.99,
    N105UV: 96.85,
    N106UV: 97.07,
    N107UV: 98.4,
    N108UV: 96.58,
    N109UV: 97.6,
    N110UV: 97.45,
    N112UV: 97.25,
    N113UV: 97.52,
    N114UV: 97.32,
    N115UV: 97.36,
    N116UV: 97.16,
    N118UV: 97.46,
    N119UV: 97.65,
    N749DS: 98.13,
    N779US: 98.33,
    N793US: 98.01,
    N4012X: 99.22
};
const aircraft_max_landing_weight = {
    ME: 2535,
    N103UV: 2407,
    N104UV: 2407,
    N105UV: 2407,
    N106UV: 2407,
    N107UV: 2535,
    N108UV: 2535,
    N109UV: 2535,
    N110UV: 2535,
    N112UV: 2535,
    N113UV: 2535,
    N114UV: 2535,
    N115UV: 2535,
    N116UV: 2535,
    N118UV: 2535,
    N119UV: 2535,
    N749DS: 2535,
    N779US: 2407,
    N793US: 2535,
    N4012X: 2535
};
const aircraft_max_takeoff_weight = 2646;
const aircraft_utility_category_max_weight = 2161;
const aircraft_long_range_tank = {
    ME: true,
    N103UV: true,
    N104UV: true,
    N105UV: true,
    N106UV: true,
    N107UV: true,
    N108UV: true,
    N109UV: false,
    N110UV: false,
    N112UV: false,
    N113UV: false,
    N114UV: false,
    N115UV: false,
    N116UV: false,
    N118UV: false,
    N119UV: false,
    N749DS: true,
    N779US: true,
    N793US: true,
    N4012X: true
};
//classifies the baggage configuration - See AFM 6-6.
const aircraft_baggage_configuration = {
    ME: "b",
    N103UV: "a",
    N104UV: "a",
    N105UV: "c",
    N106UV: "a",
    N107UV: "c",
    N108UV: "c",
    N109UV: "c",
    N110UV: "c",
    N112UV: "c",
    N113UV: "c",
    N114UV: "c",
    N115UV: "c",
    N116UV: "c",
    N118UV: "c",
    N119UV: "c",
    N749DS: "c",
    N779US: "c",
    N793US: "c",
    N4012X: "c"
};
const station_arm = {
    oil: 39.4,
    front_seats: 90.6,
    rear_seats: 128.0,
    wing_tanks: 103.5,
    standard_baggage_compartment: 143.7,
    standard_baggage_tube: 170.1,
    extended_baggage_forward: 153.1,
    extended_baggage_aft: 178.7,
};
const station_max_value = {//this is the allowable value upper limits for a given station
    standard_baggage_compartment: 66,
    standard_baggage_tube: 11,
    extended_baggage_forward: 100,
    extended_baggage_aft: 40,
    extended_baggage_total: 100
};
const fuel_max_value = {//ture if long range tank
    true: 50,
    false: 40.2
};
const aft_max_cg_value = {//true if long range tank
    true: 100.4,
    false: 102.0
};

const takeoff_atmospheric_data = {//consists of many data points for the first section of the takeoff calculation graph. Linear interpolation is used to find more precice values from this data.
    altitude: [0, 2000, 4000, 6000, 8000, 10000],
    temp: [-20, -10, 0, 10, 20, 30, 40, 50],
    data: [ //altitude is the first index, temperature is the second
        [1.089387, 1.2830558, 1.5977676, 1.8640622, 2.2756084, 2.6387374, 2.9776578, 3.4134126],
        [1.6461848, 1.9124794, 2.2756084, 2.5903202, 3.026075, 3.4618298, 3.9702104, 4.5270082],
        [2.3724428, 2.6871546, 3.0987008, 3.510247, 4.1396706, 4.7448856, 5.325892, 5.9795242],
        [3.0987008, 3.5828728, 4.1396706, 4.84172, 5.5921866, 6.3910704, 7.3594144, 8.5698444],
        [4.0912534, 4.9385544, 5.7858554, 6.7299908, 7.8435864, 9.1750594, 11.2085818, 13.9683622],
        [5.8342726, 6.778408, 7.8435864, 9.1750594, 11.1843732, 13.7262762]
    ]
}

const fuel_mass = 6.01;//lbs per gallon of fuel
const oil_mass = 1.86; //lbs per qt of oil
const taxi_fuel_burn = 0.5;//in gallons

const takeoff_color = "#40B240";
const landing_color = "#EDE23D";
const zero_color = "#549DC8";
