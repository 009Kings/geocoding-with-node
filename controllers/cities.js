var express = require("express");
var router = express.Router();
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: "pk.eyJ1IjoiYm9kaGkta2luZyIsImEiOiJjanFta3hod3cxYnBpNDNtMDAxd2N1cXB4In0.orNcNCcYg6Kmat20sEZ8wA" })
var db = require("../models");


router.get('/results', (req, res) => {
  geocodingClient
  .forwardGeocode({
    query: req.query.city+" , "+req.query.state,
    types: ["place"],
    countries: ["us"]
  }).send().then(response => {
    let results = response.body.features.map((city)=>{
      let placeNameArray = city.place_name.split(", ");
      return {
        city: placeNameArray[0],
        state: placeNameArray[1],
        lat: city.center[1],
        long: city.center[0]
      }
    });
    res.render("cities/results", {searchTerms: req.query, results: results});
  })
});

router.get('/favorites', (req, res) => {
  db.city.findAll().then((faveCities)=>{
    var markers = faveCities.map((city)=>{
      var markerObj = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [city.long, city.lat]
        },
        "properties": {
            "title": city.city,
            "icon": "airport"
        }
      } 
      return JSON.stringify(markerObj)
    });
    console.log(markers);
    res.render("cities/favourites", {faveCities: faveCities, markers: markers});
  }).catch(err=>console.log(`That there's an error at the rendering of favourites, ${err}`));
});

router.post('/add', (req, res) => {
  db.city.findOrCreate({
    where: {city: req.body.city},
    defaults: {
      state: req.body.state,
      lat: req.body.lat,
      long: req.body.long
    }
  }).spread((city, created)=>{
    // Associate place with traveller
    db.traveller.findById(req.body.travellerId)
    .then((traveller)=>{
      city.addTraveller(traveller)
      .then((traveller)=>{
        console.log("association happened!")
      }).catch((err)=>console.log("Ass didn't happen"));
    }).catch(err=>console.log("Problem with the ass"))
    res.redirect("/favorites")
  }).catch((err)=>console.log("You done fucked up", err))
});

router.delete("/favorites", (req, res)=>{
  db.city.destroy({
    where: {id: req.body.id}
  }).then(deletedPlace=>{
    db.cityTraveller.destroy({
      where: {cityId: req.body.id}
    }).then((deletedAssociations)=>{
      res.redirect("/favorites")
    }).catch(err=>console.log("problems deleting the ass"));
  }).catch(err=>console.log(`Bad news bears, there's been an error deleting the favourites! ${err}`))
})


module.exports = router;