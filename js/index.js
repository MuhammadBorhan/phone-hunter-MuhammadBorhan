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
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
        </div>
    </div>
    `;
        getPhones.appendChild(div);
    });
}