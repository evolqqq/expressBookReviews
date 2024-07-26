const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user, please enter a valid username or password."});
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
    const id = req.params.isbn.replace(':', ''); // Remove the colon if it exists
    res.send(JSON.stringify(books[1].reviews,null,4));
});

module.exports.general = public_users;
