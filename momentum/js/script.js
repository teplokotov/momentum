const body = document.querySelector('body');
const time = document.querySelector('.time');
const Localedate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const InputName = document.querySelector('.name');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


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
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    InputName.placeholder = '[Введите имя]';
    if (localStorage.getItem('name')) {
        InputName.value = localStorage.getItem('name');
    }
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
    console.log(randomNum);
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