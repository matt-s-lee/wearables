"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllItemsInCart = async (req, res) => {
    const _id = req.params.user;
    console.log(_id)
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to the client
        await client.connect();
        // connect to the database
        const db = client.db("EcommerceGroupProject");
        // find the shopping cart for user
        const result = await db.collection("shoppingcarts").findOne({_id});
        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            const cart = {
                _id: _id,
                userID: _id,
                items: []
            };
            await db.collection("shoppingcarts").insertOne(cart);
            res.status(200).json({ status: 200, data: cart, message: "empty cart" });
        }  
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }

    client.close()
};

const addItemInCart = async (req, res) => {
    const _id = req.body.user;
    const item = req.body.item;

    if (_id && item) {
        // creates a new client
        const client = new MongoClient(MONGO_URI, options);
        try {
            // connect to the client
            await client.connect();
            // connect to the database 
            const db = client.db("EcommerceGroupProject");
            //find shopping cart for user
            const result = await db.collection("shoppingcarts").findOne({_id});

            // check if a shopping cart for this user exist
            if (result) {
                // check if item already in shopping cart
                let itemIndex = -1;
                result.items.forEach((element, index) => {
                    if (element.itemId === parseInt(item)) {
                        itemIndex = index;
                    }
                })
                // add item to shooping cart with quantity 1
                if (itemIndex === -1) {
                    const newItem = {
                        itemId: item,
                        quantity: 1
                    }
                    result.items.push(newItem);
                } else {
                    // increment item quantity
                    result.items[itemIndex].quantity++;
                }
                await db.collection("shoppingcarts").updateOne({_id}, { $set: result });
                res.status(201).json({ status: 201, data: result, message: "item successfully added" });
            } else {
                res.status(404).json({ status: 404, data: req.body, message: "shopping cart not found" });
            }
            // close the connection to the database server
            client.close();
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    } else {
        res.status(422).json({ status: 422, data: req.body, message: "missing information" })
    }
};

const deleteItemInCart = async (req, res) => {
    const _id = req.body.user;
    const item = req.body.item;

    if (_id && item) {
        // creates a new client
        const client = new MongoClient(MONGO_URI, options);
        try {
            // connect to the client
            await client.connect();
            // connect to the database 
            const db = client.db("EcommerceGroupProject");
            //find shopping cart for user
            const result = await db.collection("shoppingcarts").findOne({_id});

            // check if a shopping cart for this user exist
            if (result) {
                // check if item in shopping cart
                let itemIndex = -1;
                result.items.forEach((element, index) => {
                    if (element.itemId === parseInt(item)) {
                        itemIndex = index;
                    }
                })

                if (itemIndex === -1) {
                    res.status(404).json({ status: 404, data: req.body, message: "item not found" });
                } else {
                    if (result.items[itemIndex].quantity > 1) {
                        // decrease item quantity if quantity > 1
                        result.items[itemIndex].quantity--;
                    } else {
                        // remove item if quantity is 1
                        result.items.splice(itemIndex, 1);
                    }
                    await db.collection("shoppingcarts").updateOne({_id}, { $set: result });
                    res.status(201).json({ status: 201, data: result, message: "item successfully added" });
                }
            } else {
                res.status(404).json({ status: 404, data: req.body, message: "shopping cart doesn't exist" });
            }
            // close the connection to the database server
            client.close();
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    } else {
        res.status(422).json({ status: 422, data: req.body, message: "missing information" })
    }
};

const emptyCart = async (req, res) => {
    const _id = req.params.user;
    // create new client
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to the client
        await client.connect();
        // connect to the database
        const db = client.db("EcommerceGroupProject");
        // find the shopping cart for user
        const result = await db.collection("shoppingcarts").findOne({_id});

        if (result) {
            await db.collection("shoppingcarts").deleteOne({_id});
            res.status(200).json({ status: 200, message: "cart emptied" });
        } else {
            res.status(404).json({ status: 404, message: "shopping cart not found" });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }

    client.close()
};

module.exports = {
    getAllItemsInCart,
    addItemInCart,
    deleteItemInCart,
    emptyCart,
};