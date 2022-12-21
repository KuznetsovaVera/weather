import { showErrorMessage } from "./errorMessage.js"
export class DataForm {
    //TODO
    #formElement
   // #inputElements
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
//...
constructor (params) {
    //TODO
    this.#formElement = document.getElementById(params.idForm);
   // this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`)
   this.#cityElement = document.getElementById(params.idCity);
    this.#dateFromElement = document.getElementById(params.idDataFrom);
    this.#dateToElement = document.getElementById(params.idDataTo);
    this.#hourFromElement = document.getElementById(params.idHourFrom);
    this.#hourToElement = document.getElementById(params.idHourTo);
    this.#errorMessageElement = document.getElementById(params.idError);
    this.#minHour = params.minHour;
    this.#maxHour = params.maxHour;
    this.#dateFrom = 0;
    this.#dateTo = 0;
    this.#hourFrom = 0;
    this.#hourTo = 0;
    this.onClose();

  }
addHandler(processFun) {
        //TODO
       this.#formElement.addEventListener ("submit", (event) => {
        event.preventDefault();
        console.log ("1 - submitted form");
       // console.log ("1-1", this.#inputElements);
       
        const weatherFormObg = {
         city:this.#cityElement.value,
          // city: "Tel-Aviv", 
            dateFrom:this.#dateFrom, dateTo:this.#dateTo,
            hourFrom:this.#hourFrom, hourTo:this.#hourTo
                  }
                 
                 
                
         console.log ("2", weatherFormObg);
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
    this.#dateFromElement.addEventListener("change", (event) => {
        console.log ("3 dateFrom", event.target.value);
        this.validateDateFrom(event.target);
    })
    this.#dateToElement.addEventListener("change", (event) => {
        console.log ("4 dateTo", event.target.value);
            this.validateDateTo(event.target);
        }) 
    this.#hourFromElement.addEventListener("change", (event) => {
        console.log ("5 hourFrom", event.target.value);
        this.validateHourFrom(event); 
     })
    this.#hourToElement.addEventListener("change", (event) => {
        console.log ("6 hourTo", event.target.value);  
        this.validateHourTo(event);      
       })
    }

    validateDateFrom (element) {
        console.log ("3-2 dateFrom", element.value);
        const value = element.value;
       // let a = element.value;
      //  console.log("3-3", a);
            console.log ("3-1 dateFrom", value);
            if (this.#dateTo && value > this.#dateTo) {
                showErrorMessage(element, "Date 'From' must be less than Date 'To'",
                this.#errorMessageElement);
            } else {
                this.#dateFrom = value;
            }
                          }

        validateDateTo (element) {
            console.log ("4-2 dateTo", element.value);
            const value = element.value;
            console.log ("4-1 dateTo", value);
            if (this.#dateFrom && value < this.#dateFrom) {
                showErrorMessage(element, "Date 'To' must be greater than Date 'From'",
                this.#errorMessageElement);
            }
            this.#dateTo = value;
           }

       

validateHourFrom(event) {
    console.log ("5-2 hourFrom", event.target.value);
    const value = +event.target.value;
    console.log ("5-1 HourFrom", value)
    if (value < this.#minHour || value > this.#maxHour)
    { showErrorMessage(event.target, "Hour 'From' must be from 0 to 23 hours",
    this.#errorMessageElement);}
    else if (this.#hourTo && value > this.#hourFrom) {
        showErrorMessage(event.target, "Hour 'From' must be less than Hour 'To'",
        this.#errorMessageElement);
    } else {
        this.#hourFrom = value;
    }
}

validateHourTo(event) {
    console.log ("6-2 hourTo", event.target.value);  
    const value = +event.target.value;
    ("5-1 HourTo", value)
    if (value < this.#minHour || value > this.#maxHour)
    { showErrorMessage(event.target, "Hour 'To' must be from 0 to 23 hours",
    this.#errorMessageElement);}
    else if (this.#hourFrom && value < this.#hourFrom) {
        showErrorMessage(event.target, "Hour 'To' must be greater than Hour 'From'",
        this.#errorMessageElement);
    }
    else {
        this.#hourTo = value;
    }
    
   }
}


