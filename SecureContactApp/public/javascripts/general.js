L.mapbox.accessToken =
  "pk.eyJ1Ijoic2FnYXJ6aGVhcnQiLCJhIjoiY2wxbGRwY3lwMDhzZDNkbnV6ejg5ODNnYiJ9.OqO5xq_fDR55W_ITFVnXBA";

// initializing the view to Mahwah
const mymap = L.map("map")
  .setView([41.0816, -74.1761], 13)
  .addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/streets-v11"));

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic2FnYXJ6aGVhcnQiLCJhIjoiY2wxbGRwY3lwMDhzZDNkbnV6ejg5ODNnYiJ9.OqO5xq_fDR55W_ITFVnXBA", // add your mapbox token here
  }
).addTo(mymap);
