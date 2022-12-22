export class TemperaturesList {

    #TemperaturesList;
    #Header;
    
    constructor (params) {
        this.#TemperaturesList = document.getElementById (params.idList);
        this.#Header = document.getElementById (params.idHeader);
    }

  async showTemperatures(tempArrayPr, requestObject) {
  const dataOut = getTemperaturesItems(tempArrayPr);
 this.#TemperaturesList.innerHTML = await dataOut;
 this.#Header.innerHTML = getHeaderItems(requestObject);

    }
     
}

async  function getTemperaturesItems (tempArrayPr) {
   const tempArray = await  tempArrayPr;
   console.log ("Array for output", tempArray)
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
