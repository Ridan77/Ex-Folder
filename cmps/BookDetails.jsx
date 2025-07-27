// import { BookPreview } from "./BookPreview.jsx";

export function BookDetails({ book, onClose }) {

  function getPageComent() {
    if (book.pageCount > 500) return "Serious Reading";
    else if (book.pageCount > 200) return "Descent Reading";
    else if (book.pageCount < 100) return "Light Reading";
  }
  
  function evStop(ev) {
    ev.stopPropagation();
  }
console.log(book.imgSrc)
  return (
    <section onClick={onClose} className="backdrop">
      <dialog onClick={evStop} className="book-details">
        <h2>Title {book.title}</h2>
        <h3>Subtitle: {book.subtitle}</h3>
        <h3>By: {book.authors[0]}</h3>
        <p>Description:{book.desc}</p>
        <p>
          Pages: {book.pageCount} <span className="highlight" >{getPageComent()}</span>
        </p>
        <img src={`${book.imgSrc}`} alt="" />
        <button onClick={onClose}>Close</button>
      </dialog>
    </section>
  );
}
