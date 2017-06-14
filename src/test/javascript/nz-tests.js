"use strict";

var Jsonix = require('jsonix').Jsonix;
var NZ = require('../../../target/generated-sources/xjc/NewZealand.std').NZ;

module.exports = {
	"UnmarshalFile": function(test) {

		// Create Jsonix context
		var context = new Jsonix.Context([ NZ ]);
		
		// Create unmarshaller
		var unmarshaller = context.createUnmarshaller();
		
		// Unmarshal the XML file
		unmarshaller.unmarshalFile( 'src/test/resources/nz-sample-xml.xml',
			function(reportElement) {
				
				var report = reportElement.value;

				test.equal('10109', report.rentityId);
				test.done();
		});
        }
};
