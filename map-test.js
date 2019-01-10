// Import geocoding services from mapbox sdk
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: "pk.eyJ1IjoiYm9kaGkta2luZyIsImEiOiJjanFta3hod3cxYnBpNDNtMDAxd2N1cXB4In0.orNcNCcYg6Kmat20sEZ8wA" })

// Forward Geocoding 
/*
geocodingClient
.forwardGeocode({
  query: "Seattle, WA"
})
.send()
.then(response => {
  console.log(response.body.features[0].geometry);
})
.catch()
*/

// Reverse Geocoding
geocodingClient
.reverseGeocode({
  query: [ -122.3301, 47.6038 ],
  types: ["place"]
})
.send()
.then(response => {
  console.log(response.body.features);
})
.catch()