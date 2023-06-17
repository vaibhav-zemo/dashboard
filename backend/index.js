const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a schema and model for your data
const dataSchema = new mongoose.Schema({
  2012: { type: String },
  2013: { type: String },
  2014: { type: String },
  2015: { type: String },
  2016: { type: String },
  2017: { type: String },
  2018: { type: String },
  2019: { type: String },
  2020: { type: String },
  2021: { type: String },
  _id: { type: mongoose.Types.ObjectId, required: true },
  FB: { type: String },
});

const DataModel = mongoose.model("datas", dataSchema);
// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get data
 *     description: Retrieve data from the MongoDB collection.
 *     responses:
 *       200:
 *         description: Data
 *       500:
 *         description: Internal Server Error
 */

// Define a route to fetch and send the data
app.get("/data", async (req, res) => {
  // Fetch the data from the MongoDB collection
  await DataModel.find()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    });
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/frontend/build/index"));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
