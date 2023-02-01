const body = document.querySelector('body');
const time = document.querySelector('.time');
const Localedate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const InputName = document.querySelector('.name');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const InputCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    Localedate.textContent = currentDate;
}

function getHours() {
    const date = new Date();
    const hour = date.getHours();
    return hour;
}

function getTimeOfDay() {
    const currentHour = getHours();
    let greetingText;
    if (currentHour >= 6 && currentHour < 12) {
        greetingText = 'morning';
    }
    if (currentHour >= 12 && currentHour < 18) {
        greetingText = 'afternoon';
    }
    if (currentHour >= 18 && currentHour < 24) {
        greetingText = 'evening';
    }
    if (currentHour >= 0 && currentHour < 6) {
        greetingText = 'night';
    }
    return greetingText;
}

function showGreeting() {
    greeting.textContent = 'Good ' + getTimeOfDay() + ',';
}

function setLocalStorage() {
    localStorage.setItem('name', InputName.value);
    localStorage.setItem('city', InputCity.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    InputName.placeholder = '[Введите имя]';
    if (localStorage.getItem('name')) {
        InputName.value = localStorage.getItem('name');
    }
    InputCity.placeholder = '[Введите город]';
    if (localStorage.getItem('city')) {
        InputCity.value = localStorage.getItem('city');
    } else {
        InputCity.value = 'Минск';
    }
    getWeather();
}
window.addEventListener('load', getLocalStorage);

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum(1,20);

function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = String(randomNum).padStart(2, "0");
    const img = new Image();
    img.src = "https://raw.githubusercontent.com/teplokotov/stage1-tasks/assets/images/" + timeOfDay + "/" + bgNum + ".jpg"; 
    img.onload = () => {      
        body.style.backgroundImage = "url('" + img.src + "')";
    }; 
}
setBg();

function getSlideNext() {
    if (randomNum < 20) {
        randomNum++;
    } else {
        randomNum = 1;
    }
    setBg();
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
    } else {
        randomNum = 20;
    }
    setBg();
}
slidePrev.addEventListener('click', getSlidePrev);

async function getWeather() {
    setLocalStorage();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&lang=ru&appid=4c6d3f4acac16b60de8cd757d423e42d&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == 200) {
        weatherIcon.className = 'weather-icon owf';
        weatherError.innerText = '';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/c`;
        humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%`;
    } else {
        if (data.cod == 404) {
            weatherError.innerText = `Ошибка 404:\nгород "${InputCity.value}" не найден!`;
        }
        if (data.cod == 400) {
            weatherError.innerText = `Ошибка 400:\nгород не задан!`;
        }
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}
InputCity.addEventListener('change', getWeather);

async function getQuotes() {  
    const quotes = './assets/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let numOftQuote = Math.floor(Math.random() * data.length);
    quote.textContent = '"' + data[numOftQuote]['text'] + '"';
    author.textContent = data[numOftQuote]['author'];
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);
