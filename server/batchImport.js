
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
let companiesData = fs.readFileSync('./server/data/companies.json');
let companies = JSON.parse(companiesData);
let itemsData = fs.readFileSync('./server/data/items.json');
let items = JSON.parse(itemsData);


const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const dbCompanies = client.db("companies");
        
        await dbCompanies.collection("companies").insertMany(companies);

        const dbItems = client.db("items");
        await dbItems.collection("items").insertMany(items);

        console.log("Success")
    } catch (err) {
        console.log(`message: ${err.message}`);
    }

    client.close()

    
}

batchImport();