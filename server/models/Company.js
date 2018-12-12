const mongoose = require('mongoose');

var companySchema = mongoose.Schema({
  comp :  { type: mongoose.Schema.Types.ObjectId, ref: 'Condidats' },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  pathPhoto: {
    type: String
  },
  socialLinks: [{
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    }
  }]
});

 module.exports = companySchema;
