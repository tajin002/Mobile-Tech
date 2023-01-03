const loadPhoneData = (searchText,dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then (phonesData => displayPhones(phonesData.data,dataLimit))
}
const displayPhones = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //display 10 mobile item
    const showAll = document.getElementById('showall');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
   
    //no found phne
    const noPhone = document.getElementById('no-phone-msg');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =
            `<div class="container col">
                <div class="card p-4">
                <img src="${phone.image}" class="card-img-top w-50" alt="...">
                <div class="card-body ">
                    <h3 class="card-title">${phone.brand}</h3>
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <p class="card-text">${phone.slug}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>

                </div>
                </div>
          </div>`;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner
    loadSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start Loader
    processData(10)
});

const processData = (dataLimit) => {
    loadSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhoneData(searchText,dataLimit);
}

const loadSpinner = isLoading => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processData();
});

const loadPhoneDetails = id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data=>displayPhoneDetails(data.data))
}

displayPhoneDetails = phone => {
    const phoneTittle = document.getElementById('phoneModalDetails');
    phoneTittle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Release Date'} </p>
        <p>Main Features : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No mainFeatures'} ${phone.mainFeatures ? phone.mainFeatures.storage : 'No mainFeatures'} </p>
        <p> Display Size : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No displaySize Information'} </p>
        <p> ChipSet : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No displaySize Information'} </p>
    `
}

function darkMode(){
    let element = document.body;
    element.classList.toggle('dark-mode')
}

// loadPhoneDetails();
loadPhoneData('apple')

//<p>Release Date : ${phone.mainFeatures.chipSet} </p>