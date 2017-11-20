'use strict';

let mongoose = require('mongoose'),
  User = mongoose.model('User'),
  jwt = require('jsonwebtoken'),
  config = require('../../config');

exports.createUser = function (req, res) {
  // create a user
  let user = new User(req.body);
  user.save(function (err, doc) {
    if (err)
      res.status(400).send(err);
    res.status(201).json(doc);
  });
};

exports.authenticateUser = function (req, res) {
  console.log(req.body.username);
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err)
      throw err;

    if (!user) {
      res.status(400).json({ success: false, message: 'Autenticación fallida, usuario no encontrado.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.status(400).json({ success: false, message: 'Autenticación fallida, password erróneo.' });
      } else {
        // if user is found and password is right
        // create a token
        var payload = {
          admin: user.admin
        }
        var token = jwt.sign(payload, "claveSecreta", {
          expiresIn: "120m" // expires in 120 minutes
        });

        res.status(200).json({
          success: true,
          message: 'Este es tu token de acceso!',
          token: token
        });
      }
    }
  });
}