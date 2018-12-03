const mongoose = require('mongoose');

var candidatSchema = mongoose.Schema({
  firstname : {
    type: String,
    required: 'you must enter your first name'
  },
  lastname : {
    type: String,
    required: 'you must enter your last name'
  },
  email : {
    type: String,
    required: 'you must enter your email',
    unique: true
  },
  password : {
    type: String,
    required: 'you must enter password'
  }
});


candidatSchema.path('email').validate( (val)=> {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(val);
}, 'Valid E-mail please.');

var Candidat = module.exports =mongoose.model('Candidat',candidatSchema);
