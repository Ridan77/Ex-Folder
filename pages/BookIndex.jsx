import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState(null);

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log("err:", err));
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() =>
        setBooks((books) => books.filter((book) => book.id !== bookId))
      )
      .catch((err) => console.log("err:", err));
  }

  function onSelectBook(book) {
    setSelectedBook(book);
  }

  function handleSetFilter(newFilterBy) {
    setFilterBy({ ...newFilterBy });
  }

  function evStop(ev) {
    ev.stopPropagation();
  }

  function onClose() {
    setSelectedBook(null);
  }

  if (!books) return <div>Loading...</div>;
  return (
    <section className="book-index">
      <BookFilter handleSetFilter={handleSetFilter} defaultFilter={filterBy} />
      <BookList onRemoveBook={onRemoveBook} onSelectBook={onSelectBook} books={books} />

      {selectedBook && (
        <section onClick={onClose} className="backdrop">
          <dialog onClick={evStop} className="book-details">
            <h2>{selectedBook.title}</h2>
            

            <button onClick={onClose}>Close</button>
          </dialog>
        </section>
      )}
    </section>
  );
}
