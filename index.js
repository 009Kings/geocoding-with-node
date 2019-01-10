// Requirements
var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: "pk.eyJ1IjoiYm9kaGkta2luZyIsImEiOiJjanFta3hod3cxYnBpNDNtMDAxd2N1cXB4In0.orNcNCcYg6Kmat20sEZ8wA" })
const db = require("./models");
const methodOverride = require("method-override");

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("static"));
app.use("/", require("./controllers/cities"));
app.use("/", require("./controllers/travellers"))

// Routes
app.get("/", (req, res) => {
  db.traveller.findAll().then((travellers)=>{
    res.render("cities/city-search", {travellers: travellers });
  })
})

app.listen(8000, () => {
  console.log('♨︎ listening to the smooth sounds of port 8000 ♨');
});