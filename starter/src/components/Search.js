import { Link } from "react-router-dom";
import Book from "./Book";

const Search = ({ query, updateQuery, results, updateBook }) => {

  const updateSearchQuery = (event) => {
    updateQuery(event.target.value)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title, author, or ISBN" value={query} onChange={(event) => updateSearchQuery(event)} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map( (book) => (
            <li key={book.id}>
              <Book book={book} updateBook={updateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
