# Library
Library project TOP. Adds books to an array from user input. 

Displaying book process (inside code):
    -addBookToLibrary function pushes new book to myLibrary array
    -displayBooks function receives a library array in parameter which it will loop through while creating a unique indentifier each time to be used for deleting. (books in source code)
    -Books entered by user will only use the addAndDisplay function which individually creates a card and appends it.
    -cardCreater funciton creates the card with book information.
    -Creates unique id for the read-text div to change whether or not the book has been read.
    -addBtns function adds the remove button and read status button.
    -Remove button uses the identify variables in bookIDs array to find which index to splice out when deleting a book.
    -Read button uses the id variable to change the color of read status and the text content of the read-text div to T/F.
    -bookCount is iterated each time to maintain a unique id. The card is then finally appended to the card container (cardCont) to be displayed on the screen.

