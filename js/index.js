// input button for search phone by name
const searchButton = () => {
    const inputField = document.getElementById('input-box');
    const inputText = inputField.value;
    document.getElementById('phone-details').innerHTML = '';
    document.getElementById('error').innerText = '';
    getPhones.innerHTML = '';
    // clear input value
    inputField.value = '';
    if (inputText == '') {
        document.getElementById('error').innerText = "Please write phone's name";
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
            .then(res => res.json())
            .then(data => displayResult(data.data))
    }
}
const displayResult = allPhones => {
    if (allPhones.length == 0) {
        document.getElementById('error').innerText = "Phones not found";
    } else {
        const getPhones = document.getElementById('getPhones');
        getPhones.innerHTML = '';

        // only 20 items,not more than 20
        const phones = allPhones.slice(0, 20);
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">Name: ${phone.phone_name}</h3>
                <h4 class="card-title">Brand: ${phone.brand}</h4>
                <div class="text-center mt-4">
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-lg btn-primary fw-bold">Details</button>
                </div>
            </div>
        </div>
        `;
            getPhones.appendChild(div);
            document.getElementById('error').innerText = '';
        });
    }
}
const phoneDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => phoneInfo(data.data))
}
const phoneInfo = info => {
    // console.log(info)
    document.getElementById('phone-details').innerHTML = `
    <div class="card p-3">
    <img src="${info.image}" class="card-img-top img-fluid">
    <div class="card-body">
        <h3 class="card-title">Name: ${info.name}</h3>
        <h4 class="card-title">Release Date: ${info.releaseDate ? info.releaseDate : 'release date not found'}</h4>
        <h4 class="card-title">ChipSet: ${info.mainFeatures.chipSet}</h4>
        <h4 class="card-title">Memory: ${info.mainFeatures.memory}</h4>
        <h4 class="card-title">Storage: ${info.mainFeatures.storage}</h4>
        <h4 class="card-title">Sensors: ${info.mainFeatures.sensors}</h4>
        <h4 class="card-title">Bluetooth: ${info.others.Bluetooth}</h4>
        <h4 class="card-title">GPS: ${info.others.GPS}</h4>
        <h4 class="card-title">NFC: ${info.others.NFC}</h4>
        <h4 class="card-title">Radio: ${info.others.Radio}</h4>
        <h4 class="card-title">USB: ${info.others.USB}</h4>
        <h4 class="card-title">WALAN: ${info.others.WLAN}</h4>
        
    </div>
</div>
    `;
}