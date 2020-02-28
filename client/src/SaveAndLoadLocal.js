// variables for local storage
const prefix = 'axf8278-';
let numCarsSaved = 1;
let carKey = prefix + 'car';
let myCurrentCars = {};

let allCars = {
    _saveCar(val){
        // gat all cars already there, and add a new car to the list
        let storedCars = this._load();
        // val is stringified JSON the user endered into the form
        let valToStore = JSON.stringify(val);
        let toStore = storedCars;
        if (storedCars){
            toStore += '|'+ valToStore;
            localStorage.setItem(carKey, toStore);
        }
        else{
            localStorage.setItem(carKey, valToStore);
        }
        //localStorage.setItem(carKey, valToStore);
    },
    _load(){
        let storedCars = localStorage.getItem(carKey); // atempt to retrieve stored cars from sotrage
        if (storedCars) // if stored cars returns something
        {
            myCurrentCars = storedCars;// parse the retruned object of stored cars
        }
        else {
            return null; // no car returned 
        }
        return myCurrentCars; // return new carObjects
    }
};
