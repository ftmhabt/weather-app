async function getGeo(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ed5ff69a9a55d7bb14fda92a70690f61`,
        { mode: 'cors' });
    
    const json= await response.json();
    return json;
}


async function getWeather(city) {
    const geoJson=await getGeo(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoJson[0].lat}&lon=${geoJson[0].lon}&appid=ed5ff69a9a55d7bb14fda92a70690f61`,
        { mode: 'cors' });
    
    const json= await response.json();
    console.log(json);
}

getWeather('london');