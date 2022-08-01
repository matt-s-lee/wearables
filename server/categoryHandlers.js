"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns a list of all categories
const getAllCategories = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    try {
      // connect to the client
      await client.connect();
      // connect to the database 
      const db = client.db("EcommerceGroupProject");
      //find items
      const result = await db.collection("items").find().toArray();
      const categoryArray = [];
      //Push the unique categories to categoryArray
      result.forEach((item) => {
        if(categoryArray.indexOf(item.category) === -1){
            categoryArray.push(item.category);
        }
      });
      if (result) {
        res.status(200).json({ status: 200, data: categoryArray });
      } else {
        res.status(404).json({ status: 404, message: "Result is empty" });
      }
      // close the connection to the database server
      client.close();
    } catch (err) {
      console.log(err.stack);
    }
  };

module.exports = {
    getAllCategories,
};