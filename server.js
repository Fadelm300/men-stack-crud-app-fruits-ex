// Here is where we import modules
// We begin by loading Express

//npm init
//npm i dotenv
//npm i mongoose
//npm i ejs
//npm i morgan
//npm i mongoose dotenv
//npm i method-override morgan


const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();

const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new


// DB connection code

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// routes below

//Define the route
//This route uses app.delete to listen for delete requests. When a delete request is made to /fruits/:fruitId, it will respond with a message saying "This is the delete route". This step ensures that the delete route is being accessed correctly when the delete button is clicked.
//Test a delete button in the browser.

// app.delete("/fruits/:fruitId", async (req, res) => {
//   await Fruit.findByIdAndDelete(req.params.fruitId);
//   res.redirect("/fruits");
// });
app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });

// server.js

// GET /
// app.get("/", async (req, res) => {
//     res.send("hello, friend!");
//   });


// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  
  //====================
//Define the route
  // GET /fruits
// app.get("/fruits", (req, res) => {
//     res.send("Welcome to the index page!");
//   });

// app.get("/fruits", async (req, res) => {
//     const allFruits = await Fruit.find();
//     res.send("Welcome to the index page!");
//   });

//We'll pass the allFruits data to our template under the key fruits. This way, our EJS template can use fruits to access and display the data:
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });

//=============

  // Here's how we can include the Fruit model in server.js:
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Fruit model
const Fruit = require("./models/fruit.js");


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));






//Define the route
// GET /fruits/new

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("./fruits/new.ejs");
  });




// Let's start by defining and testing our route. Add the following code to server.js, beneath the new route:
// POST /fruits
// app.post("/fruits", async (req, res) => {
//     console.log(req.body);
//     res.redirect("/fruits/new");
//   });

//عقب التعديل 
  //Build the create functionality
//Now that we've confirmed our form submits data to the POST route, let's add the logic to create a fruit in our database:
// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });


  // server.js
//Update 'create' route redirect
// Now that we have an index page displaying all our fruits, it's a good idea to update our create route. Instead of redirecting users back to the form after adding a new fruit, we can redirect them to the index page. This is a better user experience because they can immediately see the result of adding a new fruit to the database
// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits"); // redirect to index fruits
  });



  

//Define the route
//   app.get("/fruits/:fruitId", (req, res) => {
//     res.send(
//       `This route renders the show page for fruit id: ${req.params.fruitId}!`
//     );
//   });
//Build the read functionality

// app.get("/fruits/:fruitId", async (req, res) => {
//     const foundFruit = await Fruit.findById(req.params.fruitId);
//     res.send(`This route renders the show page for fruit id: ${req.params.fruitId}!`);
//   });
//Rendering the Fruit details
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });



//   Define the route
// Because this route URL has three parts, it does not conflict with others and can be placed anywhere among our other routes.

// Add the following below the other routes in server.js:
// GET localhost:3000/fruits/:fruitId/edit
// app.get("/fruits/:fruitId/edit", async (req, res) => {
//     const foundFruit = await Fruit.findById(req.params.fruitId);
//     console.log(foundFruit);
//     res.send(`This is the edit route for ${foundFruit.name}`);
//   });
//Lastly, let's modify our route so that it renders views/fruits/edit.ejs, passing in the foundFruit variable we created above:
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });






  //The update route
//Create the route
// server.js

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });









  



  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });