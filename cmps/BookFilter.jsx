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

    // function handleChangeDataInnerObjDemo({ target }) {
    //     const field = target.name
    //     let value = target.value
    //     switch (target.type) {
    //         case 'number':
    //         case 'range':
    //             value = +value
    //             break;

    //         case 'checkbox':
    //             value = target.checked
    //             break
    //     }
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, data: { ...prevFilter.data, [field]: value } }))
    // }

    function handleChangeShortVersion({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

 

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>

            <form>
                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} name="txt" value={txt} id="txt" type="text" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} name="minSpeed" value={minSpeed} id="minSpeed" type="number" />
            </form>
            {/* <button onClick={onSearch}>Search</button> */}
        </section>
    )
}