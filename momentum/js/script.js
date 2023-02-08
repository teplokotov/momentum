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
let audio = new Audio();
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
const dialogOfLinks = document.querySelector('.dialogOfLinks');
const dialogListBody = document.querySelector('.dialog-list-body');
const editLinkBody = document.querySelector('.edit-link-body');
const editLinkBtn= document.querySelectorAll('.edit-link-button');
const closeBtn = document.querySelector('.close-button');
const closeLinksBtn = document.querySelector('.close-button.links');
const linksBtn = document.querySelector('.links-icon');
const addLinkBtn = document.querySelector('.add-button');
const saveBtn = document.querySelector('.saveBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const dialogHeader = document.querySelector('.dialog-header');
const dialogHeaderLinks = document.querySelector('.dialog-header.links');
const setLinkTitleName = document.querySelector('.set-link-title-name');
const setLinkTitleURL = document.querySelector('.set-link-title-url');
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
const areaTags = document.querySelector('.area-tags');
const linkName = document.querySelector('.link-name');
const linkURL = document.querySelector('.link-url');
const date = new Date();
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
let radioSource = document.getElementsByName('radio-source');
let radioTags = document.getElementsByName('radio-tag');

let sLang = 'ru';
let sTime = 'on';
let sDate = 'on';
let sGreeting = 'on';
let sQuote = 'on';
let sWeather = 'on';
let sPlayer = 'on';
let sLinks = 'on';
let sSource = 'github';
let sTags = 'nature';
let linkValueName = '';
let linkValueURL = '';
let listOfLinks = {}

function initStorage() {
    if (localStorage.getItem('setLang')) {
        sLang = localStorage.getItem('setLang');
        document.getElementById('lang-' + sLang).checked = true;
        insertTranslation();
    }
    if (localStorage.getItem('setSource')) {
        sSource = localStorage.getItem('setSource');
        document.getElementById('source-' + sSource).checked = true;
        if (sSource == 'github') {
            areaTags.style.display = 'none';
        } else {
            areaTags.style.display = 'flex';
        }
    }
    if (localStorage.getItem('setTags')) {
        sTags = localStorage.getItem('setTags');
        document.getElementById('tag-' + sTags).checked = true;
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
    if (localStorage.getItem('links')) {
        listOfLinks = JSON.parse(localStorage.getItem('links'));
    }
}
initStorage();

function insertTranslation() {
    dialogHeader.textContent = lang[sLang].settings.title;
    dialogHeaderLinks.textContent = lang[sLang].settings.links;
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

    setLinkTitleName.textContent = lang[sLang].links.name;
    setLinkTitleURL.textContent = lang[sLang].links.link;
    saveBtn.textContent = lang[sLang].links.save;
    deleteBtn.textContent = lang[sLang].links.delete;

    Array.from(tOn).map(key => key.innerText = lang[sLang].settings.tOn);
    Array.from(tOff).map(key => key.innerText = lang[sLang].settings.tOff);
}

function showTime() {
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 100);
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
    localStorage.setItem('links', JSON.stringify(listOfLinks));
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
}
window.addEventListener('load', getLocalStorage);

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum(1,20);

async function getImageFromUp(tags) {
    const url = 'https://api.unsplash.com/photos/random?query=' + tags + '&client_id=QZobZsuqRFPw0qVX3lMILizhrXbCJyB9wGhsa_-LM50';
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
}

async function getImageFromFlickr(tags,num) {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e4dc0050658d4309d9e328907f5fffc6&tags=' + tags + '&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(url);
    const data = await res.json();
    return data.photos.photo[num].url_l;
}

async function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = String(randomNum).padStart(2, "0");
    const img = new Image();
    if(sSource == 'github') {
        img.src = "https://raw.githubusercontent.com/teplokotov/stage1-tasks/assets/images/" + timeOfDay + "/" + bgNum + ".jpg"; 
    }
    if (sSource == 'unsplash') {
        img.src = await getImageFromUp(sTags);
    }
    if (sSource == 'flickr') {
        img.src = await getImageFromFlickr(sTags,randomNum);
    }
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

function makeListOfLinks() {
    for(let key in listOfLinks) {
        const li = document.createElement('li');
        li.classList.add('area');
        li.innerHTML = '<a href="' + listOfLinks[key].url + '" target="_blank" class="title-link">' + listOfLinks[key].title + '</a><div data-id="' + key + '" class="edit-link-button"></div>';
        dialogListBody.append(li);
    }
    document.querySelectorAll(".edit-link-button").forEach(editLinkBtn =>
        editLinkBtn.addEventListener("click", (e) => {
            linkName.value = listOfLinks[e.target.dataset.id].title;
            linkURL.value = listOfLinks[e.target.dataset.id].url;
            saveBtn.dataset.id = e.target.dataset.id;
            deleteBtn.dataset.id = e.target.dataset.id;
            deleteBtn.classList.toggle('show');
            dialogListBody.classList.toggle('show');
            editLinkBody.classList.toggle('show');
            addLinkBtn.classList.toggle('back');
        })
    )
}
makeListOfLinks();

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
        InputName.placeholder = lang[sLang].placeholder.name;
        InputCity.placeholder = lang[sLang].placeholder.city;
        if (InputCity.value == 'Минск' && sLang == 'en') {
            InputCity.value = 'Minsk';
        }
        if (InputCity.value == 'Minsk' && sLang == 'ru') {
            InputCity.value = 'Минск';
        }
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

    radioSource = document.getElementsByName('radio-source');
    sSource = Array.from(radioSource).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setSource', sSource) != sSource) {
        if (sSource == 'github') {
            areaTags.style.display = 'none';
        } else {
            areaTags.style.display = 'flex';
        }
        localStorage.setItem('setSource', sSource);
        setBg();
    }

    radioTags = document.getElementsByName('radio-tag');
    sTags = Array.from(radioTags).filter(node => node.checked).map(node => node.value).pop();
    if (localStorage.getItem('setTags', sTags) != sTags) {
        localStorage.setItem('setTags', sTags);
        setBg();
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
    dialogOfLinks.classList.remove('show');
    dialogOfSettings.classList.toggle('show');
});

linksBtn.addEventListener('click', () => {
    addLinkBtn.classList.remove('back');
    editLinkBody.classList.remove('show');
    dialogListBody.classList.add('show');
    dialogOfSettings.classList.remove('show');
    dialogOfLinks.classList.toggle('show');
});

closeBtn.addEventListener('click', (e) => {
    dialogOfSettings.classList.toggle('show');
});

closeLinksBtn.addEventListener('click', (e) => {
    dialogOfLinks.classList.toggle('show');
});

document.addEventListener("click", function (e) {
    const target = e.target;
    const isDialog = target == dialogOfSettings || dialogOfSettings.contains(target);
    const isBtnDialog = target == settingsBtn;
    const isDialogOpened = dialogOfSettings.classList.contains("show");
    if (!isDialog && !isBtnDialog && isDialogOpened) {
        dialogOfSettings.classList.toggle('show');
    }
    const isDialogLinks = target == dialogOfLinks || dialogOfLinks.contains(target);
    const isBtnDialogLinks = target == linksBtn;
    const isDialogLinksOpened = dialogOfLinks.classList.contains("show");
    if (!isDialogLinks && !isBtnDialogLinks && isDialogLinksOpened) {
        dialogOfLinks.classList.toggle('show');
    }
});

addLinkBtn.addEventListener('click', (e) => {
    dialogListBody.classList.toggle('show');
    editLinkBody.classList.toggle('show');
    addLinkBtn.classList.toggle('back');
    deleteBtn.classList.remove('show');
    linkName.value = '';
    linkURL.value = '';
    saveBtn.dataset.id = '';
});

saveBtn.addEventListener('click', (e) => {
    linkValueName = linkName.value.trim();
    linkValueURL = linkURL.value.trim();
    if (linkValueName != '' && linkValueURL != '') {
        if (linkValueURL.includes('http://') || linkValueURL.includes('https://')) {
        } else {
            linkValueURL = 'http://' + linkValueURL;
        }

        if (e.target.dataset.id == '') {
            let curDate = new Date();
            listOfLinks[curDate.toISOString()] = {title: linkValueName, url: linkValueURL};
        } else {
            listOfLinks[e.target.dataset.id] = {title: linkValueName, url: linkValueURL};
        }
        
        dialogListBody.innerHTML = '';
        makeListOfLinks();
        deleteBtn.classList.remove('show');
        editLinkBody.classList.toggle('show');
        dialogListBody.classList.toggle('show');
        addLinkBtn.classList.toggle('back');
    }
});

saveBtn.addEventListener('mouseover', (e) => {
    linkValueName = linkName.value.trim();
    linkValueURL = linkURL.value.trim();
    if (linkValueName != '' && linkValueURL != '') {
        saveBtn.classList.remove('nosave');
    } else {
        saveBtn.classList.add('nosave');
    }
});

deleteBtn.addEventListener('click', (e) => {
    delete listOfLinks[e.target.dataset.id];
    dialogListBody.innerHTML = '';
    makeListOfLinks();
    editLinkBody.classList.toggle('show');
    dialogListBody.classList.toggle('show');
    addLinkBtn.classList.toggle('back');
});

console.log('\nИтого: 160/160\n\n1. Часы и календарь +15\n2. Приветствие +10\n3. Смена фонового изображения +20\n4. Виджет погоды +15\n5. Виджет цитата дня +10\n6. Аудиоплеер +15\n7. Продвинутый аудиоплеер +20\n8. Перевод приложения на два языка (en/ru) +15\n9. Получение фонового изображения от Unsplash API и Flickr API +10\n10. Настройки приложения +20\n11. Дополнительный функционал: Список ссылок +10');