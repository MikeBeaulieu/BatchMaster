
var Jsonix = require('jsonix').Jsonix;
var fs = require('fs');
var NZ = require('../target/generated-sources/xjc/NewZealand.std').NZ;

//var XMLSchemaJsonSchema = JSON.parse(fs.readFileSync('./node_modules/jsonix/jsonschemas/w3c/2001/XMLSchema.jsonschema').toString());

//var JsonixJsonSchema = JSON.parse(fs.readFileSync('./node_modules/jsonix/jsonschemas/Jsonix/Jsonix.jsonschema').toString());

//var POJsonSchema = JSON.parse(fs.readFileSync('./mappings/PO.jsonschema').toString());



//var ajv = new Ajv();

//ajv.addSchema(XMLSchemaJsonSchema, 'http://www.jsonix.org/jsonschemas/w3c/2001/XMLSchema.jsonschema');

//ajv.addSchema(JsonixJsonSchema, 'http://www.jsonix.org/jsonschemas/jsonix/Jsonix.jsonschema');

//var validate = ajv.compile(POJsonSchema);



// First we construct a Jsonix context - a factory for unmarshaller (parser)
// and marshaller (serializer)
var context = new Jsonix.Context([NZ]);


var nz = JSON.parse(fs.readFileSync("sample-nz.json").toString());



//console.log('Validating.');

//var valid = validate(po);

//if (!valid) {

//    console.log('Validation failed.');

//    console.log('Validation errors:');

//    console.log(validate.errors);

//}

//test.ok(valid, 'Validation failed.');

var context = new Jsonix.Context([ NZ ]);

var marshaller = context.createMarshaller();

var marshalled = marshaller.marshalString(nz);

console.log('Marshalled XML:');

console.log(marshalled);	

