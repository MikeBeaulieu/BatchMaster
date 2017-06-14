"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var FintracApi = require('../api/fintracApi');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				fintracimports: FintracApi.getAllImports()
			}
		});
	}
};

module.exports = InitializeActions;