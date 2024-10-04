const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('Contacts').collection('Contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('Contacts')
        .collection('Contacts')
        .find({_id: userId});
    result.toArray().then ((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createContact = async (req, res, next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongodb
        .getDb()
        .db('Contacts')
        .collection('Contacts')
        .insertOne(contact);
    console.log(result); 

    if(result.insertedId != null){
        res.status(200).json(contact);
    } else {
        res.status(500).json(response.error || "Some Error occurred while adding the contact"); 
    }
};

const editContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db('Contacts').collection('Contacts').replaceOne({_id: userId}, contact);

    console.log(result);
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some Error occurred while updating the contact"); 
    }
};

const deleteContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db('Contacts').collection('Contacts').deleteOne({_id: userId});

    console.log(result);
    
    if(result.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some Error occurred while deleting the contact"); 
    }
};

module.exports = { getAll, getSingle, createContact, editContact, deleteContact};