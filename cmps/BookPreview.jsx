export function BookPreview({ book }) {

    const { title, desc,imgSrc} = book
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h6>Description: {desc}</h6>
            <img src={imgSrc} alt="Book Image" />
        </article>
    )
}