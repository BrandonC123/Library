let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {}

function displayBooks(library) {
    const cardCont = document.querySelector("#card-cont");
    const cards = document.createElement("div");
    cards.classList.add("cards");
    for (let i = 0; i < library.length; i++) {
        let card = document.createElement("div");
        card = cardCreater(library[i], card);
        card.classList.add("card");
        cards.appendChild(card);
    }
    cardCont.appendChild(cards);
}

function cardCreater(book, card) {
    for(let prop in book) {
        const text = document.createElement('div');
        text.textContent = book[prop];
        text.classList.add('card-text');
        card.appendChild(text);
    }
    return card;
}

const b1 = new Book("t", "bar", "123", false);
myLibrary.push(b1);

const b2 = new Book("t", "bar", "123", false);
myLibrary.push(b2);

const b3 = new Book("t", "bar", "123", false);
myLibrary.push(b3);

displayBooks(myLibrary);
