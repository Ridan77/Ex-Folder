const { useState, useEffect } = React

export function BookFilter({ defaultFilter, handleSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        handleSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleChangeShortVersion({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

 

    const { txt, price } = filterByToEdit
    return (
        <section className="book-filter container">
            <h3>Filter Our Books</h3>

            <form>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} name="txt" value={txt} id="txt" type="text" />

                <label htmlFor="price">Max Price</label>
                <input onChange={handleChange} name="price" value={price} id="price" type="number" />
            </form>
            button
        </section>
    )
}