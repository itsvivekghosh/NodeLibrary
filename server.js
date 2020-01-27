if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

//All Imports
const express = require("express");
const bodyparser = require("body-parser");
const expresslayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

//All Routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(methodOverride("_method"));
app.set("layout", "layouts/layout");

app.use(expresslayout);
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }));

mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Database Connected to MyLibrary!"))
  .catch(err => {
    console.log(err);
  });

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000);
