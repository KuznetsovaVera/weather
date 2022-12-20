export class WeatherDataProcessor {
    #cityGeocodes
    constructor() {
        this.#cityGeocodes 
        = [{city: "Rehovot", latitude: 31.046, longitude:34.851},
    {city: "Jerusalaem", latitude: 31.461, longitude:35.130}, 
    {city: "Haifa", latitude: 32.491, longitude:35.593},
    {city: "Eilat", latitude: 29.332, longitude:34.565}] //TODO fill this array from Internet
    }
    getData(requestObject) {
        // {city, dateFrom, dateTo, hoursFrom, hoursTo}
        const url = this.getUrl(requestObject);
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()));
    }
    getUrl (requestObject) { 
        // TODO creates URL for request and returns it
    // URL from string 9
    //const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`
    }
    processData(promiseData){
        return promiseData(data => {
            //TODOreturn{city, objects: [{date, hour, temperature}...]} 
           // 
        })
    }
}