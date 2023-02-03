import playList from './playList.js';

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
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
let volume = 0.5;
const audio = new Audio();
audio.volume = volume;
let isPlay = false;
let playNum = 0;
const playListContainer = document.querySelector('.play-list');
const volumeBtn = document.querySelector('.volume-button');
const playerTitle = document.querySelector('.player-title');
const duration = document.querySelector('.duration');
const volumeSlider = document.querySelector('.volume-slider');
const timelineContainer = document.querySelector('.timeline-container');
const timelineProgress = document.querySelector('.timeline-progress');
const trackTimer = document.querySelector('.track-timer');

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

audio.src = playList[playNum].src;
function playAudio() {
    for (let item of playListContainer.children){
        item.classList.remove('item-active');
    }
    playListContainer.children[playNum].classList.add('item-active');
    playerTitle.textContent = playList[playNum].title;
    if (isPlay == false) {
        audio.play();
        isPlay = true;
        playBtn.classList.add('pause');
    } else {
        audio.pause();
        isPlay = false;
        playBtn.classList.remove('pause');
        playListContainer.children[playNum].classList.remove('item-active');
    }
}
playBtn.addEventListener('click', playAudio);
audio.addEventListener('ended', playNext);

playListContainer.addEventListener('click', (e) => {
    let k = 0;
    for (let item of playListContainer.children){
        if (item == e.target){
            playNum = k;
            if (isPlay == true && item.classList.contains('item-active')) {
                audio.pause();
                isPlay = false;
                playBtn.classList.remove('pause');
                playListContainer.children[playNum].classList.remove('item-active');
            } else {
                audio.src = playList[playNum].src;
                isPlay = false;
                playAudio();
            }
        }
        k++;
    }
});

function playNext() {
    if (playNum < playList.length-1) {
        playNum++;
    } else {
        playNum = 0;
    }
    audio.src = playList[playNum].src;
    playBtn.classList.add('pause');
    isPlay = false;
    playAudio();
}
playNextBtn.addEventListener('click', playNext);

function playPrev() {
    if (playNum > 0) {
        playNum--;
    } else {
        playNum = playList.length-1;
    }
    audio.src = playList[playNum].src;
    playBtn.classList.add('pause');
    isPlay = false;
    playAudio();
}
playPrevBtn.addEventListener('click', playPrev);

function makePlaylist() {
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = playList[i]['duration'] + " — " + playList[i]['title'];
        playListContainer.append(li);
    }
    playerTitle.textContent = playList[playNum].title;
}
makePlaylist();

function MakeMute() {
    if (volume != 0) {
        if (audio.muted == 1) {
            audio.muted = 0;
            volumeSlider.value = volume;
        } else {
            audio.muted = 1;
            volumeSlider.value = 0;
        }
    }
    volumeBtn.classList.toggle('mute');
}
volumeBtn.addEventListener('click', MakeMute);

function changeVolume() {
    audio.volume = volumeSlider.value;
    volume = volumeSlider.value;
    if (volume == 0) {
        volumeBtn.classList.add('mute');
    } else {
        volumeBtn.classList.remove('mute');
    }
}
volumeSlider.addEventListener('input', changeVolume);

setInterval(() => {
    timelineProgress.style.width = audio.currentTime / audio.duration * 100 + "%";
    trackTimer.textContent = getTimeCode(audio.currentTime);
}, 500);

function getTimeCode(NumTime) {
    let sec = parseInt(NumTime);
    let min = parseInt(sec/60);
    sec = sec - min * 60;
    let h = parseInt(min/60);
    min = min - h * 60;
    let secFull = String(sec % 60).padStart(2,0);
    if (h == 0) {
        return min + ':' + secFull;
    } else {
        return String(h).padStart(2, 0) + ':' + min + ':' + secFull;
    }
}

timelineContainer.addEventListener('click', e => {
    audio.currentTime = e.offsetX / parseInt(window.getComputedStyle(timelineContainer).width) * audio.duration;
});

audio.addEventListener('loadeddata', () => {duration.textContent = getTimeCode(audio.duration);});