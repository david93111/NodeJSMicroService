'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Debes ingresar un nombre."]
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  password: {
      type: String,
      required: [true, "Debes ingresar una contraseña."]   
  }
});


module.exports = mongoose.model('User', userSchema);