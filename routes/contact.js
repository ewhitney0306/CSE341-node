const express = require ('express');
const router = express.Router();

const contactController = require ('../controllers/contacts');

router.get('/', contactController.getAll);

router.get('/:id', contactController.getSingle);

router.put('/:id', contactController.editContact);

router.post('/', contactController.createContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;