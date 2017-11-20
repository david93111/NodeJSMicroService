'use strict';

module.exports = function(app) {
	var travelsController = require('../controllers/travelsController');

	// task Routes
	app.route('/travels')
		.get(travelsController.list_all_travels)
		.post(travelsController.create_travel)
		.delete(travelsController.delete_all_travels);

	app.route('/travels/:travelId')
		.get(travelsController.find_travel)
		.put(travelsController.update_travel)
		.delete(travelsController.delete_travels);
};
