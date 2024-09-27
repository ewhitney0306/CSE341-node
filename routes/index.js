const routes = require('express').Router(); 
//const router = express.Router();

const myController = require ('../controllers');

//routes.get('/', myController.returnName);

routes.use('/contacts', require('./contact'));

module.exports = routes;