let latDisplay = document.querySelector(".lat");
let lngDisplay = document.querySelector(".lng");
let personLocation = [0, 0];
// latDisplay.innerHTML = "Your Latitude " + lat;
// lngDisplay.innerHTML = "Your Longitude" + lng;
navigator.geolocation.watchPosition(success, error, options);
var map = L.map('mapid').setView([51.505, -0.09], 13);
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
    };

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('Your Location.')
    .openPopup();
    
function success(pos) {
    var crd = pos.coords;
    const lat = crd.latitude;
    const lng = crd.longitude;
    personLocation.push(lat, lng)
    // console.log(lat);
    L.marker([lat, lng]).addTo(map)
    .bindPopup(`Latitude: ${lat} <br> Longitude: ${lng}`)
    .openPopup();
    map.setView([lat, lng], 13);
    locationLog(personLocation);
}

async function locationLog(personLocation){
    const responce = await fetch(`https://elated-payne-827778.netlify.app/.netlify/functions/hello?vote=${personLocation}`);
    console.log(responce);
    const data = await responce.json();
    console.log(data);
    // map.setView(personLocation, 13);
}
    
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
