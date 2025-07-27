export function BookPreview({ book }) {

    const { title, desc,imgSrc} = book
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Desc {desc}</h4>
            <img src={imgSrc} alt="Book Image" />
        </article>
    )
}