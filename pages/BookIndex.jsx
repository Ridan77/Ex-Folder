import { BookDetails } from "../pages/BookDetails.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
const { Link } = ReactRouterDOM;

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

  function onClose() {
    setSelectedBook(null);
  }

  if (!books) return <div>Loading...</div>;
  return (
    <section className="book-index">
      <BookFilter handleSetFilter={handleSetFilter} defaultFilter={filterBy} />
      <button>
        <Link to="/book/edit">Add Car</Link>
      </button>
      <BookList
        onRemoveBook={onRemoveBook}
        onSelectBook={onSelectBook}
        books={books}
      />

      {selectedBook && <BookDetails book={selectedBook} onClose={onClose} />}
    </section>
  );
}
