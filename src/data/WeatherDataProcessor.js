export class WeatherDataProcessor {
    #cityGeocodes
    #periodDate
   constructor() {
        this.#cityGeocodes =
     [{city: "Rehovot", latitude: 31.046, longitude:34.851},
    {city: "Jerusalem", latitude: 31.461, longitude:35.130}, 
    {city: "Haifa", latitude: 32.491, longitude:35.593},
    {city: "Eilat", latitude: 29.332, longitude:34.565},
    {city: "Tel-Aviv", latitude: 32.045, longitude:34.465},
    {city: "Kfar-Saba", latitude: 32.111, longitude:34.543}] 
    this.#periodDate = 17;
        }
    async getData(requestObject) {
        const url = this.getUrl(requestObject);
        const response = await fetch(url);
       const data = await response.json();
       //console.log ("data from json", data);
        return this.processData (data, requestObject);
       
    }
    getUrl (requestObject) { 
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const city = this.#cityGeocodes.filter(element => {
           return element.city == requestObject.city;
          
        })
      
          
const url = `${baseUrl}latitude=${city[0].latitude}&longitude=${city[0].longitude}${baseParams}start_date=${requestObject.dateFrom}&end_date=${requestObject.dateTo}`
console.log ("Url:", url);
return url;
   
    }

    async processData(data, requestObject) {
       // console.log ("prData entry", data);
      
      return  await this.getTempOut (data, requestObject);
  }

getTempOut (data, requestObject) 
{
    let dataArr = data.hourly.time.map((element, index) => {
      return {date:element.slice(0,10),
        time:element.slice(11),
        temperature:data.hourly.temperature_2m[index]}
    })
    console.log ("dataArr - all hours", dataArr);
    
    return dataArr.filter(element => {
        let time = element.time.slice(0,2);
        return time >= requestObject.hourFrom && time <= requestObject.hourTo;
    })
   
}

getMinMaxDate() {
    //TODO
const currentDate = new Date();
const day = currentDate.getDate();
let minMaxDate = {minISODate:currentDate.toISOString().substring(0,10)}
currentDate.setDate(day + this.#periodDate);
minMaxDate.maxISODate = currentDate.toISOString().substring(0,10);
return minMaxDate;
}

getCities() {
    
    return this.#cityGeocodes.map (element => element.city)

}
}
