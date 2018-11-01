var mymap = L.map('map').setView([32.9928, -117.1859], 10);

var myIcon = L.icon({
  iconUrl: '/static/images/beer.png',
  iconSize: [28, 30],
  iconAnchor: [22, 94],
  popupAnchor: [-6, -100]
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
}).addTo(mymap);

d3.json("/breweries").then(function(data) {
  data.forEach(function(d) {
    var latsLons =[d.lat, d.lon];
    latsLons.forEach(function() {
      L.marker(latsLons, {icon: myIcon})
        .bindPopup(`<h3><a onclick="getMenu('${d.name}')" href="#">` + d.name + `</a></h3><hr><h5><a href=${d.link}>` + d.address + "</a></h5>")
        .addTo(mymap);
      })
    })
});

function getMenu(brewery) {
  var rows= d3.select('tbody');
  rows.html('');
  d3.json(`/menu/${brewery}`).then(function(data) {
    data.forEach(function(d) {
      rows.append('tr')
        .html(`<td>${d.Beer}</td><td>${d.Style}</td><td>${d.ABV}</td><td>${d.Score}</td>`)
    })
  });
}