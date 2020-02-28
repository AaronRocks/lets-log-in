let listOfCars = [];
let activeCars = [];

const parseJSON = (xhr, carSelection) => {
  if (xhr.response){
    const obj = JSON.parse(xhr.response);
  
    if (obj.message){
      let messageValueArray = Object.values(obj.message);
      let carValueArray = Object.values(messageValueArray[0]);

      if (messageValueArray[1] === 'cars'){
        let carExist = {
        current: {},
        };
        for (let el = 0; el < carValueArray.length; el++){
          carExist.current = carValueArray[el];
          if (carSelection.options[el] !== undefined){
            if (listOfCars[el].name === carSelection.options[el].label){ 
              continue;
            }
            else{
              let createdCar = document.createElement("option");
              createdCar.label = carExist.current.name;
              createdCar.value = el; // can find reference to obj later in array
              createdCar.class = 'selectedCar';
              carSelection.add(createdCar, carSelection[el]);
            }
          }
          else{ // should only run if the nlist of cars is completely empty
            if (carExist.current.name !== 'undefined'){
              let createdCar = document.createElement("option");
              createdCar.label = carExist.current.name;
              createdCar.value = el; // can find reference to obj later in array
              createdCar.class = 'selectedCar';
              carSelection.appendChild(createdCar);
              listOfCars.push(carExist.current);
            }
          }
        }
        activeCars = []; // every time retrieve list, epty currenty race track
        currentCars = [];
      }
    }
  }
};
  
const handleResponse = (xhr) => {
  const content = document.querySelector('#content');
  const carSelection = document.querySelector('#carSelection');
    
  switch(xhr.status){
    case 200:
      if (content.innerHTML !== 'Car Not Found');
      content.innerHTML = '<b> Success! Retrieved Car </b>';
      break;
    case 201:
      content.innerHTML = '<b> Created Car</b>';
      break;
    case 204:
      content.innerHTML = '<b> Updated Existing Car </b>';
      break;
    case 400:
      content.innerHTML = '<b> Bad Request, Need more info on car </b>';
      break;
    case 404:
      content.innerHTML = `<b> Car Not Found </b>`;
      break;
    default: // 500
      content.innerHTML = '<b> Not Implemented Yet </b>';
      break;
  }  

  parseJSON(xhr, carSelection);
};
  
const sendPost = (e, nameForm) => {
  e.preventDefault();
  
  const nameAction = nameForm.getAttribute('action');
  const nameMethod = nameForm.getAttribute('method');
  
  const nameField = nameForm.querySelector('#nameField').value;
  const colorField = nameForm.querySelector('#colorField').value;
  const speedField = nameForm.querySelector('#speedField').value;
  const specialField = nameForm.querySelector('#specialField').value;
  const powerField = nameForm.querySelector('#powerField').value;
 
  const xhr = new XMLHttpRequest();
  xhr.open(nameMethod, nameAction);
  
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  xhr.onload = () => handleResponse(xhr);
  
  const formData = `name=${nameField}&special=${specialField}&speed=${speedField}&power=${powerField}&color=${colorField}`;
  
  xhr.send(formData);

  let carToSave = {
    name: nameField,
    color: colorField,
    special: specialField,
    speed: speedField,
    power: powerField
  };

  allCars._saveCar(carToSave);
  return false;
};

const sendPostNoForm = (nameField, specialField, speedField, powerField, colorField) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addCar');
  
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  xhr.onload = () => handleResponse(xhr);
  
  const formData = `name=${nameField}&special=${specialField}&speed=${speedField}&power=${powerField}&color=${colorField}`;
  xhr.send(formData);
    
  return false;
}