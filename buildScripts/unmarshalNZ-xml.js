
var Jsonix = require('jsonix').Jsonix;
var fs = require('fs');
var NZ = require('../target/generated-sources/xjc/NewZealand.std').NZ;


// First we construct a Jsonix context - a factory for unmarshaller (parser)
// and marshaller (serializer)
var context = new Jsonix.Context([NZ]);


// Then we create a unmarshaller
var unmarshaller = context.createUnmarshaller();


// Unmarshal an object from the XML retrieved from the URL
unmarshaller.unmarshalFile('sample-nz.xml',
    // This callback function will be provided
    // with the result of the unmarshalling
    function(myElement) {

				console.log(JSON.stringify(myElement.value, null, 4));
                fs.writeFile('sample-nz.json',JSON.stringify(myElement, null, 4));
                fs.writeFile('sample2-nz.json',JSON.stringify(myElement.value, null, 4));


				var po = myElement.value;

});