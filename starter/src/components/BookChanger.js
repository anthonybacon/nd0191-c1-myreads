const BookChanger = ({ book, updateBook }) => {
  const getCorrectDisabledOption = () => {
    return book.shelf && book.shelf !== "none" ? "Move to..." : "Add to...";
  };

  const getOptionValueNone = () => {
    if (book.shelf && book.shelf !== "none")
      return (<option value="none">None</option>);
  }

  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={book.shelf ? book.shelf : "none"}
        onChange={(event) => updateBook(book, event.target.value)}
      >
        <option value="none" disabled>
          {getCorrectDisabledOption()}
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        {getOptionValueNone()}
      </select>
    </div>
  );
};

export default BookChanger;
