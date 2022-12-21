export class TemperaturesList {
    //TODO similar to EmployeesList
    #TemperaturesList;
    #Header;
    
    constructor (params) {
        //TODO
        this.#TemperaturesList = document.getElementById (params.idList);
        this.#Header = document.getElementById (params.idHeader);
    }
    showTemperatures(tempArray, requestObject) {
  //(city, [{date, hour, temperature}...]} )
  console.log ("Array for printing", tempArray);
  this.#TemperaturesList.innerHTML = getTemperaturesItems(tempArray);
  this.#Header.innerHTML = getHeaderItems(requestObject);

    }
     
}

function getTemperaturesItems (tempArray) {
    return tempArray.map (e => 
        `<li class="temp-item">
              <div class="temp-item-container">
               <p class="temp-item-paragraph">Date: ${e.date} </p>
                 <p class="temp-item-paragraph">Hour: ${e.time} </p>
                 <p class="temp-item-paragraph">Temperature: ${e.temperature}</p>
                 
              </div>
          </li>`).join('');
   
}

function getHeaderItems(requestObject) {
    return `City: ${requestObject.city} <br> Date from: ${requestObject.dateFrom}  to: ${requestObject.dateTo}` 

}
