let city = 'Minsk';
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}`;
let info = 'error';

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((message) => {
        let location = message.results[0].geometry.location;
        console.log(location.lng)
        return location;
    })
    .then((location) => {
        initMap(location)
        return;
    })
    .catch(alert)

function initMap(location) {
    var uluru = {
        lat: location.lat,
        lng: location.lng
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}