export function TextBox({ handleChange,rate }) {
  function onHandleChange(target) {
    handleChange({ target });
  }

  return (
    <div>
      <label htmlFor="text">Type your Rate :</label>
      <input
        id="text"
        name="rate"
        value={rate}
        type="text"
        onChange={(ev) => onHandleChange(ev.target)}
      />
    </div>
  );
}
