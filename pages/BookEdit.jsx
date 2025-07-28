import { bookService } from "../services/book.service.js";

const { useNavigate, useParams } = ReactRouterDOM;
const { useState, useEffect } = React;

export function BookEdit() {
  const [bookToEdit, setBooktoEdit] = useState(bookService.getEmptyBook());
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) loadBook();
  }, []);

  function loadBook() {
    setIsLoading(true);
    bookService
      .get(bookId)
      .then((book) => setBooktoEdit(book))
      .catch((err) => console.log("err:", err))
      .finally(() => setIsLoading(false));
  }
  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }
    setBooktoEdit((prevBook) => ({ ...prevBook, [field]: value }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then((savedBook) => {
        console.log("Saved", savedBook);
        navigate("/book");
      })
      .catch((err) => console.log("err:", err));
  }
    const { title, desc } = bookToEdit

    const loadingClass = isLoading ? 'loading' : ''

  return (
    <section className="book-edit">
      <h1>Add /Edit Book</h1>
      <form className={loadingClass} onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="desc">Description</label>
        <input
          value={desc}
          onChange={handleChange}
          type="text"
          name="desc"
          id="desc"
        />
        <button disabled={isLoading}>Save</button>
      </form>
    </section>
  );
}
