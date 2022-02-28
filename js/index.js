const searchButton = () => {
    const inputField = document.getElementById('input-box');
    const inputText = inputField.value;
    inputField.value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
        .then(res => res.json())
        .then(data => displayResult(data.data))
}
const displayResult = allPhones => {
    const getPhones = document.getElementById('getPhones');
    getPhones.innerHTML = '';
    const phones = allPhones.slice(0, 20);
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card p-3">
        <img src="${phone.image}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title">${phone.phone_name}</h3>
            <h4 class="card-title">${phone.brand}</h4>
            <div class="text-center"><button onclick="phoneDetails('')" class="btn btn-lg btn-primary fw-bold">Details</button></div>
        </div>
    </div>
    `;
        getPhones.appendChild(div);
    });
}