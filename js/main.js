let city = 'Minsk';

let info = 'error';

function initMap(location) {
    var uluru = {
        lat: location.lat,
        lng: location.lng
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function findCity() {
    let city = document.getElementById('cityNameField').value;
    generateMap(city);
    return false;

}

function getWetherByKey(key) {
    let url = (`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=aJ7lv4L6tLHDwjVcLDBD7R3G0up5bkGe&language=ru`);
    var key = 0;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((message) => {
            console.log(message[0].WeatherText)
        })
        .catch(console.log);
}
function getWether() {
    let lat = 53.90453979999999,
        lng = 27.5615244;
    let url1 = (`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=aJ7lv4L6tLHDwjVcLDBD7R3G0up5bkGe&q=${lat},${lng}&language=ru`);
    fetch(url1)
        .then((response) => {
            return response.json();
        })
        .then((message) => {
            return key = message.Key;
        })
        .then((key) => {
            getWetherByKey(key)
        })
        .catch(console.log)
}

function generateMap(city) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((message) => {
            if (message.status == 'OK') {
                let location = message.results[0].geometry.location;
                console.log(`${location.lat}  +  ${location.lng}`)
                initMap(location);
            } else alert(message.status);
        })
        .catch(console.log)
}