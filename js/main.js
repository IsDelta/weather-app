let city = 'Minsk';
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}`;
let info = 'error';

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

let generateMap = function () {
    fetch(url)
        .then((response) => {
            return response.json();

        })
        .then((message) => {
            if (message.status == 'OK') {
                let location = message.results[0].geometry.location;
                console.log(`${location.lat}  +  ${location.lng}`)
                return location;
            } else alert(message.status)
        })
        .then((location) => {
            initMap(location)
            return;
        })
        .catch(console.log)
}