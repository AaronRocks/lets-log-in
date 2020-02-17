let listOfCars = [];
let activeCars = [];

const parseJSON = (xhr, carSelection) => {
    if (xhr.response){
      const obj = JSON.parse(xhr.response);
      console.dir(obj);
  
      if (obj.message){
        let messageValueArray = Object.values(obj.message);
        let carValueArray = Object.values(messageValueArray[0]);
  
        if (messageValueArray[1] === 'cars')
          for (let el = 0; el < carValueArray.length; el++){
            if (!carSelection.options[el]){
              let createdCar = document.createElement("option");
              createdCar.label = carValueArray[el].name;
              createdCar.value = el; // can find reference to obj later in array
              createdCar.class = 'selectedCar';
              carSelection.appendChild(createdCar);
              listOfCars.push(carValueArray[el]);
            }
            
          }
      }
    }
  };
  
  const handleResponse = (xhr) => {
    const content = document.querySelector('#content');
    const carSelection = document.querySelector('#carSelection');
    
    switch(xhr.status){
      case 200:
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
    const speedField = nameForm.querySelector('#speedField').value;
    const specialField = nameForm.querySelector('#specialField').value;
    const powerField = nameForm.querySelector('#powerField').value;
  
    const xhr = new XMLHttpRequest();
    xhr.open(nameMethod, nameAction);
  
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhr.onload = () => handleResponse(xhr);
  
    const formData = `name=${nameField}&special=${specialField}&speed=${speedField}&power=${powerField}`;
  
    xhr.send(formData);
    
    return false;
  };
  
  function handleForm(){
    // nameform sends a post request
    const nameForm = document.querySelector('#nameForm');
    // user form sends a get request (either body or head)
    // const userForm = document.querySelector("#userForm");
  
    const getCarsButton = document.querySelector("#getCars");
  
        
    const addUser = (e) => sendPost(e, nameForm);
        
    nameForm.addEventListener('submit', addUser);
  
    getCarsButton.onclick =  (_) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", '/getCars');
  
      xhr.setRequestHeader("Accept", 'application/json');
  
      xhr.onload = () => handleResponse(xhr);
  
      xhr.send();
    }
}

const handleInit = () =>{
   // server code
   handleForm();
}

window.onload = handleInit;