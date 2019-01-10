var express = require("express");
var router = express.Router();
var db = require("../models");

router.get('/travellers', (req, res) => {
  db.traveller.findAll().then((travellers)=>{
    res.render("travellers/travellers", {travellers: travellers});
  }).catch(err=>console.log(`That there's an error at the rendering of travellers, ${err}`))
});

router.get('/travellers/:id', (req, res) => {
  db.traveller.findOne({
    where: {id: req.params.id},
    include: [db.city]
  }).then((traveller)=>{
    var markers = traveller.cities.map((city)=>{
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
    res.render("travellers/traveller-show", {traveller: traveller, markers: markers});
  }).catch(err=>console.log("Bad news bears, error showing a traveller", err));
});

router.post("/travellers", (req, res)=>{
  db.traveller.findOrCreate({
    where: {firstname: req.body.firstname},
    defaults: {lastname: req.body.lastname}
  }).spread((traveller, created)=>{
    res.redirect("/travellers");
  }).catch(err=>console.log("Bad news bears, error posting a traveller", err))
})

router.delete('/association', (req, res)=>{
  db.cityTraveller.destroy({
    where: { 
      travellerId: req.body.travellerId,
      cityId: req.body.cityId
    }
  }).then((deletedAssociations)=>{
    res.redirect("/travellers/" + req.body.travellerId)
  }).catch(err=>console.log(`Bad news bears, there's been an error deleting the place in relation to the traveller! ${err}`))
})

router.delete('/travellers', (req, res) => {
  console.log("Thar be some parameters!" + req.params);
  db.traveller.destroy({
    where: {id: req.body.id}
  }).then((deletedTaveller)=>{
    res.redirect("/travellers")
  }).catch(err=>console.log(`Bad news bears, there's been an error deleting the traveller! ${err}`))
});

module.exports = router;