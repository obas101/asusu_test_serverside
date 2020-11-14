require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
	res.json("Welcome to Nodejs");
});

require("./Route/products.route.js")(app);

const PORT = process.env.PORT || 8585;

app.listen(PORT, () => {
	console.log("Backend Running Now");
});
