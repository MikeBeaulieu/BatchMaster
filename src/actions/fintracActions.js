"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var FintracApi = require('../api/fintracApi');
var ActionTypes = require('../constants/actionTypes');

var FintracActions = {
	

	updateFintrac: function(fintrac) {
		var updatedFintrac = FintracApi.saveFintrac(fintrac);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_FINTRAC,
			fintracimport: updatedFintrac
		});
	}
};

module.exports = FintracActions;