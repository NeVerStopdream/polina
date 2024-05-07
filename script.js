const quoteElement = document.querySelector('.quote');
const picElement = document.querySelector('.pic');
const coverElement = document.querySelector('.cover');
const btn = document.querySelector('.main_button');
const tooltip = document.querySelector('.tooltip');
const nextPage = document.querySelector('.next_page-card');
const previousPage = document.querySelector('.previous_page-card');

function updateQuote() {

  fetch('https://api.kanye.rest')
    .then(res => res.json())
  .then((res) => {
    quoteElement.textContent = res.quote;
  });
}

nextPage.addEventListener('click', () => {
    document.querySelector('.main_description').style.display = 'none';
    document.querySelector('.second_description').style.display = 'flex';
    nextPage.style.display = 'none';
    previousPage.style.display = 'block';
});

previousPage.addEventListener('click', () => {
    document.querySelector('.main_description').style.display = 'flex';
    document.querySelector('.second_description').style.display = 'none';
    nextPage.style.display = 'block';
    previousPage.style.display = 'none';
});

const jsonFile = './names.json'

async function loadJSON() {
    const response = await fetch(jsonFile);
    const data = await response.json();
    return data;
}

// Функция для выбора случайного объекта из массива объектов
function getRandomObject(jsonData) {
    const randomIndex = Math.floor(Math.random() * jsonData.length);
    return jsonData[randomIndex];
}

function updateMarkup(object) {
    quoteElement.textContent = object.name;
    picElement.src = object.path;
    coverElement.textContent = 'Поздравляю, сегодня ты'
}

btn.addEventListener('click', async function () {
    const jsonData = await loadJSON(); // Загружаем JSON данные
    const randomObject = getRandomObject(jsonData); // Выбираем случайный объект
    updateMarkup(randomObject);
    picElement.style.display = 'block';
});