import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;

export function AddReview({ bookId }) {
  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [reviewToEdit, setReviewToEdit] = useState({
    fullname: "",
    rate: 0,
    date: getToday(),
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    bookService.getReviews(bookId).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

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
    setReviewToEdit((prevReview) => ({ ...prevReview, [field]: value }));
  }
function onDeleteReview(reviewId){
  bookService.deleteReview(bookId,reviewId)
  .then(reviews=> {
    setReviews(reviews)
  })
}
  function onAddReview(ev) {
    ev.preventDefault();
    bookService
      .saveReview(reviewToEdit, bookId)
      .then((reviews) => {

        setReviews(reviews);

      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Error adding review");
      });
  }
 function getStars(rate){
    var str=''
    for (var i=0; i<rate;i++){
        str+='⭐'
    }
    return str
 }
  const { fullname, rate, date } = reviewToEdit;
  return (
    <div>
      <form onSubmit={onAddReview}>
        <label htmlFor="fullname">Full Name ?</label>
        <input
          value={fullname}
          onChange={handleChange}
          type="text"
          name="fullname"
          id="fullname"
        />

        <label htmlFor="rate">Rating ?</label>
        <input
          value={rate}
          onChange={handleChange}
          type="range"
          min="0"
          max="5"
          name="rate"
          id="rate"
        />

        <label htmlFor="date">When ?</label>
        <input
          value={date}
          onChange={handleChange}
          type="date"
          name="date"
          id="date"
        />
        <button>Save</button>
      </form>
      <section>


    {!!reviews.length && <ul className="review-list container">
      <h3>Reviews given:</h3>
      {reviews.map((review) => (
        <li key={review.id}>
            <button onClick={()=>onDeleteReview(review.id)} >X</button>
            Read on: {review.date},
            Name: {review.fullname},
            Rate: {getStars(review.rate)}
        </li>
      ))}
    </ul>}

      </section>
    </div>
  );
}
