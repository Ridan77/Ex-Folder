import { LongTxt } from "../cmps/LongTxt.jsx";


export function BookDetails({ book, onClose }) {

  function getPageComent() {
    if (book.pageCount > 500) return "Serious Reading";
    else if (book.pageCount > 200) return "Descent Reading";
    else if (book.pageCount < 100) return "Light Reading";
  }
  
  function getPublishDateComent(){
    const currYear = new Date().getFullYear()
       return currYear-book.publishedDate > 10 ? 'Vintage' : 'New'
  }

  const price = book.listPrice.amount
  function getPriceClass(){
    if(price >150 ) return 'red-price'
    else if (price<20) return 'green-price'
    else return ''
  }

  function evStop(ev) {
    ev.stopPropagation();
  }
const onSaleSign = book.listPrice.isOnSale ? 'On Sale' :''

  return (
    <section onClick={onClose} className="backdrop">
      <dialog onClick={evStop} className="book-details">
        <h2>Title {book.title}</h2>
        <h3>Subtitle: {book.subtitle}</h3>
        <h3>By: {book.authors[0]}</h3>
        <h4>Description:<LongTxt txt={book.desc} length={100} /></h4>
        <p>
          Pages: {book.pageCount} <span className="highlight" >{getPageComent()}</span>
        </p>
        <p className="highlight" >{getPublishDateComent()}</p>
        <p>Price: <span className={`${getPriceClass()}`} >{price}</span> </p>
        <p> <span className="on-sale">{onSaleSign}</span></p>
        <img src={`${book.imgSrc}`} alt="" />
        <button onClick={onClose}>Close</button>
      </dialog>
    </section>
  );
}
