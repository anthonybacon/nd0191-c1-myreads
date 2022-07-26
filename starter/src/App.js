import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelves from "./components/BookShelves";
import Search from "./components/Search";

function App() {
  // Initialize books with an Empty array
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // Since we have a list of books get from search that has not a shelf value
  // in order to display them on the main page, we have to combine the searched books
  // with the one already get from getAll().
  const [ids, setIds] = useState([]);
  const [updatedBooks, setUpdatedBooks] = useState([]);

  // Get the list of all book from API using useEffect Hook
  useEffect(() => {
    const getAllBooks = async () => {
      const response = await BooksAPI.getAll();
      setBooks(response);
      // Get the ids from books already get
      setIds(() =>
        response.map((item) => {
          return item.id;
        })
      );
    };

    getAllBooks();
  }, []);

  // Update book and moved to the correct shelf
  const updateBook = (book, shelf) => {
    const updatedBooks = books.map((b) => {
      // Change book shelf
      if (b.id === book.id) {
        book.shelf = shelf;
        if (!ids.includes(book.id)) {
          ids.push(book.id);
        }
        return book;
      }
      return b;
    });
    if (!ids.includes(book.id)) {
      book.shelf = shelf;
      updatedBooks.push(book);
    }
    // Update DB using API and change state to books in order to correctly display UI
    setBooks(updatedBooks);
    BooksAPI.update(book, shelf);
  };

  const updateQuery = (q) => {
    setSearchQuery(q);
  };

  // Search functionality using useEffect
  useEffect(() => {
    let mount = true;

    if (searchQuery) {
      const searchBook = async () => {
        const response = await BooksAPI.search(searchQuery);
        if (response.error) {
          setSearchResult([]);
        } else {
          if (mount) {
            setSearchResult(response);
          }
        }
      };

      searchBook();
    }
    // Clean up side effect
    return () => {
      mount = false;
      setSearchResult([]);
    };
  }, [searchQuery]);

  useEffect(() => {
    const updatedBooks = searchResult.map((book) => {
      if (ids.includes(book.id)) {
        // from id get the book
        const bookFromId = books.find((b) => {
          return b.id === book.id;
        });
        return bookFromId;
      } else {
        return book;
      }
    });

    setUpdatedBooks(updatedBooks);
  }, [searchResult, ids, books]);

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={<BookShelves books={books} updateBook={updateBook} />}
        />
        <Route
          path="/search"
          element={
            <Search
              query={searchQuery}
              updateBook={updateBook}
              results={updatedBooks}
              updateQuery={updateQuery}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
