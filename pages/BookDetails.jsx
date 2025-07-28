import { AddReview } from "../cmps/AddReview.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBook();
  }, [bookId]);
  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => setBook(book))
      .catch((err) => console.log("err:", err));
  }

  function onBack() {
    navigate("/book");
  }

  function getBookLng(lng) {
    const bookLang = {
      he: "Hebrew",
      sp: "Spanish",
    };
    return bookLang[lng] || "English";
  }

  function getPublishDate() {
    const currYear = new Date().getFullYear();
    let publishedYear = book.publishedDate;
    let diff = currYear - publishedYear;
    if (diff > 10) publishedYear += " - Vintage";
    else if (diff <= 1) publishedYear += " - NEW!";
    return publishedYear;
  }

  function getPageCount() {
    let pageCount = book.pageCount;
    if (book.pageCount > 500) pageCount += " - Long reading";
    else if (book.pageCount > 200) pageCount += " - Descent reading";
    else if (book.pageCount < 100) pageCount += " - Light reading";
    return pageCount;
  }
  if (!book) return <div>Loading...</div>;

  const {
    title,
    subtitle,
    thumbnail,
    authors,
    desc,
    language,
    categories,
    listPrice,
  } = book;
  const priceClass = bookService.getPriceClass(listPrice.amount);
  const publishDate = getPublishDate();
  const pageCount = getPageCount();
  return (
    <section className="book-details-container">
      <div className="page-btn-container">
        <button>
          <Link to={`/book/${book.prevBookId}`}>Prev</Link>
        </button>
        <button>
          <Link to={`/book/${book.nextBookId}`}>Next</Link>
        </button>
      </div>
      <div className="book-details-title">{title}</div>
      <div className="book-details-subtitle">{subtitle}</div>
      <div className="book-thumbnail-container">
        {listPrice.isOnSale && (
          <div className="book-details-on-sale">On-sale!</div>
        )}
        <img src={thumbnail} />
      </div>

      <div className="book-details-info">
        <div className="book-details-info-row">
          <span className="book-details-info-title">Year publish:</span>
          <span className="book-details-info-text">{publishDate}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">
            Author{authors.length > 1 ? "s" : ""}:
          </span>
          <span className="book-details-info-text">{authors.join(", ")}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Language:</span>
          <span className="book-details-info-text">{getBookLng(language)}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Categories:</span>
          <span className="book-details-info-text">
            {categories.join(", ")}
          </span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Pages:</span>
          <span className="book-details-info-text">{pageCount}</span>
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Price:</span>
          <span className={`book-details-info-text ${priceClass}`}>
            {listPrice.amount} {listPrice.currencyCode}
          </span>
        </div>

        <div className="book-details-buy-container">
          {book.listPrice.isOnSale && (
            <button
              className="buy-book-btn"
              onClick={() => alert(`HA! ma ze po hanut?`)}>
              Buy it now!
            </button>
          )}
        </div>

        <div className="book-details-info-row">
          <span className="book-details-info-title">Description:</span>
          <LongTxt txt={desc} />
        </div>

        <AddReview bookId={bookId} />
          <div className="actions-btns">
            <button className="go-back-btn" onClick={onBack}>
              ⬅ Go back
            </button>
          </div>
      </div>
    </section>
  );
}
