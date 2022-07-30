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

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
