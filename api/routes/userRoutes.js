'use strict';

module.exports = function(app) {
	var userController = require('../controllers/userController');

	// user Routes
	app.route('/user')
		.post(userController.createUser);

	app.route('/user/authentication')
		.post(userController.authenticateUser);
};
