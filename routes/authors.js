const express = require("express");
const Author = require("../models/author");
const router = express.Router();

//All Author Routes
router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/author_index", {
      authors: authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new_author", { author: new Author() });
});

//Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  // author.save((err, newAuthor) => {
  //     if (err) {
  //         res.render(`authors/new_author`, {
  //             author: author,
  //             errorMessage: 'Error creating Author'
  //         })
  //     }
  //     else {
  //         // res.redirect(`'authors/${newAuthor.id}`)
  //         res.redirect('authors')
  //     }
  // })

  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect("/authors");
  } catch {
    res.render("authors/new_author", {
      author: author,
      errorMessage: "Error Creating Author"
    });
  }
});

module.exports = router;
