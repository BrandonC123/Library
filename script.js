let myLibrary = [];
let bookIDs = [];
let readStatus = false;
let bookCount = 0;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = `${pages} pages`;
        this.read = read;
    }
    addBookToLibrary(book) {
        myLibrary.push(book);
    }
}

const book1 = new Book("Insert Title", "Author", "143", "T");

const book2 = new Book("Sword Art Online", "Reki Kawahara", "256", "F");

book1.addBookToLibrary(book1);
book2.addBookToLibrary(book2);

//Used for user input

const cardMod = (() => {
    function cardCreater(book, card, identify) {
        //Unique id for read-text div
        const id = "read-text" + bookCount;
        bookIDs.push(identify);
        if (book.read.toUpperCase() === "T") {
            readStatus = true;
        } else {
            readStatus = false;
        }
        for (let prop in book) {
            const text = document.createElement("div");
            text.textContent = book[prop];
            if (prop == "read") {
                text.setAttribute("id", id);
            }
            text.classList.add("card-text");
            card.appendChild(text);
        }
        card = addBtns(card, id, identify);
        card.classList.add("card");
        bookCount++;
        return card;
    }

    function addBtns(card, id, identify) {
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
            //Maintains a bookIDs array with the unique identifiers
            //to get the index to slice in myLibrary array.
            cardCont.removeChild(card);
            myLibrary.splice(bookIDs.indexOf(identify), 1);
            bookIDs.splice(bookIDs.indexOf(identify), 1);
        });
        readBtn.addEventListener("click", () => {
            const text = document.getElementById(id);
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
    return {
        cardCreater,
    };
})();

const display = (() => {
    const cardCont = document.querySelector("#card-cont");
    function displayBooks(library) {
        for (let i = 0; i < library.length; i++) {
            const identify = "book" + bookCount;
            let card = document.createElement("div");
            cardCont.appendChild(cardCreater(library[i], card, identify));
        }
    }
    
    function addAndDisplay(book) {
        //Unique identifier for each book
        const identify = "book" + bookCount;
        myLibrary.push(book);
        let card = document.createElement("div");
        card = cardMod.cardCreater(book, card, identify);
        cardCont.appendChild(card);
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
    return {
        displayBooks,
    }
})();

display.displayBooks(myLibrary);
