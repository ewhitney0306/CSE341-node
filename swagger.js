const swaggerAutogen =  require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Contacts API',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);