const searchButton = () => {
    const inputField = document.getElementById('input-box');
    const inputText = inputField.value;
    inputField.value = '';
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
        .then(res => res.json())
        .then(data => console.log(data.data))
}