export class WeatherDataProcessor {
    #cityGeocodes
    //#requestObject;
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
     //   this.#requestObject = requestObject;
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()), requestObject);
    }
    getUrl (requestObject) { 
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const city = this.#cityGeocodes.filter(element => {
           // console.log ("Url1:", element.city);
            // console.log ("Url2 city:", requestObject.city);
           return element.city == requestObject.city;
          
        })
       // console.log ("Url3:", city);
       // console.log("Url: reqObg", requestObject);
      //  console.log("Url, city[1]", city[0])
      //  console.log("Url, city.[1]", city[0].latitude)
      //  console.log("Url, requestObject.dataFrom", requestObject.dateFrom)
      // const latitude = city[0].latitude;
      //  const longitude = city[0].longitude;
      //  const start_date = requestObject.dateFrom;
     //   const end_date = requestObject.dateTo;
     //   console.log ("Url4: lat, long, from, to -", latitude, longitude, start_date, end_date);
       
        // TODO creates URL for request and returns it
    // URL from string 9
     
const url = `${baseUrl}latitude=${city[0].latitude}&longitude=${city[0].longitude}${baseParams}start_date=${requestObject.dateFrom}&end_date=${requestObject.dateTo}`
console.log ("Url:", url);
return url;
   
    }

    processData(promiseData, requestObject){
        //console.log ("PromDate begin", promiseData);
        let dataProcessing = promiseData.then(data => {
        let dataArr = data.hourly.time.map((element, index) => {
           return {date:element.slice(0,10),
            time:element.slice(11),
            temperature:data.hourly.temperature_2m[index]}
        })
        console.log ("dataArr", dataArr);
        
        return dataArr.filter(element => {
            console.log ("element.time",element.time.slice(0,2));
            return element.time.slice(0,2)>=requestObject.hourFrom && element.time.slice(0,2)<=requestObject.hourTo;
        })
       // return dataArr2;
      //  console.log(data.hourly.time);
      /*
        let res = [];
        let i=0;
        let dataArr = [];
        res = data.hourly.time.reduce ((res, element, index) => {
           let curTime = element.slice(11,13);
          // console.log ("curTime", curTime)
           //console.log("hourFrom", requestObject.hourFrom)
           if (curTime>=requestObject.hourFrom && curTime<=requestObject.hourTo) {
            res [i] = index; i++;
         //   console.log ("index1", res)
           }
           return res;
        }, res);
        console.log ("index", res)
       for (i = 0; i<res.length; i++) {
      dataArr[i] = {
                    date: data.hourly.time[res[i]].slice(0,10),
                    time: data.hourly.time[res[i]].slice(11),
                    temperature: data.hourly.temperature_2m[res[i]]
                 }
               console.log("dataArr[i]", dataArr[i]);
       }
     console.log ("dataArr", dataArr);
     return dataArr; */
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