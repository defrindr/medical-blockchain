// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AppRouter = require("./api");
const RouteHelper = require("./helpers/register-routes.helper");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register module
app.use("/api", AppRouter);

// Get all registered routes
RouteHelper.get(app._router, true);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
