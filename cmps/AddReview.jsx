import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { SelectBox } from "../cmps/SelectBox.jsx";
import { TextBox } from "../cmps/TextBox.jsx";
import { StarsBox } from "../cmps/StarsBox.jsx";

const { useState, useEffect } = React;

export function AddReview({ bookId }) {
  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [reviewToEdit, setReviewToEdit] = useState({
    fullname: "",
    rate: 0,
    date: getToday(),
  });
  const [reviews, setReviews] = useState([]);
  const [rateType, setRateType] = useState("select");

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
  function onDeleteReview(reviewId) {
    bookService.deleteReview(bookId, reviewId).then((reviews) => {
      setReviews(reviews);
    });
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
  function getStars(rate) {
    var str = "";
    for (var i = 0; i < rate; i++) {
      str += "⭐";
    }
    return str;
  }

  function onChangeRateType(ev, rateSelected) {
    setRateType(rateSelected);
  }

  const { fullname, rate, date } = reviewToEdit;
  return (
    <div className="reviews-container">
      <form className="form-container" onSubmit={onAddReview}>
        <div className="input-container">
          <label htmlFor="fullname">Full Name ?</label>
          <input
            value={fullname}
            onChange={handleChange}
            type="text"
            name="fullname"
            id="fullname"
          />

          <label htmlFor="date">When ?</label>
          <input
            value={date}
            onChange={handleChange}
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div>
          <fieldset>
            <input
              onChange={(ev) => onChangeRateType(ev, "select")}
              type="radio"
              id="selectbox"
              name="group"
              value="select"
            />
            <label htmlFor="selectbox">Select Box</label>
            <input
              onChange={(ev) => onChangeRateType(ev, "text")}
              type="radio"
              id="text"
              name="group"
              value="text"
            />
            <label htmlFor="text">Text Box</label>
            <input
              onChange={(ev) => onChangeRateType(ev, "stars")}
              type="radio"
              id="stars"
              name="group"
              value="stars"
            />
            <label htmlFor="stars">Stars</label>
          </fieldset>
        </div>
        <DynamicCmp
          rateType={rateType}
          rate={rate}
          handleChange={handleChange}
        />
        <button>Save</button>
      </form>
      <section>
        {!!reviews.length && (
          <ul className="review-list container">
            <h3>Reviews given:</h3>
            {reviews.map((review) => (
              <li key={review.id}>
                <button onClick={() => onDeleteReview(review.id)}>X</button>
                Read on: {review.date}, Name: {review.fullname}, Rate:{" "}
                {getStars(review.rate)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function DynamicCmp(props) {
  const dynamicCmps = {
    select: <SelectBox {...props} />,
    text: <TextBox {...props} />,
    stars: <StarsBox {...props} />,
  };
  return dynamicCmps[props.rateType];
}
