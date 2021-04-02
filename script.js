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
        updateInventory();
    }
});

function checkEmptyFields() {
    let isEmpty = false;
    const fieldValues =[titleField, authorField, pagesField];
    fieldValues.forEach(field => {
        if(field.value == "") {
            field.style.borderColor = "rgb(130, 25, 25)";
            isEmpty = true;
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
}

function updateInventory() {
    console.log('do i run');
    const inventory = document.getElementById('inventory');
    myLibrary.forEach(book => {
        
        const titleDiv = document.createElement('div');
        titleDiv.textContent = book.title;
        
        const authorDiv = document.createElement('div');
        authorDiv.textContent = book.author;
        
        const pagesDiv = document.createElement('div');
        pagesDiv.textContent = book.pages;
        pagesDiv.classList.add('center');

        const readDiv = document.createElement('div');
        readDiv.classList.add('read-wrap');
        const readButton = document.createElement('button');
        if(book.checked) {
            readButton.classList.add('have-read');
        } else {
            readButton.classList.add('not-read');
        }
        readDiv.append(readButton);

        const removeDiv = document.createElement('div');
        removeDiv.classList.add('center');
        const removeButton = document.createElement('button');
        removeButton.classList.add('text-only', 'remove');
        removeButton.textContent = 'x';
        removeDiv.append(removeButton);

        inventory.append(titleDiv);
        inventory.append(authorDiv);
        inventory.append(pagesDiv);
        inventory.append(readDiv);
        inventory.append(removeDiv);

    })
}