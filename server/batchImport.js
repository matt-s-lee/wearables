
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// import JSON file to Mongodb using fs packge
// reference: https://stackoverflow.com/questions/54587040/import-external-json-file-to-mongodb-using-nodejs-and-mongoose
const fs = require('fs');
// read companies.json
let companiesData = fs.readFileSync('./data/companies.json');
let companies = JSON.parse(companiesData);
// read items.json
let itemsData = fs.readFileSync('./data/items.json');
let items = JSON.parse(itemsData);
// read users.json
let usersData = fs.readFileSync('./data/users.json');
let users = JSON.parse(usersData);
// read shoppingcart.json
let shoppingcartData = fs.readFileSync('./data/shoppingcarts.json');
let shoppingcarts = JSON.parse(shoppingcartData);
// read orders.json
let ordersData = fs.readFileSync('./data/orders.json');
let orders = JSON.parse(ordersData);


const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("EcommerceGroupProject");

        await db.collection("companies").insertMany(companies);  
        await db.collection("items").insertMany(items);
        await db.collection("users").insertMany(users);
        await db.collection("shoppingcarts").insertMany(shoppingcarts);
        await db.collection("orders").insertMany(orders);

        console.log("Success")
    } catch (err) {
        console.log(`message: ${err.message}`);
    }

    client.close()

    
}

batchImport();