let positonArray = [0, 0];
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
    // L.marker([lat, lng]).addTo(map)
    // .bindPopup(`Latitude: ${lat} <br> Longitude: ${lng}`)
    // .openPopup();
    // map.setView([lat, lng], 13);
    locationLog(lat, lng);
}

async function locationLog(lat, lng){
    const responce = await fetch(`https://elated-payne-827778.netlify.app/.netlify/functions/hello?lat=${lat}&lng=${lng}`);
    console.log(responce);
    const data = await responce.json();
    L.marker(data).addTo(map)
    .bindPopup(`Location: ${data}`)
    .openPopup();
    map.setView(data);
}
    
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
