"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns a list of all items
const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("EcommerceGroupProject");
        const result = await db.collection("items").find().toArray();
        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, message: "Items not found" });
        }  
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
    }

    client.close()
};

// returns one item by its ID
const getOneItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("EcommerceGroupProject");
    const result = await db.collection("items").findOne({_id: parseInt(req.params.item)});
    if (result) {
        res.status(200).json({ status: 200, data: result });
    } else {
        res.status(404).json({ status: 404, message: "Item not found" });
    }  
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
}

client.close()
};

// returns items by brand
const getItemsByBrand = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("EcommerceGroupProject");
    const result = await db.collection("items").find({companyId: parseInt(req.params.brandId)}).toArray();
    if (result.length !== 0) {
        res.status(200).json({ status: 200, data: result });
    } else {
        res.status(404).json({ status: 404, message: "Items not found" });
    }  
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
}

client.close()
};

// returns items by category
const getItemsByCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("EcommerceGroupProject");
    const result = await db.collection("items").find({category: req.params.categoryName}).toArray();
    if (result.length !== 0) {
        res.status(200).json({ status: 200, data: result });
    } else {
        res.status(404).json({ status: 404, message: "Items not found" });
    }  
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
}

client.close()
  
};

// return random items for new-arrivals 
// and for sale-items
// 2 endpoints use the same function
const getRandomItems = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    try {
      // connect to the client
      await client.connect();
      // connect to the database 
      const db = client.db("EcommerceGroupProject");
      //find items
      const result = await db.collection("items").find().toArray();
      //Get 10 random elements from the array. Reference blog https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array
      const randomArray = [...result].sort(() => 0.5 - Math.random()).slice(0,10);
      if (result) {
        res.status(200).json({ status: 200, data: randomArray });
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
    getAllItems,
    getOneItem,
    getItemsByBrand,
    getItemsByCategory,
    getRandomItems,
};
