"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const url = require("url");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// get one user for sign in
const getOneUser = async (req, res) => {
    const user = url.parse(req.url, true).query;

    const client = new MongoClient(MONGO_URI, options);
    try {
        // connect to the client
        await client.connect();
        // connect to the database 
        // creates a new client
        const db = client.db("EcommerceGroupProject");
        //check if both email and password are present
        if (user.email && user.password && !user.userId) {


            //find user
            const result = await db.collection("users").findOne({ email: user.email });

            // check if the user is found
            if (result) {
                // check if the provided password matches
                // the one in the database
                if (user.password === result.password) {
                    res.status(200).json({ status: 200, data: result });
                } else {
                    res.status(400).json({ status: 400, message: `password not match` });
                }
            } else {
                res.status(404).json({ status: 404, message: `user not found` });
            }
            //check if login by user id
        } else if (user.userId && !user.email && !user.password) {
            //find user based on _id
            const result = await db.collection("users").findOne({ _id: user.userId });
            //check if there a result
            if (result) {
                res.status(200).json({ status: 200, data: result });
            } else {
                res.status(404).json({ status: 404, message: `user not found` });
            }
        } else {
            res.status(422).json({ status: 422, message: "missing information" })
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }

}

const addUser = async (req, res) => {
    const user = req.body;
    user._id = uuidv4();

    if (user.email && user.firstName && user.lastName &&
        user.password) {
        // creates a new client
        const client = new MongoClient(MONGO_URI, options);
        try {
            // connect to the client
            await client.connect();
            // connect to the database 
            const db = client.db("EcommerceGroupProject");
            //find user
            const result = await db.collection("users").findOne({ email: user.email });

            // check if the user already exist
            if (!result) {
                await db.collection("users").insertOne(user);
                res.status(201).json({ status: 201, message: "user successfully added" });
            } else {
                res.status(400).json({ status: 404, message: `user already existed` });
            }
            // close the connection to the database server
            client.close();
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    } else {
        res.status(422).json({ status: 422, message: "missing information" })
    }

};

module.exports = {
    getOneUser,
    addUser,
};
