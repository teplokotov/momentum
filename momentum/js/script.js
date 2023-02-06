import playList from './playList.js';
import lang from './lang.js';

const body = document.querySelector('body');
const header = document.querySelector('.header');
const time = document.querySelector('.time');
const Localedate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const InputName = document.querySelector('.name');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const InputCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const FooterQuote = document.querySelector('.footer-quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const player = document.querySelector('.player');
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
const settingsBtn = document.querySelector('.settings-icon');
const dialogOfSettings = document.querySelector('.dialogOfSettings');
const closeBtn = document.querySelector('.close-button');
const linksBtn = document.querySelector('.links-icon');

const dialogHeader = document.querySelector('.dialog-header');
const dialogSubtitle = document.querySelector('.dialog-subtitle');
const titleLang = document.querySelector('.title-lang');
const titleSource = document.querySelector('.title-source');
const titleTags = document.querySelector('.title-tags');
const titleTime = document.querySelector('.title-time');
const titleDate = document.querySelector('.title-date');
const titleGreeting = document.querySelector('.title-greeting');
const titleQuote = document.querySelector('.title-quote');
const titleWeather = document.querySelector('.title-weather');
const titlePlayer = document.querySelector('.title-player');
const titleLinks = document.querySelector('.title-links');
const titleNature = document.querySelector('.title-nature');
const titleCats = document.querySelector('.title-cats');
const titleCars = document.querySelector('.title-cars');

const tOn = document.querySelectorAll('.tOn');
const tOff = document.querySelectorAll('.tOff');

let radioLang = document.getElementsByName('radio-lang');
let radioTime = document.getElementsByName('radio-time');
let radioDate = document.getElementsByName('radio-date');
let radioGreeting = document.getElementsByName('radio-greeting');
let radioQuote = document.getElementsByName('radio-quote');
let radioWeather = document.getElementsByName('radio-weather');
let radioPlayer = document.getElementsByName('radio-player');
let radioLinks = document.getElementsByName('radio-links');

let sLang = 'ru';
let sTime = 'on';
let sDate = 'on';
let sGreeting = 'on';
let sQuote = 'on';
let sWeather = 'on';
let sPlayer = 'on';
let sLinks = 'on';

function insertTranslation() {
    dialogHeader.textContent = lang[sLang].settings.title;
    dialogSubtitle.textContent = lang[sLang].settings.shows;
    titleLang.textContent = lang[sLang].settings.lang;
    titleSource.textContent = lang[sLang].settings.sourcePhoto;
    titleTags.textContent = lang[sLang].settings.tagsPhoto;
    titleTime.textContent = lang[sLang].settings.time;
    titleDate.textContent = lang[sLang].settings.date;
    titleGreeting.textContent = lang[sLang].settings.greeting;
    titleQuote.textContent = lang[sLang].settings.quote;
    titleWeather.textContent = lang[sLang].settings.weather;
    titlePlayer.textContent = lang[sLang].settings.player;
    titleLinks.textContent = lang[sLang].settings.links;
    titleNature.textContent = lang[sLang].tags.nature;
    titleCats.textContent = lang[sLang].tags.cats;
    titleCars.textContent = lang[sLang].tags.cars;
    Array.from(tOn).map(key => key.innerText = lang[sLang].settings.tOn);
    Array.from(tOff).map(key => key.innerText = lang[sLang].settings.tOff);
}

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
    const currentDate = date.toLocaleDateString(lang[sLang].dateFormat, options);
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
    greeting.textContent = lang[sLang].greetingText[getTimeOfDay()] + ',';
}

function setLocalStorage() {
    localStorage.setItem('name', InputName.value);
    localStorage.setItem('city', InputCity.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    InputName.placeholder = lang[sLang].placeholder.name;
    if (localStorage.getItem('name')) {
        InputName.value = localStorage.getItem('name');
    }
    InputCity.placeholder = lang[sLang].placeholder.city;
    if (localStorage.getItem('city')) {
        InputCity.value = localStorage.getItem('city');
    } else {
        InputCity.value = lang[sLang].weather.city;
    }
    getWeather();
    if (localStorage.getItem('setLang')) {
        sLang = localStorage.getItem('setLang');
        document.getElementById('lang-' + sLang).checked = true;
        insertTranslation();
    }
    if (localStorage.getItem('setTime')) {
        sTime = localStorage.getItem('setTime');
        document.getElementById('time-' + sTime).checked = true;
        sTime == 'on' ? time.style.display = 'block' : time.style.display = 'none';
    }
    if (localStorage.getItem('setDate')) {
        sDate = localStorage.getItem('setDate');
        document.getElementById('date-' + sDate).checked = true;
        sDate == 'on' ? Localedate.style.display = 'block' : Localedate.style.display = 'none';
    }
    if (localStorage.getItem('setGreeting')) {
        sGreeting = localStorage.getItem('setGreeting');
        document.getElementById('greeting-' + sGreeting).checked = true;
        sGreeting == 'on' ? greetingContainer.style.display = 'flex' : greetingContainer.style.display = 'none';
    }
    if (localStorage.getItem('setQuote')) {
        sQuote = localStorage.getItem('setQuote');
        document.getElementById('quote-' + sQuote).checked = true;
        sQuote == 'on' ? FooterQuote.style.display = 'block' : FooterQuote.style.display = 'none';
    }
    if (localStorage.getItem('setWeather')) {
        sWeather = localStorage.getItem('setWeather');
        document.getElementById('weather-' + sWeather).checked = true;
        sWeather == 'on' ? weather.style.display = 'flex' : weather.style.display = 'none';
    }
    if (localStorage.getItem('setPlayer')) {
        sPlayer = localStorage.getItem('setPlayer');
        sWeather = localStorage.getItem('setWeather');
        document.getElementById('player-' + sPlayer).checked = true;
        sPlayer == 'on' ? player.style.display = 'block' : player.style.display = 'none';
        sPlayer == 'off' &&  sWeather == 'on' ? header.style.justifyContent = 'end' : header.style.justifyContent = 'space-between';
    }
    if (localStorage.getItem('setLinks')) {
        sLinks = localStorage.getItem('setLinks');
        document.getElementById('links-' + sLinks).checked = true;
        sLinks == 'on' ? linksBtn.style.display = 'block' : linksBtn.style.display = 'none';
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&lang=${lang[sLang].weather.lang}&appid=4c6d3f4acac16b60de8cd757d423e42d&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod == 200) {
        weatherIcon.className = 'weather-icon owf';
        weatherError.innerText = '';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = lang[sLang].weather.wind + ': ' + Math.floor(data.wind.speed) + ' ' + lang[sLang].weather.unit;
        humidity.textContent = lang[sLang].weather.humidity + ': ' + Math.floor(data.main.humidity) + '%';
    } else {
        if (data.cod == 404) {
            weatherError.innerText = lang[sLang].weather.error404;
        }
        if (data.cod == 400) {
            weatherError.innerText = lang[sLang].weather.error400;
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
    let numOftQuote = Math.floor(Math.random() * data[sLang].length);
    quote.textContent = '"' + data[sLang][numOftQuote]['text'] + '"';
    author.textContent = data[sLang][numOftQuote]['author'];
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

    radioLang = document.getElementsByName('radio-lang');
    sLang = Array.from(radioLang).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setLang', sLang) != sLang) {
        localStorage.setItem('setLang', sLang);
        insertTranslation();
        getWeather();
        getQuotes();
    }

    radioTime = document.getElementsByName('radio-time');
    sTime = Array.from(radioTime).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setTime', sTime) != sTime) {
        localStorage.setItem('setTime', sTime);
        sTime == 'on' ? time.style.display = 'block' : time.style.display = 'none';
    }

    radioDate = document.getElementsByName('radio-date');
    sDate = Array.from(radioDate).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setDate', sDate) != sDate) {
        localStorage.setItem('setDate', sDate);
        sDate == 'on' ? Localedate.style.display = 'block' : Localedate.style.display = 'none';
    }

    radioGreeting = document.getElementsByName('radio-greeting');
    sGreeting = Array.from(radioGreeting).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setGreeting', sGreeting) != sGreeting) {
        localStorage.setItem('setGreeting', sGreeting);
        sGreeting == 'on' ? greetingContainer.style.display = 'flex' : greetingContainer.style.display = 'none';
    }

    radioQuote = document.getElementsByName('radio-quote');
    sQuote = Array.from(radioQuote).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setQuote', sQuote) != sQuote) {
        localStorage.setItem('setQuote', sQuote);
        sQuote == 'on' ? FooterQuote.style.display = 'block' : FooterQuote.style.display = 'none';
    }

    radioWeather = document.getElementsByName('radio-weather');
    sWeather = Array.from(radioWeather).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setWeather', sWeather) != sWeather) {
        localStorage.setItem('setWeather', sWeather);
        sWeather == 'on' ? weather.style.display = 'flex' : weather.style.display = 'none';
    }

    radioPlayer = document.getElementsByName('radio-player');
    sPlayer = Array.from(radioPlayer).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setPlayer', sPlayer) != sPlayer) {
        localStorage.setItem('setPlayer', sPlayer);
        sWeather = localStorage.getItem('setWeather');
        sPlayer == 'on' ? player.style.display = 'block' : player.style.display = 'none';
    }
    sPlayer == 'off' &&  sWeather == 'on' ? header.style.justifyContent = 'end' : header.style.justifyContent = 'space-between';

    radioLinks = document.getElementsByName('radio-links');
    sLinks = Array.from(radioLinks).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setLinks', sLinks) != sLinks) {
        localStorage.setItem('setLinks', sLinks);
        sLinks == 'on' ? linksBtn.style.display = 'block' : linksBtn.style.display = 'none';
    }
}, 100);

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

settingsBtn.addEventListener('click', () => {
    dialogOfSettings.classList.toggle('show');
});

closeBtn.addEventListener('click', (e) => {
    dialogOfSettings.classList.toggle('show');
});

document.addEventListener("click", function (e) {
    const target = e.target;
    const isDialog = target == dialogOfSettings || dialogOfSettings.contains(target);
    const isBtnDialog = target == settingsBtn;
    const isDialogOpened = dialogOfSettings.classList.contains("show");
    if (!isDialog && !isBtnDialog && isDialogOpened) {
        dialogOfSettings.classList.toggle('show');
    }
});