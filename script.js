const titleField = document.getElementById('titleField');
const authorField = document.getElementById('authorField');
const pagesField = document.getElementById('pagesField');
const checkbox = document.getElementById('check');

let myLibrary = [new Book("dune", "frank herbert", 412, false)];

function Book(title, author, pages, checked) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.checked = checked;
}



/*Functions for Add New section */

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
    const titleValue = titleField.value.toLowerCase();
    const authorValue = authorField.value.toLowerCase();
    const pagesValue = Number(pagesField.value);
    const checkValue = checkbox.checked;
    myLibrary.push(new Book(titleValue, authorValue, pagesValue, checkValue));   
    displayLibraryList(myLibrary);
    updateCatalog();
    eraseFields();
}

function eraseFields() {
    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    checkbox.checked = false;
}



/*Functions for Catalog section */

function updateCatalog() {
    updateReadCount();
    
    /*Find the number of times each author was listed in the myLibrary 
      Display the author(s) with the most counts as favorite */
    const authorCount = myLibrary.reduce((obj, book) => {
        if(!obj[book.author]) {
            obj[book.author] = 0;
        }
        obj[book.author]++;
        return obj;
    }, {});

    let maxCount = Math.max(...Object.values(authorCount));
    let mostFrequent = Object.keys(authorCount).filter(k => authorCount[k] === maxCount);
    
    const favorites = document.getElementById('favorite');
    while(favorites.firstChild) {
        favorites.removeChild(favorites.firstChild);
    }

    mostFrequent.forEach(fav => {
        const div = document.createElement('div');
        div.append(fav);
        favorites.append(div);
    })
}

function updateReadCount() {
    const totalBooks = document.getElementById('totalBooks');
    const totalRead = document.getElementById('totalRead');
    const percentageRead = document.getElementById('percentageRead');
    
    const totalCount = myLibrary.length;
    totalBooks.textContent = totalCount;
    
    const readCount = myLibrary.reduce((total, book) => {
        return total + (book.checked == true);
    }, 0);
    totalRead.textContent = readCount;
    percentageRead.textContent = `${Math.round((readCount / totalCount) * 100)}%`;
}



/*Functions for right side pane */

function displayLibraryList(libraryList) {
    /*erase current list of books displayed on screen first
    to avoid displaying all of array over again*/ 
    eraseCurrentBookList();

    const bookRow = document.getElementById('book-row');
    libraryList.forEach(book => {
        
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



/*Functions for sorting options */

const titleButton = document.getElementById('titleBtn');
const authorButton = document.getElementById('authorBtn');
const pagesButton = document.getElementById('pagesBtn');
const buttonList = [titleButton, authorButton, pagesButton];

buttonList.forEach((button) => {
    button.addEventListener('click', (e) => {
        sortChange(e.target.id);
    })
})

function sortChange(buttonClicked) {
    const button = buttonClicked.slice(0, -3);
    const arrowUp = document.getElementById(`${button}-up`);
    const arrowDown = document.getElementById(`${button}-down`);
    
    if (arrowUp.style.display == "none" && arrowDown.style.display == "none") {
        clearArrows();
        arrowUp.style.display = "initial";
        sortAscending(button);
    } else if (arrowUp.style.display == "initial") {
        clearArrows();
        arrowDown.style.display = "initial";
        sortDescending(button);
    } else {
        clearArrows();
        displayLibraryList(myLibrary);
    }
}

//more efficient having array created at compile time instead of everytime 
//the function is called?
const polylineArray = Array.from(document.getElementsByTagName('polyline'));
function clearArrows() {
    polylineArray.forEach(svg => {
        svg.style.display = "none";
    })
}

function sortAscending(key) {
    let sortedUpList = myLibrary.slice();
    sortedUpList.sort((first, second) => {
       return first[key] > second[key] ? 1 : -1;
    });
    displayLibraryList(sortedUpList);
}

function sortDescending(key) {
    let sortedDownList = myLibrary.slice();
    sortedDownList.sort((first, second) => {
       return first[key] > second[key] ? -1 : 1;
    });
    displayLibraryList(sortedDownList);
}


