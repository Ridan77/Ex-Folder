const { useState, useEffect } = React;

export function BookFilter({ defaultFilter, handleSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter);

  useEffect(() => {
    handleSetFilter(filterByToEdit);
  }, [filterByToEdit]);

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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  var { txt, price } = filterByToEdit
  if (price === 0) price = null
  return (
    <section className="book-filter container">
      <h3>Filter Our Books</h3>
      <form>
        <label htmlFor="txt">Title</label>
        <input
          onChange={handleChange}
          name="txt"
          value={txt}
          id="txt"
          type="text"
        />

        <label htmlFor="price">Max Price</label>
        <input
          onChange={handleChange}
          name="price"
          value={price}
          id="price"
          type="number"
        />
      </form>
      button
    </section>
  );
}
