"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllOrders = async (req, res) => {};

const addOrder = async (req, res) => {};

module.exports = {
    getAllOrders,
    addOrder,
};