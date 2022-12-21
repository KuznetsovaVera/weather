export class WeatherDataProcessor {
    #cityGeocodes
   constructor() {
        this.#cityGeocodes =
     [{city: "Rehovot", latitude: 31.046, longitude:34.851},
    {city: "Jerusalem", latitude: 31.461, longitude:35.130}, 
    {city: "Haifa", latitude: 32.491, longitude:35.593},
    {city: "Eilat", latitude: 29.332, longitude:34.565},
    {city: "Tel-Aviv", latitude: 32.045, longitude:34.465}] 
    //TODO fill this array from Internet
    // const baseUrl = "https://api.open-meteo.com/v1/gfs?";
    //const baseParams = "&hourly=temperature_2m&timezone=IST&";
    }
    getData(requestObject) {
        // {city, dateFrom, dateTo, hoursFrom, hoursTo}
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()), requestObject);
    }
    getUrl (requestObject) { 
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const city = this.#cityGeocodes.filter(element => {
           return element.city == requestObject.city;
          
        })
      
        // TODO creates URL for request and returns it URL from string 9
     
const url = `${baseUrl}latitude=${city[0].latitude}&longitude=${city[0].longitude}${baseParams}start_date=${requestObject.dateFrom}&end_date=${requestObject.dateTo}`
console.log ("Url:", url);
return url;
   
    }

    processData(promiseData, requestObject){
      let dataProcessing = promiseData.then(data => {
        let dataArr = data.hourly.time.map((element, index) => {
           return {date:element.slice(0,10),
            time:element.slice(11),
            temperature:data.hourly.temperature_2m[index]}
        })
        console.log ("dataArr - all hours", dataArr);
        
        return dataArr.filter(element => {
             /* V.R. It is better to calculate time once only:
            let time = element.time.slice(0,2);
            return time >= requestObject.hourFrom && time <= requestObject.hourTo;
            */
           
            return element.time.slice(0,2)>=requestObject.hourFrom && element.time.slice(0,2)<=requestObject.hourTo;
        })
       
    }) 
    return dataProcessing;
}
}
/*
this.processData(promiseResponse.then(response => response.json()));
let promisData = promiseResponse.then((response) => response.json());
let dataProcessing = promisData.then(data => console.log(data.hourly.temperature_2m))
let dataProcessing2 = promisData.then(data => console.log(data.hourly.time))
*/