let myLibrary = [];
let cardLib = [];
let readStatus = false;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const book1 = new Book("t", "t", "1", "F");

const book2 = new Book("1", "t", "1", "F");

const book3 = new Book("2", "t", "1", "F");

const book4 = new Book("3", "t", "1", "F");

const cardCont = document.querySelector("#card-cont");

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addAndDisplay(book) {
    myLibrary.push(book);
    let card = document.createElement("div");
    card = cardCreater(book, card);
    cardCont.appendChild(card);
    cardLib.push(card);
}

function displayBooks(library) {
    for (let i = 0; i < library.length; i++) {
        let card = document.createElement("div");
        cardCont.appendChild(cardCreater(library[i], card));
    }
}

function cardCreater(book, card) {
    if (book.read.toUpperCase() === "T") {
        readStatus = true;
    } else {
        readStatus = false;
    }
    for (let prop in book) {
        const text = document.createElement("div");
        text.textContent = book[prop];
        if (prop == "read") {
            text.classList.add("read-text");
        }
        text.classList.add("card-text");
        card.appendChild(text);
    }
    card.setAttribute("data-attribute", myLibrary.length - 1);
    console.log(card.dataset.attribute);
    card = addBtns(card, book);
    card.classList.add("card");
    return card;
}

function addBtns(card, book) {
    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.setAttribute("id", "remove-btn");
    readBtn.textContent = "Read Status";
    readBtn.setAttribute("id", "read-btn");
    if (readStatus) {
        readBtn.classList.add("readT");
    } else {
        readBtn.classList.add("readF");
    }
    removeBtn.addEventListener("click", () => {
        cardCont.removeChild(card);
        myLibrary.splice(card.dataset.attribute, 1);
    });
    readBtn.addEventListener("click", () => {
        const text =
        document.getElementsByClassName("read-text")[
            card.dataset.attribute
        ];
        if (readBtn.classList.contains("readT")) {
            readBtn.classList.remove("readT");
            readBtn.classList.add("readF");
            text.textContent = "F";
        } else {
            readBtn.classList.remove("readF");
            readBtn.classList.add("readT");
            text.textContent = "T";
        }
    });
    card.appendChild(readBtn);
    card.appendChild(removeBtn);
    return card;
}

const form = document.querySelector("#form");

function openForm() {
    document.getElementById("form").style.display = "block";
}

function closeForm() {
    form.elements[0].value = "";
    form.elements[1].value = "";
    form.elements[2].value = "";
    form.elements[3].value = "";
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
    const newBook = new Book(
        form.elements[0].value,
        form.elements[1].value,
        form.elements[2].value,
        form.elements[3].value
    );
    addAndDisplay(newBook);
    closeForm();
});

displayBooks(myLibrary);
