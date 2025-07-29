
export function SelectBox({ handleChange, rate }) {
  function onHandleChange(target) {
    handleChange({ target });
  }

  return (
    <div>
      <label htmlFor="rateselect">Choose an option:</label>
      <select
        id="rateselect"
        name="rate"
        value={rate}
        onChange={(ev) => onHandleChange(ev.target)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}
