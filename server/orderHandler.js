"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllOrders = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  // connect to the database
  const db = client.db("EcommerceGroupProject");
  //Get the userId from req params
  const userId = req.params.user;
  //Find the order by userIdfrom orders
  const result = await db.collection("orders").findOne({ userId });
  if (result) {
    res.status(200).json({ status: 200, data: result });
  } else {
    res.status(404).json({ status: 404, message: "Result is empty" });
  }
};

const addOrder = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();
  // connect to the database
  const db = client.db("EcommerceGroupProject");
  const { userId, items } = req.body;
  //insert a name in collection users
  const result = await db
    .collection("orders")
    .insertOne({ OrderId: uuidv4(), items });
  if (result.acknowledged) {
    res
      .status(201)
      .json({ status: 201, message: "Order added", data: req.body });
  } else {
    res
      .status(404)
      .json({ status: 404, message: "Order couldn't be added" });
  }

  // close the connection to the database server
  client.close();
};

module.exports = {
  getAllOrders,
  addOrder,
};
