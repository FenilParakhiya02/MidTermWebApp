/*
books.js
Fenil Parakhiya 
301240778
Favourite Book List web app
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
        res.render('books/index', {
        title: 'Books',
        books: books  
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    res.render('books/details', { 
    title: 'Add a book', 
    books: book() 

    })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const newBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
    });

    book.create(newBook, (err, Book) => {
      if(!err) {

        res.redirect('/books');
            
      }
      else {
        console.log(err);
        res.end(err);
      }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  const id = req.params.id;
    /*****************
     * ADD CODE HERE *
     *****************/
     
     book.findById(id, (err, editBook) => {
         if (!err) {
            res.render('books/details', { 
            title: 'Edit a book', 
            books: editBook 
          });

         }
         else{
   
          console.log(err);
          res.end(err);             
           
         }
     });
    
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     const id = req.params.id;
     const updateBook = book({
        _id: id,
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre
      });

    book.updateOne({_id: id}, updateBook, err => {
        if(!err) {

          res.redirect('/books');

        }
        else {
            
          console.log(err);
            res.end(err); 

        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     const id = req.params.id;
     book.remove({_id: id}, err => {
      if(!err) {

        res.redirect('/books');

      }
      else {

        console.log(err);
        res.end(err);

      }
   });
});


module.exports = router;
