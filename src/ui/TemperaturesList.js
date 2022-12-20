export class TemperaturesList {
    //TODO similar to EmployeesList
    #TemperaturesList;
    constructor (idList) {
        //TODO
        this.#TemperaturesList = document.getElementById (idList);
    }
    showTemperatures(tempArray) {
  //(city, [{date, hour, temperature}...]} )
  this.#TemperaturesList.innerHTML = getTemperaturesItems(tempArray)
    }
     
}

function getTemperaturesItems (tempArray) {
    return tempArray.map (e => 
        `<li class="temp-item">
              <div class="temp-item-container">
                 <p class="temp-item-paragraph">City: ${e.city} </p>
                 <p class="temp-item-paragraph">Date From: ${e.dateFrom} </p>
                 <p class="temp-item-paragraph">Date To: ${e.dateTo}</p>
                 <p class="temp-item-paragraph">Hour From: ${e.hourFrom}</p>
                 <p class="temp-item-paragraph">Hour To: ${e.hourTo}</p>
                 <p class="temp-item-paragraph">Temperature: ${e.temperature}</p>
              </div>
          </li>`).join('');
          //!! Hour FROM - TO - ONLY ONE!!
}

