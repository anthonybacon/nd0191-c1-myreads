// A list of book shelf

import BookShelf from "./BookShelf";
import Header from "./Header";
import { Link } from "react-router-dom";

const BookShelves = ({ books, updateBook }) => {

  // Define variables that contains the correct list of book filter by shelf
  const currentlyReadingBooks = books.filter((book)=>book.shelf === "currentlyReading");
  const wantToReadBooks = books.filter((book)=>book.shelf === "wantToRead");
  const readBooks = books.filter((book)=>book.shelf === "read");
 
  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          <BookShelf bookShelfName="Currently Reading" books={currentlyReadingBooks} updateBook={updateBook}/>
          <BookShelf bookShelfName="Want to Read" books={wantToReadBooks} updateBook={updateBook}/>
          <BookShelf bookShelfName="Read" books={readBooks} updateBook={updateBook}/>
        </div>
      </div>
      <div className="open-search">
      <Link to="/search" className="close-search" />
      </div>
    </div>
  );
};

export default BookShelves;
