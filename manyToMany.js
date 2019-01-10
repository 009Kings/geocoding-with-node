var db = require("./models");

db.city.findOrCreate({
  where: {
    city: "Portland"
  }
}).spread((city, created)=>{
  db.traveller.findOrCreate({
    where: {
      firstname: "Sarah",
      lastname: "King"
    }
  }).spread((traveller, created)=>{
    city.addTraveller(traveller).then((traveller)=>{
      console.log(traveller.firstname, "added to", city.city);
    })
  })
})