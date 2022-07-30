"use strict";


const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns a list of all brands
const getAllBrands = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    try {
      // connect to the client
      await client.connect();
      // connect to the database 
      const db = client.db("companies");
      //find companies
      const result = await db.collection("companies").find().toArray();
      const brandsArray = [];
      //Push the company names to brandsArray
      result.forEach((item) => {
            brandsArray.push(item.name);
      });
      if (result) {
        res.status(200).json({ status: 200, data: brandsArray });
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
    getAllBrands,
};
