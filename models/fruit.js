// models/fruit.js
//we must first import the mongoose library into our fruit.js file:
const mongoose = require("mongoose");
// define the schema for our fruit model
//Schema بتقول لك الاعمدة و الصفوف الي في الداتا شنو اسمهم وجي 
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
  });

//نفس التيبل مال الsql 
  const Fruit = mongoose.model("Fruit", fruitSchema); // create model

  // models/fruit.js
//The Fruit model is what we will use to perform CRUD on the collection.
module.exports = Fruit;










