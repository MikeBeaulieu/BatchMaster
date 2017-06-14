"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _fintracimports = [];

var FintracStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllImports: function() {
		console.log('got here');
		return _fintracimports;
	},

	getFintracImportById: function(id) {
		console.log('getFintracImportById :: id=' + id);
		//return _.find(_fintracimports, {importid: id});
		return _fintracimports[0];
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_fintracimports = action.initialData.fintracimports;
			FintracStore.emitChange();
			break;
		
		case ActionTypes.UPDATE_FINTRAC:
			var existingFintrac = _.find(_fintracimports, {id: action.fintrac.header.tradeid});
			var existingFintracIndex = _.indexOf(_fintracimports, existingFintrac); 
			_fintracimports.splice(existingFintracIndex, 1, action.fintrac);
			FintracStore.emitChange();
			break;	
		
		default:
			// no op
	}
});

module.exports = FintracStore;