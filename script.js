class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = `${pages} pages`;
        this.read = read;
    }
    addBookToLibrary(book) {
        display.myLibrary.push(book);
    }
}

const cardHandler = (() => {
    let bookIDs = [];
    let bookCount = 0;
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
            display.cardCont.removeChild(card);
            display.myLibrary.splice(bookIDs.indexOf(identify), 1);
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
        bookCount,
    };
})();

const display = (() => {
    const cardCont = document.querySelector("#card-cont");
    let myLibrary = [];
    function displayBooks(library) {
        for (let i = 0; i < library.length; i++) {
            const identify = "book" + cardHandler.bookCount;
            let card = document.createElement("div");
            cardCont.appendChild(
                cardHandler.cardCreater(library[i], card, identify)
            );
        }
    }

    //Used for user input
    function addAndDisplay(book) {
        //Unique identifier for each book
        const identify = "book" + cardHandler.bookCount;
        myLibrary.push(book);
        let card = document.createElement("div");
        card = cardHandler.cardCreater(book, card, identify);
        cardCont.appendChild(card);
    }

    const form = document.querySelector("#form");

    function openForm() {
        document.getElementById("form").style.display = "block";
    }

    function closeForm() {
        const errorSpans = document.querySelectorAll(".error");
        errorSpans.forEach((error) => {
            error.textContent = ""
            error.classList.remove("active-error");
        });
        form.reset();
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
        const bookInputs = document.querySelectorAll(".new-book-input");
        let validForm = true;
        bookInputs.forEach((input) => {
            if (!input.validity.valid) {
                formValidation.showError(input, ".error-" + input.name);
                validForm = false;
            }
        });
        if (validForm) {
            const newBook = new Book(
                form.elements[0].value,
                form.elements[1].value,
                form.elements[2].value,
                form.elements[3].value
            );
            addAndDisplay(newBook);
            closeForm();
        }
    });
    return {
        displayBooks,
        myLibrary,
        cardCont,
    };
})();

const formValidation = (() => {
    const bookInputs = document.querySelectorAll(".new-book-input");

    bookInputs.forEach((input) => {
        input.addEventListener("input", function (event) {
            if (input.validity.valid) {
                document.querySelector(".error-" + input.name).textContent = "";
                document
                    .querySelector(".error-" + input.name)
                    .classList.remove("active-error");
            } else {
                showError(input, ".error-" + input.name);
            }
        });
    });
    function showError(testInput, errorSpan) {
        if (testInput.validity.valueMissing) {
            document.querySelector(errorSpan).textContent =
                "This field cannot be empty.";
        }
        document.querySelector(errorSpan).classList.add("active-error");
    }
    return {
        showError,
    };
})();

const book1 = new Book("Insert Title", "Author", "143", "T");

const book2 = new Book("Sword Art Online", "Reki Kawahara", "256", "F");

book1.addBookToLibrary(book1);
book2.addBookToLibrary(book2);

display.displayBooks(display.myLibrary);
