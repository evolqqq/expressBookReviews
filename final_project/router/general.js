const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const id = req.params.isbn.replace(':', ''); // Remove the colon if it exists
    res.send(JSON.stringify(books[id],null,4));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author.replace(':', '');
    // Iterate over the books object to find the book with the matching author
    const results = [];

    // Iterate over the books object to find all books with the matching author
    for (let key in books) {
        if (books[key].author === author) {
            results.push(books[key]);  // Add the book to results
        }
    }
    res.json(results);  // Respond with the array of books

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title.replace(':', '');  // Get title from URL parameter
    let found = false;

    // Iterate over the books object to find the book with the matching title
    for (let key in books) {
        if (books[key].title === title) {
            res.json(books[key]);  // Respond with the book details
            found = true;
            break;
        }
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
