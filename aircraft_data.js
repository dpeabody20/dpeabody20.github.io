const AVWXAuth = "dgSyoTMphY16rELRhzhAKAbjT8-rHF-ViWh-V-HFvm8";
const aircraft_callsign = {
    ME: "(Manual Entry)",
    N103UV: "WOLF33",
    N104UV: "WOLF34",
    N105UV: "WOLF35",
    N106UV: "WOLF36",
    N107UV: "WOLF37",
    N108UV: "WOLF38",
    N109UV: "WOLF39",
    N110UV: "WOLF40",
    N112UV: "WOLF42",
    N113UV: "WOLF43",
    N114UV: "WOLF44",
    N115UV: "WOLF45",
    N116UV: "WOLF46",
    N118UV: "WOLF48",
    N119UV: "WOLF49",
    N749DS: "",
    N779US: "WOLF47",
    N793US: "WOLF41",
    N4012X: ""
};

const aircraft_weight = {
    ME: 0,
    N103UV: 1812.00,
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
    N103UV: 97.80,
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
const fuel_max_value = {//true if long range tank
    true: 50,
    false: 40.2
};
const aft_max_cg_value = {//true if long range tank
    true: 100.4,
    false: 102.0
};
const forward_max_cg_value = 94.5

const aircraft_speed_data = {
    weights: [1874, 2205, 2535, 2646],
    Vglide: [60, 68, 73, 76],
    Vy: [54, 60, 66, 67],
    Vcc: [60, 68, 73, 76],
    Vapp: [58, 63, 71, 73]
}

const Va_max = 111;

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

const takeoff_weight_data = {
    weight: [2645.544, 2204.62, 1873.927],//this is the second index of data, which determines the x axis value. or weight of acft. The first index of the data is the line number l=0,1,2, or 3
    data: [
        [2.3724428, 1.1620128, 0.4115462],
        [3.7765416, 1.9124794, 1.3798902],
        [5.9068984, 3.1955352, 2.057731],
        [9.68344, 5.0353888, 3.389204]
    ]
}

const landing_atmospheric_data = {
    altitude: [0, 2000, 4000, 6000, 8000, 10000],
    temp: [-20, -10, 0, 10, 20, 30, 40, 50],
    data: [ //altitude is the first index, temperature is the second
        [4.70522362, 4.89925346, 5.06902957, 5.28731314, 5.48134298, 5.67537282, 5.94216385, 6.16044742],
        [5.0932833, 5.28731314, 5.48134298, 5.74813401, 5.99067131, 6.13619369, 6.40298472, 6.74253694],
        [5.43283552, 5.69962655, 5.99067131, 6.25746234, 6.45149218, 6.69402948, 6.98507424, 7.30037273],
        [5.99067131, 6.28171607, 6.5485071, 6.81529813, 7.0335817, 7.30037273, 7.59141749, 7.90671598],
        [6.49999964, 6.88805932, 7.17910408, 7.44589511, 7.73693987, 8.14925328, 8.63432788, 9.14365621],
        [7.0335817, 7.39738765, 7.68843241, 8.05223836, 8.53731296, 9.04664129]
    ]
}

const landing_weight_data = {
    weight: [2645.544, 2204.62, 1873.927],//this is the second index of data, which determines the x axis value. or weight of acft. The first index of the data is the line number l=0 through 5
    data: [
        [5.67537282, 4.46268632, 3.68656696],
        [6.03917877, 4.89925346, 4.05037291],
        [6.57276083, 5.28731314, 4.38992513],
        [7.22761154, 5.79664147, 4.89925346],
        [7.83395479, 6.3059698, 5.38432806],
        [8.77985026, 6.98507424, 5.89365639]
    ]
}

const fuel_mass = 6.01;//lbs per gallon of fuel
const oil_mass = 1.86; //lbs per qt of oil
const taxi_fuel_burn = 0.5;//in gallons

const takeoff_color = "#40B240";
const landing_color = "#EDE23D";
const zero_color = "#549DC8";

const caution_number_color = "#FF2E2E";
