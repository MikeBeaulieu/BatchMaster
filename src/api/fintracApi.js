"use strict";

//This file is mocking a web API by hitting hard coded data.
var imports = require('./fintracData').imports;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(fintracimport) {
	return fintracimport.firstName.toLowerCase() + '-' + fintracimport.lastName.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var FintracApi = {
	getAllImports: function() {
		return _clone(imports); 
	},

	getImportById: function(id) {
		var fintracimport = _.find(imports, {id: id});
		return _clone(fintracimport);
	},
	
	saveImport: function(fintracimport) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the import to the DB via AJAX call...');
		
		if (fintracimport.id) {
			var existingImportIndex = _.indexOf(imports, _.find(imports, {id: fintracimport.id})); 
			imports.splice(existingImportIndex, 1, fintracimport);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new authors in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			fintracimport.id = _generateId(fintracimport);
			fintracimport.push(fintracimport);
		}

		return _clone(fintracimport);
	},

	deleteImport: function(id) {
		console.log('Pretend this just deleted the import from the DB via an AJAX call...');
		_.remove(imports, { id: id});
	}
};

module.exports = FintracApi;