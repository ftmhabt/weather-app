import './style.css';

async function getGeo(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ed5ff69a9a55d7bb14fda92a70690f61`,
        { mode: 'cors' });

    const json = await response.json();
    return json;
}


async function getWeather(city, unit) {
    const geoJson = await getGeo(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoJson[0].lat}&lon=${geoJson[0].lon}&units=${unit}&appid=ed5ff69a9a55d7bb14fda92a70690f61`,
        { mode: 'cors' });

    const json = await response.json();
    return json;
}


let city='london';
let unit='metric';


const tempBtn = document.querySelector('.temp');

const cityBtn = document.querySelector('.city');

const searchBox=document.querySelector('.search');
const exitBtn=document.querySelector('.exit');
const input=document.querySelector('input');
const selectBtn=document.querySelector('.select');



async function render() {

    
    const weatherJson = await getWeather(city, unit);

    console.log(weatherJson);
    const temp = weatherJson.main.feels_like;
    // const weather = weatherJson.weather[0].main;

    cityBtn.textContent = city;



    tempBtn.textContent =`${temp} ${unit==='metric'?'c':'f'}`;

    
}


render();

cityBtn.addEventListener('click',()=>{
    searchBox.classList.remove('hide');
})

exitBtn.addEventListener('click',()=>{
    searchBox.classList.add('hide');
})

selectBtn.addEventListener('click',()=>{
    city=input.value;
    render();
    input.textContent='';
    searchBox.classList.add('hide');
})

tempBtn.addEventListener('click', () => {
    if (unit === 'metric') {
        unit='imperial';
    }
    else {
        unit= 'metric';
    }
    render();
})