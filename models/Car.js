var mongooes=require("mongoose")

module.exports=mongooes.model("Car",{
    "id":Number,
    "brand":String,
    "series":String,
    "color":String,
    "price":Number,
    "km":Number,
    "gearbox":String,
    "displacement":String,
    "fuel":String,
    "buydate":Number,
    "licenseplate":Boolean,
    "locality":Boolean,
    "eco":String,
    "imgs":Object,
    "type":String,
    "files":Array

}) 