const express = require("express");
const mongoose = require("mongoose");

// Middlewares
const cachingAndPaginationMiddleware = require("./src/utils/middlewares/cachingAndPagination.middleware");

// Schemas and Utility methods
const Book = require("./src/Schemas/BookSchema");
const createTestBooksData = require("./src/utils/createTestBooksData");

// App constants
const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017/BookStore";

connectToDB().catch((error) => console.log(error.message));

async function connectToDB() {
  await mongoose.connect(uri);
}

// Below function is to create test books data if it does not exist in db
createTestBooksData();

// Serves cached and paginated books list using caching and pagination middleware
app.get(
  "/books",
  cachingAndPaginationMiddleware(Book, "bookstore"),
  (req, res) => {
    res.json(res.result);
  }
);

app.listen(port, () => {
  console.log("Server listening on port:", port);
});
