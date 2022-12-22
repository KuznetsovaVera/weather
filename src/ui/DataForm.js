import { showErrorMessage } from "./errorMessage.js"
export class DataForm {
    #formElement
    #cityElement
    #dateFromElement
    #dateToElement
    #hourFromElement
    #hourToElement
    #errorMessageElement
    #minHour
    #maxHour
    #hourFrom
    #hourTo
    #dateFrom
    #dateTo
    #citiesArray

constructor (params) {
   
    this.#formElement = document.getElementById(params.idForm);
    this.#cityElement = document.getElementById(params.idCity);
    this.#dateFromElement = document.getElementById(params.idDataFrom);
    this.#dateFromElement.min = params.minDate;
    this.#dateFromElement.max = params.maxDate;
    this.#dateToElement = document.getElementById(params.idDataTo);
    this.#dateToElement.min = params.minDate;
    this.#dateToElement.max = params.maxDate;
    this.#hourFromElement = document.getElementById(params.idHourFrom);
    this.#hourToElement = document.getElementById(params.idHourTo);
    this.#errorMessageElement = document.getElementById(params.idError);
    this.#minHour = params.minHour;
    this.#maxHour = params.maxHour;
    this.#citiesArray = params.cityList;
    this.#dateFrom = 0;
    this.#dateTo = 0;
    this.#hourFrom = 0;
    this.#hourTo = 0;
    this.onClose();

  }

 addHandler(processFun) {
       
        this.#cityElement.innerHTML += getCitiesItems(this.#citiesArray);
        this.#formElement.addEventListener ("submit", (event) => {
        event.preventDefault();
                    
        const weatherFormObg = {
            city:this.#cityElement.value,
            dateFrom:this.#dateFrom, dateTo:this.#dateTo,
            hourFrom:this.#hourFrom, hourTo:this.#hourTo
                  }
                 
                          
         console.log ("Input form", weatherFormObg);
         processFun(weatherFormObg);
       })
        this.#formElement.addEventListener ("reset", (event) => {
            this.#dateFrom = 0;
            this.#dateTo = 0;
            this.#hourFrom = 0;
            this.#hourTo = 0;
        })
       
}

onClose() {
    this.#dateFromElement.addEventListener("change", (event) => 
           this.validateDateFrom(event.target)
    )
    this.#dateToElement.addEventListener("change", (event) => 
            this.validateDateTo(event.target)
        ) 
    this.#hourFromElement.addEventListener("change", (event) => 
        this.validateHourFrom(event.target)
     )
    this.#hourToElement.addEventListener("change", (event) => 
       this.validateHourTo(event.target)    
       )
    }

    validateDateFrom (element) {
        const value = element.value;
            if (this.#dateTo && value > this.#dateTo) {
                showErrorMessage(element, "Date 'From' must be less than Date 'To'",
                this.#errorMessageElement);
            } else {
                this.#dateFrom = value;
            }
                          }

        validateDateTo (element) {
            const value = element.value;
            if (this.#dateFrom && value < this.#dateFrom) {
                showErrorMessage(element, "Date 'To' must be greater than Date 'From'",
                this.#errorMessageElement);
            }
            this.#dateTo = value;
           }

       

validateHourFrom(element) {
    const value = +element.value;
    if (value < this.#minHour || value > this.#maxHour) 
    { showErrorMessage(element, "Hour 'From' must be from 0 to 23 hours",
    this.#errorMessageElement);}
    else if (this.#hourTo && value > this.#hourTo) {
        showErrorMessage(element, "Hour 'From' must be less than Hour 'To'",
        this.#errorMessageElement);
    } else {
        this.#hourFrom = value;
    }
}

validateHourTo(element) {
    const value = +element.value;
    if (value < this.#minHour || value > this.#maxHour)
    { showErrorMessage(element, "Hour 'To' must be from 0 to 23 hours",
    this.#errorMessageElement);}
    else if (this.#hourFrom && value < this.#hourFrom) {
        showErrorMessage(element, "Hour 'To' must be greater than Hour 'From'",
        this.#errorMessageElement);
    }
    else {
        this.#hourTo = value;
    }
    
   }

}

function getCitiesItems (citiesArray) {
   return citiesArray.map (e => 
        `<option value=${e}>${e}</option>`).join('');
    }