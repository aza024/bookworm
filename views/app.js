class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author; 
        this.isbn = isbn; 
    }
}

class UI {
    static displayBooks(){
        const books = Store.getBooks(); 

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#bookList')

        // UI.showAlert('Book Added', 'success')

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class="delete">X</a> </td>
        `
        list.appendChild(row);
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('body');
        const form = document.querySelector('#bookForm');
        container.insertBefore(div, form);
        setTimeout(()=>{
            document.querySelector('.error').remove()
        }, 3000);

        setTimeout(()=>{
            document.querySelector('.success').remove()
        }, 3000);

    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}

class Store{
    static getBooks(){
        let books; 
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks)

document.querySelector('#bookForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === "" || author === "" || isbn === ""){
        UI.showAlert('Please fill in all fields', 'error')
    } else {

        const book = new Book(title, author, isbn);
        
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert('Book Added', 'success')
        UI.clearFields();
    }
})

document.querySelector('#bookList').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed', 'success')
})