import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const MIN_HOUR = 0;
const MAX_HOUR = 23;

const params = {idForm:"city_form", idCity: "city",
idDataFrom:"dateFrom",  idDataTo:"dateTo", 
idHourFrom:"hourFrom", idHourTo:"hourTo",
idError:"mes_error", minHour: MIN_HOUR, maxHour:MAX_HOUR}


const weatherProcessor = new WeatherDataProcessor();
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList ({idList:"temp-list", idHeader:"form-title"});


dataForm.addHandler ((dataFromForm) => {
     const promisData = weatherProcessor.getData(dataFromForm);
    promisData.then(data => temperatureList.showTemperatures(data, dataFromForm))
})


