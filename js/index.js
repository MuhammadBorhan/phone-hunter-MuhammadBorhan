// loading spinner toggler
const spinnerToggler = display => {
    document.getElementById('spinner').style.display = display;
}


// input button for search phone by name
const searchButton = () => {
    const inputField = document.getElementById('input-box');
    const inputText = inputField.value;
    spinnerToggler('block')
    document.getElementById('phone-details').innerHTML = '';
    document.getElementById('error').innerText = '';
    getPhones.innerHTML = '';
    // clear input value
    inputField.value = '';
    if (inputText == '') {
        document.getElementById('error').innerText = "Please write phones name";
        spinnerToggler('none')
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
            .then(res => res.json())
            .then(data => displayResult(data.data))
    }
}
const displayResult = allPhones => {
    console.log(allPhones)
    if (allPhones.length == 0) {
        document.getElementById('error').innerText = "Phones not found";
        spinnerToggler('none')
    } else {
        const getPhones = document.getElementById('getPhones');
        getPhones.innerHTML = '';

        // only 20 items,not more than 20
        const phones = allPhones.slice(0, 20);
        phones?.forEach(phone => {
            console.log(phone)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title"><span class="text-info fw-bold">Name:</span> ${phone.phone_name}</h3>
                <h4 class="card-title"><span class="text-info fw-bold">Brand:</span> ${phone.brand}</h4>
                <div class="text-center mt-4">
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-lg btn-primary fw-bold">Details</button>
                </div>
            </div>
        </div>
        `;
            getPhones.appendChild(div);
            document.getElementById('error').innerText = '';
        });
        spinnerToggler('none')
    }
}
const phoneDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => phoneInfo(data.data))
}
//individual phone details
const phoneInfo = info => {
    console.log(info)
    document.getElementById('phone-details').innerHTML = `
    <div class="card p-3">
    <img src="${info.image}" class="card-img-top img-fluid">
    <div class="card-body">
        <h3 class="card-title"><span class="text-info fw-bold">Name:</span> ${info.name}</h3>
        <h4 class="card-title"><span class="text-info fw-bold">Release Date:</span> ${info.releaseDate ? info.releaseDate : 'Release Date Not Found'}</h4>
        <h3 class="text-primary fw-bold">Main-Features</h3>
        <h4 class="card-title"><span class="text-info fw-bold">ChipSet:</span> ${info.mainFeatures.chipSet}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">Memory:</span> ${info.mainFeatures.memory}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">Storage:</span> ${info.mainFeatures.storage}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">Display-Size:</span> ${info.mainFeatures.displaySize}</h4>
        <h4 class="card-title"><span class="text-primary fw-bold">Sensors:</span> ${info.mainFeatures.sensors}</h4>
        <h3 class="text-primary fw-bold">Others</h3>
        <h4 class="card-title"><span class="text-info fw-bold">Bluetooth:</span> ${info?.others?.Bluetooth ? info.others.Bluetooth : 'Not Available'}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">GPS:</span> ${info?.others?.GPS ? info.others.GPS : 'Not Available'}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">NFC:</span> ${info?.others?.NFC ? info.others.NFC : 'Not Available'}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">Radio:</span> ${info?.others?.Radio ? info.others.Radio : 'Not Available'}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">USB:</span> ${info?.others?.USB ? info.others.USB : 'Not Available'}</h4>
        <h4 class="card-title"><span class="text-info fw-bold">WALAN:</span> ${info?.others?.WLAN ? info.others.WLAN : 'Not Available'}</h4>
        
    </div>
</div>
    `;
}