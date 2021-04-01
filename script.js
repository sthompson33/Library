const titleField = document.getElementById('titleField');
const authorField = document.getElementById('authorField');
const pagesField = document.getElementById('pagesField');

const addButton = document.getElementById('addBtn');
addButton.addEventListener('click', ()=> {
    checkForEmptyFields();
});

function checkForEmptyFields() {
    const fieldValues =[titleField, authorField, pagesField];
    fieldValues.forEach(field => {
        if(field.value == "") {
            field.style.borderColor = "rgb(130, 25, 25)";
        } 
    })
}