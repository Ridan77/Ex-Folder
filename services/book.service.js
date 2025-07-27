import { getRandomIntInclusive, loadFromStorage, makeId, makeLorem, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }
            if (filterBy.minSpeed) {
                books = books.filter(book => book.speed >= filterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '', data: { txtData: '' } }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            
            _createBook('metus hendrerit', 'placerat nisi sodales suscipit tellus',
                '/assets/img/1.jpg',
                {amount:109,currencyCode:'EUR',isOnSale: false }),
            _createBook('metus 2', 'placerat nisi sodales suscipit tellus',
                '/assets/img/2.jpg',
                {amount:70,currencyCode:'EUR',isOnSale: false }),
            _createBook('metus 3', 'placerat nisi sodales suscipit tellus',
                '/assets/img/3.jpg',
                {amount:50,currencyCode:'EUR',isOnSale: false }),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, desc, imgSrc, listPrice) {
    const book = {
    id : makeId(),
    title,
    desc,
    imgSrc,
    listPrice ,
    }
    return book

}



