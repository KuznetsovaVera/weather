import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const MIN_HOUR = 0;
const MAX_HOUR = 23;

const weatherProcessor = new WeatherDataProcessor();

const cities = weatherProcessor.getCities();
const minMaxdates = weatherProcessor.getMinMaxDate();
console.log ('cities', cities, 'datas', minMaxdates)


const params = {idForm:"city_form", idCity: "city",
idDataFrom:"dateFrom",  minDate: minMaxdates.minISODate, idDataTo:"dateTo", 
maxDate: minMaxdates.maxISODate, idHourFrom:"hourFrom", idHourTo:"hourTo",
idError:"mes_error", minHour: MIN_HOUR, maxHour:MAX_HOUR, cityList:cities}


const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList ({idList:"temp-list", idHeader:"form-title"});

dataForm.addHandler ((dataFromForm) => {
    const dataFormInp = weatherProcessor.getData(dataFromForm);
   // console.log ("dataForm:", dataFormInp) - Promise
   temperatureList.showTemperatures(dataFormInp, dataFromForm)
 })