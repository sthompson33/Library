const titleField = document.getElementById('titleField');
const authorField = document.getElementById('authorField');
const pagesField = document.getElementById('pagesField');
const checkbox = document.getElementById('check');

let myLibrary = [];

function Book(title, author, pages, checked) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.checked = checked;
}

const addButton = document.getElementById('addBtn');
addButton.addEventListener('click', ()=> {
    if(!checkEmptyFields()) {
        addBookToLibrary();
    }
});

function checkEmptyFields() {
    let isEmpty = false;
    const fieldValues =[titleField, authorField, pagesField];
    fieldValues.forEach(field => {
        if(field.value == "") {
            field.style.borderColor = "rgb(130, 25, 25)";
            isEmpty = true;
        } else {
            field.style.borderColor = 'transparent';
        }
    });
    return isEmpty;
}

function addBookToLibrary() {
    const titleValue = titleField.value;
    const authorValue = authorField.value;
    const pagesValue = pagesField.value;
    const checkValue = checkbox.checked;
    myLibrary.push(new Book(titleValue, authorValue, pagesValue, checkValue));   
    eraseFields();
    updateInventory();
}

function eraseFields() {
    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    checkbox.checked = false;
}

function updateInventory() {
    /*erase current list of books displayed on screen first
    to avoid displaying all of array over again*/ 
    eraseCurrentBookList();

    const bookRow = document.getElementById('book-row');
    myLibrary.forEach(book => {
        
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        
        const pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;
        pagesCell.classList.add('text-center');

        const readCell = document.createElement('td');
        readCell.classList.add('center-button');
        const readButton = document.createElement('button');
        if(book.checked) {
            readButton.classList.add('have-read');
        } else {
            readButton.classList.add('not-read');
        }
        readCell.append(readButton);

        const removeCell = document.createElement('td');
        removeCell.classList.add('text-center');
        const removeButton = document.createElement('button');
        removeButton.classList.add('text-only', 'remove');
        removeButton.textContent = 'x';
        removeCell.append(removeButton);

        const tableRow = document.createElement('tr');
        tableRow.append(titleCell);
        tableRow.append(authorCell);
        tableRow.append(pagesCell);
        tableRow.append(readCell);
        tableRow.append(removeCell);
        
        bookRow.append(tableRow);
    })
}

function eraseCurrentBookList() {
    const bookList = document.getElementById('book-row');
    while(bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
}