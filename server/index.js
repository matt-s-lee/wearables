'use strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 4000;

const {
  getAllItems,
  getOneItem,
  getItemsByBrand,
  getItemsByCategory,
  getRandomItems,
} = require("./itemsHandler");

const { getAllBrands } = require("./brandsHandlers");
const { getAllCategories } = require("./categoryHandlers");
const { getOneUser, addUser } = require('./usersHandler');
const { getAllItemsInCart, addItemInCart, deleteItemInCart, emptyCart } = require('./shoppingcartHandler');
const { addOrder, getAllOrders } = require('./orderHandler');

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?

  // Endpoints for items database
  .get("/api/all-items", getAllItems)
  .get("/api/item/:item", getOneItem)
  .get("/api/items-by-brand/:brandId", getItemsByBrand)
  .get("/api/items-by-category/:categoryName", getItemsByCategory)

  // sale items and new arrivals items endpoints
  // handler functions in itemsHandlers.js 
  .get("/api/sale-items",getRandomItems)
  .get("/api/new-arrivals",getRandomItems)

  // Endpoints for category database
  .get("/api/all-categories",getAllCategories)

  // Endpoints for companies database
  .get("/api/all-brands",getAllBrands)

  // Endpoints for users database
  .get("/api/user/", getOneUser) //e.g. ?email=tom_smith@gmail.com&password=verystrongpassword
  .post("/api/user", addUser) //e.g. req.body={firstName: "tom", lastName: "Smith", email: "tom@gmail.com", password: "123456"} parse to JSON
  
  // Endpoints for shopping cart database
  .get("/api/all-items-in-cart/:user", getAllItemsInCart)
  .post("/api/add-item-in-cart/", addItemInCart) //e.g. req.body={user: 123, item: 09809809}
  .delete("/api/delete-item-in-cart", deleteItemInCart) //e.g. req.body={user: 123, item: 09809809}
  .delete("/api/empty-cart/:user", emptyCart)

  // Endpoints for order history database
  .get("/api/all-orders-by-user/:user", getAllOrders)
  .post("/api/add-order", addOrder) //e.g. req.body={user: 123, items: [09809809, 4356232]}


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
