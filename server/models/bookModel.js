const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookTitle:String,
    author:String,
    publisher:String,
    editor:String,
    subject:String,
    language:String,
    year:String,
    url:String,
    isTranslation:Boolean,
    originalBook:String,
    originalAuthor:String,
    originalPublisher:String,
    originalLanguage:String,
    originalYear:String,
    originalUrl:String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
