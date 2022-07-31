"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllItemsInCart = async (req, res) => {};

const addItemInCart = async (req, res) => {};

const deleteItemInCart = async (req, res) => {};

const emptyCart = async (req, res) => {};

module.exports = {
    getAllItemsInCart,
    addItemInCart,
    deleteItemInCart,
    emptyCart,
};