const mongoose = require('mongoose');

var consultantSchema = mongoose.Schema({
  dureeExprience: Number,
  experience: [{
    societe: String,
    debut: Date,
    fin: Date,
    tacheRealises:String,
  }],
  formation: [{
    institut:String,
    diplome:String,
    debutF: Date,
    finF : Date
   }],
   skill: String,
   phone : Number,
   adresse: String,
   imagePath: String,
})
 module.exports= consultantSchema;
