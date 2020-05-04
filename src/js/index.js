import { View, Storage, Weather } from '../classes'; 

const body = document.body;
const alert = document.querySelector('.alert');
const input = document.querySelector('.input');
const loader = document.querySelector('#loader');
const btnToggle = document.querySelector('.toggle');
const cardBody = document.querySelector('.card__body');

const view = new View();
const storage = new Storage();
const city = storage.getLocationData();
const weather = new Weather(city);

const fetchWeather = async () => {
    try {
        const data = await weather.getWeather();
        
        view.renderData(data);

        storage.setLocationData(data.name); // saving new city in local storage
        
        alert.classList.add('hidden');
    } catch (error) {
        alert.classList.remove('hidden');
    }
}

const getLocation = () => {
    let lat;
    let long;

    if (navigator.geolocation) { // user allow location
        navigator.geolocation.getCurrentPosition (position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            weather.getCurrentWeather(lat, long).then(weather => {
                loader.classList.add('hidden');
                cardBody.classList.remove('hidden');
                view.renderData(weather);
            }).catch(err => {
                console.log(err)
                loader.classList.remove('hidden');
                cardBody.classList.add('hidden');
            })
        }, () => { // user denny location
            loader.classList.toggle('hidden');
            cardBody.classList.remove('hidden');
            fetchWeather();
        });
    } 
}

input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && input.value.length > 0) {
        const city = input.value;

        weather.changeLocation(city); // changing the actual city by user city
        
        fetchWeather(); // calling getWether from API and draw new values to HTML

        input.value = '';
    }
});

btnToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    btnToggle.classList.toggle('active');

    if (body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
});

export const init = () => {
    getLocation();

    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark');
        btnToggle.classList.add('active');
    } else {
        body.classList.remove('dark');
        btnToggle.classList.remove('active');
    }
}