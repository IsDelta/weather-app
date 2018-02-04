getVisistorPosition();

//let historySet = new Set();
function initMap(location) {
  var uluru = {
    lat: location.lat,
    lng: location.lng
  };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
let $$ = function(str) {
  return document.getElementById(str);
};
function addIntoHistory(city) {
  let hist = $$("history");
  let historyList = hist.innerHTML.split("<br>");
  historyList.forEach((item, i, arr) => {
    if (item == city) {
      arr.splice(i, 1);
    }
  });

  chekHistoryList();
  function chekHistoryList() {
    if (historyList.length < 5) {
      historyList.unshift(city);
      hist.innerHTML = historyList.join("<br>");
    } else {
      historyList.pop();
      chekHistoryList(city);
    }
  }
}
// function addIntoHistory(str) {
//   if(historySet.size < 2){
//     historySet.add(str);
//   } else {
//     historySet.delete(historySet[0]);
//     addIntoHistory(str)
//   }
//   console.log(historySet)
// }

// function addIntoHistoryBlock(){
//   historySet.forEach(val => {
//     let hist = $$('history');
//     hist.innerHTML += `${val}<br>`;
//   })
// }

// function addIntoHistory(city) {
//   let historySet = new Set();
//   console.log(city);
//   let history = $$('history');
//   history.innerHTML += `${city}<br>`;
// }

function getVisistorPosition() {
  fetch("https://api.userinfo.io/userinfos")
    .then(response => response.json())
    .then(message => {
      let location = {
        lat: message.position.latitude,
        lng: message.position.longitude
      };
      initMap(location);
      getWether(location.lat, location.lng);
    })
    .catch(console.log);
}

function findCity() {
  let city = $$("cityNameField").value;
  generateMap(city);
}

function addWeatherInfoOnSite(parametrs) {
  let weather = $$("weatherInfo");
  weather.innerHTML = `Температура : ${
    parametrs.Temperature.Metric.Value
  } C. По&nbsp;ощущениям&nbsp;:&nbsp;${
    parametrs.RealFeelTemperature.Metric.Value
  }&nbsp;C. <br>
    На небе: ${parametrs.WeatherText} <br>
    Ветер ${(parametrs.Wind.Speed.Metric.Value / 3.6).toFixed(2)} м/с`;
}

function getWetherByKey(key) {
  let url = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=MseNQFKl5S4C4PPSVJgMAJhZYJKMXCf9&language=ru&details=true`;
  var key = 0;
  fetch(url)
    .then(response => response.json())
    .then(message => {
      addWeatherInfoOnSite(message[0]);
    })
    .catch(console.log);
}

function getWether(lat, lng) {
  let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=aJ7lv4L6tLHDwjVcLDBD7R3G0up5bkGe&q=${lat},${lng}&language=ru`;
  fetch(url)
    .then(response => response.json())
    .then(message => (key = message.Key))
    .then(key => {
      getWetherByKey(key);
    })
    .catch(console.log);
}

function generateMap(city) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}`;
  fetch(url)
    .then(response => response.json())
    .then(message => {
      if (message.status == "OK") {
        let location = message.results[0].geometry.location;
        initMap(location);
        getWether(location.lat, location.lng);
        addIntoHistory(city, location);
      } else alert(message.status);
    })
    .catch(console.log);
}
