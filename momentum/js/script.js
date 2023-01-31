const time = document.querySelector('.time');
const Localedate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const InputName = document.querySelector('.name');

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
        greetingText = 'Доброе утро,';
    }
    if (currentHour >= 12 && currentHour < 18) {
        greetingText = 'Добрый день,';
    }
    if (currentHour >= 18 && currentHour < 24) {
        greetingText = 'Добрый вечер,';
    }
    if (currentHour >= 0 && currentHour < 6) {
        greetingText = 'Доброй ночи,';
    }
    return greetingText;
}

function showGreeting() {
    greeting.textContent = getTimeOfDay();
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