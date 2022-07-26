// Component inside a book shelf
import BookChanger from "./BookChanger";

const Book = ({ book, updateBook }) => {

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ""})`
        }}
        ></div>
        <BookChanger book={book} updateBook={updateBook} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{(book.authors && book.authors.length > 1) ? book.authors.join(", ") : book.authors}</div>
    </div>
  );
};

export default Book;
