const API_KEY = 'f4e92f877b25570642630e8439a44b30';

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector('#weather span:first-child');
      const temp = document.querySelector('#weather span:last-child');

      city.innerText = data.name;
      temp.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
      const Weather = data.weather[0].main;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
