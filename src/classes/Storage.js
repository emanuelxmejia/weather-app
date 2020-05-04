export class Storage {

    constructor() {
        this.city;
        this.defaultCity = 'New York'
    }

    setLocationData(city) {
        localStorage.setItem('city', city);
    }

    getLocationData() {
        if (localStorage.getItem('city') == null) {
            this.city = this.defaultCity;
        } else {
            this.city = localStorage.getItem('city');
        }

        return this.city;
    }
}