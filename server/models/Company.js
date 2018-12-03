const mongoose = require('mongoose');

var companySchema = mongoose.Schema({
  name: {
    type: String,
    required: 'you must enter your company name'
  },
  email: {
    type: String,
    required: 'you must enter your company email',
    unique: true
  },
  description: {
    type: String,
    required: 'you must enter your company description'
  },
  address: {
    type: String,
    required: 'you must enter your address'
  },
  postalCode: {
    type: Number,
    required: 'you must enter your postal code'
  },
  phone: {
    type: Number,
    required: 'you must enter your phone number'
  },
  pathPhoto: {
    type: String
  },
  socialLinks: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    }
  }
});

var Company = module.exports = mongoose.model('Company', companySchema);
