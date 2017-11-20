'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
  name:{
    type: String,
    required: [true,"Debe ingresar el nombre del destino"]
  },
  price: {
    type: Number,
    required: [true, "Se debe especificar un precio para el destino"]
  }
})

var TravelSchema = new Schema({
  city: {
    type: String,
    required: [true, "Debes ingresar una ciudad."]
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  destinations: [destinationSchema]
});


module.exports = mongoose.model('Travels', TravelSchema);