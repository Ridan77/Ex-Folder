import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { showErrorMsg } from "../services/event-bus.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
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
        setBooks((books) =>{ 
          books.filter((book) => book.id !== bookId)
          showSuccessMsg('Book removed successfully')
        })
      )
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg('Error removing Book')
      });
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
        <Link to="/book/edit">Add Book</Link>
      </button>
      <BookList
        onRemoveBook={onRemoveBook}
        onSelectBook={onSelectBook}
        books={books}
      />

    
    </section>
  );
}
