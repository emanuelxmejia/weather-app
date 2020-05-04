export class View {

    constructor() {
        this.weatherIcon = document.querySelector('#weather-icon');
        this.weatherMinMax = document.querySelector('#weather-minmax');
        this.weatherLocation = document.querySelector('#weather-location');
        this.weatherTemperature = document.querySelector('#weather-temperature');
        this.weatherDescription = document.querySelector('#weather-description');
    }

    renderData(weather) {
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${ weather.weather[0].icon }@2x.png`
        this.weatherLocation.textContent = `${ weather.name }, ${ weather.sys.country }`;
        this.weatherDescription.textContent = weather.weather[0].description;
        this.weatherTemperature.textContent = Math.floor(`${ weather.main.temp }`) + '°c';
        this.weatherMinMax.textContent = Math.floor(`${ weather.main.temp_min }`) + '°c' + ' / ' + Math.floor(`${ weather.main.temp_max }`) + '°c';
    }
}