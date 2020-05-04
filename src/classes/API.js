export class Weather {

    constructor(city) {
        this.API_KEY = '849f22af28c4cb37eafc7dac15d5507d';

        this.city = city;
    }

    async getCurrentWeather (lat, long) {
        try {
            const API = `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ long }&appid=${ this.API_KEY }&units=metric`;
        
            const response = await fetch(API);
            const data = await response.json();
    
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getWeather () {
        try {
            const API = `https://api.openweathermap.org/data/2.5/weather?q=${ this.city }&appid=${ this.API_KEY }&units=metric`;
    
            const response = await fetch(API);
            const data = await response.json();
    
            return data;
        } catch (error) {
            throw error;
        }
    }

    changeLocation(city) {
        this.city = city;
    }
}