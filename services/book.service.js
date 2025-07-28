import { getRandomIntInclusive, loadFromStorage, makeId, makeLorem, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getPriceClass,
    getEmptyBook,
    saveReview,
    getReviews,
    deleteReview,


}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                console.log(filterBy)
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
       .then(book =>  _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}
function getEmptyBook(title = '', desc = '') {
    return { title, desc }
}

function getDefaultFilter() {
    // return { txt: '', price: '', data: { txtData: '' } }
    return { txt: '', price: '' }
}

function getPriceClass(amount) {
    if (amount > 150) return 'red'
    if (amount < 20) return 'green'
    return ''
}



function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: makeId(),
                title: makeLorem(2),
                subtitle: makeLorem(4),
                authors: [
                    makeLorem(1)
                ],
                reviews: [],
                publishedDate: getRandomIntInclusive(1950, 2024),
                desc: makeLorem(20),
                pageCount: getRandomIntInclusive(20, 600),
                categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
                imgSrc: `/assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        books[0].listPrice.amount = 14
        books[0].listPrice.isOnSale = true
        saveToStorage(BOOK_KEY, books)
    }
}


function saveReview(review, bookId) {
    return get(bookId)
        .then((book) => {
            review.id = makeId()
            book.reviews.unshift(review)
            save(book)
            return book.reviews
        })
}
function getReviews(bookId) {
    return get(bookId)
          .then(book => {
            return book.reviews
        })
}

function deleteReview(bookId,reviewId){
       return get(bookId)
          .then(book => {
            const idx = book.reviews.findIndex(item=>item.id===reviewId)
            book.reviews.splice(idx,1)
            save(book)
            return book.reviews
        })
}



function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((item) => item.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

