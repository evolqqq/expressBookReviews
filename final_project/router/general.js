const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user, please enter a valid username or password." });
});

const getBooks = () => new Promise((resolve) => {
    resolve(JSON.stringify(books, null, 4));
});

const getBookISBN = (isbn) => new Promise((resolve) => {
    resolve(JSON.stringify(books[isbn], null, 4));
});

const getBooksAuthor = (author) => new Promise((resolve) => {
    const results = [];
    for (let key in books) {
        if (books[key].author === author) {
            results.push(books[key]);
        }
    }
    resolve(results);
});

const getBooksTitle = (title) => new Promise((resolve) => {
    for (let key in books) {
        if (books[key].title === title) {
            resolve(books[key]);
            return;
        }
    }
    resolve(null);
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    getBooks().then((books) => res.send(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const id = req.params.isbn.replace(':', ''); // Remove the colon if it exists
    getBookISBN(id).then((book) => res.send(book));
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.replace(':', '');
    getBooksAuthor(author).then((books) => res.json(books));
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.replace(':', '');  // Get title from URL parameter
    getBooksTitle(title).then((book) => {
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const id = req.params.isbn.replace(':', ''); // Remove the colon if it exists
    res.send(JSON.stringify(books[id].reviews, null, 4));
});

module.exports.general = public_users;
