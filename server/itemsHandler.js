"use strict";

// returns a list of all items
const getAllItems = async (req, res) => {};

// returns one item by its ID
const getOneItem = async (req, res) => {};

// returns items by brand
const getItemsByBrand = async (req, res) => {};

// returns items by category
const getItemsByCategory = async (req, res) => {};

// return random items for new-arrivals 
// and for sale-items
// 2 endpoints use the same function
const getRandomItems = async (req, res) => {};

module.exports = {
    getAllItems,
    getOneItem,
    getItemsByBrand,
    getItemsByCategory,
    getRandomItems,
};
