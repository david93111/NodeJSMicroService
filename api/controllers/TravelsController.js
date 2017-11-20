'use strict';

let mongoose = require('mongoose');
let Travel = require("../models/travelModel");

exports.list_all_travels = (req,res) => {
  Travel.find({}).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).send(err);
  });
}

exports.create_travel = (req, res) => {
  let new_travel = new Travel(req.body);
  new_travel.save().then(travel =>{
    res.status(201).json(travel);
  }).catch(err =>{
    console.log(err)
    res.status(500).send(err);
  });
}

exports.find_travel = (req, res) => {
  Travel.findById(req.params.travelId).then(travel =>{
    res.status(200).json(travel);
  }).catch(err => {
    res.status(404).send(err);
  })
}

exports.update_travel = (req, res) => {
  Travel.findByIdAndUpdate({_id: req.params.travelId},req.body,{new: true})
  .then(travel =>{
    res.status(202).json(travel);
  }).catch(err =>{
    res.status(500).send(err);
  })
}

exports.delete_travels = (req,res)=>{
  Travel.findByIdAndRemove({_id: req.params.travelId})
  .then(travel =>{
    res.status(202).json(travel);
  }).catch(err =>{
    res.status(500).send(err);
  })
}

exports.delete_all_travels = (req, res) => {
  Travel.remove({}).then(travel =>{
    res.status(202).json({ message: 'Destinos exitosamente eliminados.' });
  }).catch(err => {
    res.status(500).send(err); 
  })
}