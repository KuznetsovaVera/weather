//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03
/*
let latitude = 31.046;
let longitude=34.851;
let start_date="2022-12-18";
let end_date="2022-12-18";
const baseUrl = "https://api.open-meteo.com/v1/gfs?";
const baseParams = "&hourly=temperature_2m&timezone=IST&";
const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`
let promiseResponse = fetch(url);
let promisData = promiseResponse.then((response) => response.json());
let dataProcessing = promisData.then(data => console.log(data.hourly.temperature_2m))
//let dataProcessing2 = promisData.then(data => console.log(data.hourly.time))
*/
/*
function displayUserName (userName) {
    console.log (userName);
}
function getUserNamebyID(id, processFun) {
setTimeout(function(id){
    processFun("user" +id);
}, 5000, id);
}
getUserNamebyID(100,displayUserName);
console.log ("waiting for result...");
*/

import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const params = {/* requared params for form */}

const weatherProcessor = new WeatherDataProcessor();
const dataFrom = new DataForm(params);
const temperatureList = new TemperaturesList ("idList");

DataForm.addHandler ((dataFromForm) => {
     const promisData = weatherProcessor.getData(dataFromForm);
     promisData.then(data => temperatureList.showTemperatures(data))
})
