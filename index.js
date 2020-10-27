let latDisplay = document.querySelector(".lat");
let lngDisplay = document.querySelector(".lng");
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
    // var {latitude, longitude} = pos.coords;
    // const coords = {latitude, longitude};
    // console.log(coords);
    // map.setView(coords, 13);
    
    var crd = pos.coords;
    const lat = crd.latitude;
    const lng = crd.longitude;
    console.log(lat);
    latDisplay.innerHTML = "Your Latitude " + lat;
    lngDisplay.innerHTML = "Your Longitude" + lng;
    L.marker([lat, lng]).addTo(map)
    .bindPopup('Your Location.')
    .openPopup();
    map.setView([lat, lng], 13);
}
    
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
