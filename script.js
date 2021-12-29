let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const cardCont = document.querySelector("#card-cont");
const cards = document.createElement("div");

function addBookToLibrary(book) {
    myLibrary.push(book);
    let card = document.createElement("div");
    // card = cardCreater(book, card);
    cardCont.appendChild(cardCreater(book, card));
}

function displayBooks(library) {
    if (myLibrary.length >= 1) {
        cards.classList.add("cards");
        for (let i = 0; i < library.length; i++) {
            let card = document.createElement("div");
            card = cardCreater(library[i], card);
            cards.appendChild(card);
        }
        cardCont.appendChild(cards);
    }
}

function cardCreater(book, card) {
    for (let prop in book) {
        const text = document.createElement("div");
        text.textContent = book[prop];
        text.classList.add("card-text");
        card.appendChild(text);
    }
    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    removeBtn.textContent = "X";
    readBtn.textContent = "Read Status"
    card.appendChild(removeBtn);
    card.appendChild(readBtn);
    card.classList.add("card");
    return card;
}

const form = document.querySelector("#form");

function openForm() {
    document.getElementById("form").style.display = "block";
}

function closeForm() {
    (form.elements[0]).value = '';
    document.getElementById("form").style.display = "none";
}

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", () => {
    openForm();
});

const cancelBtn = document.querySelector("#cancel");
cancelBtn.addEventListener("click", () => {
    closeForm();
});

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", () => {
    const newBook = new Book((form.elements[0]).value, (form.elements[1]).value, 
    (form.elements[2]).value, (form.elements[3]).value);
    addBookToLibrary(newBook);
    closeForm();
});

displayBooks(myLibrary);
