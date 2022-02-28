// input button for search phone by name
const searchButton = () => {
    const inputField = document.getElementById('input-box');
    const inputText = inputField.value;
    document.getElementById('phone-details').innerHTML = '';
    getPhones.innerHTML = '';
    inputField.value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
        .then(res => res.json())
        .then(data => displayResult(data.data))
}
const displayResult = allPhones => {
    const getPhones = document.getElementById('getPhones');
    getPhones.innerHTML = '';

    // only 20 items,not more than 20
    const phones = allPhones.slice(0, 20);
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card p-3">
        <img src="${phone.image}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title">${phone.phone_name}</h3>
            <h4 class="card-title">${phone.brand}</h4>
            <div class="text-center">
            <button onclick="phoneDetails('${phone.slug}')" class="btn btn-lg btn-primary fw-bold">Details</button>
            </div>
        </div>
    </div>
    `;
        getPhones.appendChild(div);
    });
}
const phoneDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => phoneInfo(data.data))
}
const phoneInfo = info => {
    document.getElementById('phone-details').innerHTML = `
    <div class="card w-50 mx-auto p-3">
    <img src="${info.image}" class="card-img-top img-fluid">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
            the card's content.</p>
    </div>
</div>
    `
}