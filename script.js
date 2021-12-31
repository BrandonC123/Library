let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

add(new Book("t", "t", "1", "F"));

add(new Book("1", "t", "1", "F"));

add(new Book("2", "t", "1", "F"));

add(new Book("3", "t", "1", "F"));

const cardCont = document.querySelector("#card-cont");


function add (book) {
    myLibrary.push(book);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    let card = document.createElement("div");
    cardCont.appendChild(cardCreater(book, card));
}

function displayBooks(library) {
    if (myLibrary.length >= 1) {
        for (let i = 0; i < library.length; i++) {
            let card = document.createElement("div");
            cardCont.appendChild(cardCreater(library[i], card));
        }
    }
}

function cardCreater(book, card) {
    for (let prop in book) {
        const text = document.createElement("div");
        text.textContent = book[prop];
        text.classList.add("card-text");
        card.appendChild(text);
    }
    card.setAttribute("data-attribute", myLibrary.length - 1);
    console.log(card.dataset.attribute);
    card = addBtns(card);
    card.classList.add("card");
    return card;
}

function addBtns(card) {
    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.setAttribute("id", "remove-btn");
    readBtn.textContent = "Read Status";
    readBtn.setAttribute("id", "read-btn");
    removeBtn.addEventListener("click", () => {
        cardCont.removeChild(card);
        myLibrary = myLibrary.splice(card.dataset.attribute, 1);
    });
    readBtn.addEventListener("click", () => {
        readBtn.classList.add("readT");
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
    addBookToLibrary(newBook);
    closeForm();
});

displayBooks(myLibrary);
