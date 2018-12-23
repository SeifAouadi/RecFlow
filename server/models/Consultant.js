const mongoose = require('mongoose');

var consultantSchema = mongoose.Schema({
  UserId :  { type: mongoose.Schema.Types.ObjectId, ref: 'Condidats' },
  role: String,
  dureeExprience: Number,

  domaine: String,
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
   skill:[],
   phone : Number,
   adresse: String,
   imagePath: String,
   user: { type: mongoose.Schema.Types.ObjectId, ref:'Candidats'}
})
 module.exports= consultantSchema;
