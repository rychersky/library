const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeReadStatus = function() {
  if (this.read === true) this.read === false;
  else this.read === true;
};

function addBookToLibrary(book) {
  const found = myLibrary.some(bk => bk.title === book.title);
  if (!found) {
    myLibrary.push(book);
    displayBooks();
  } else {
    alert('This book is already in your library!')
  }
}

function addBookRow(book) {
  const row = document.getElementById('tbody').insertRow();
  row.insertCell(0).innerHTML = book.title;
  row.insertCell(1).innerHTML = book.author;
  row.insertCell(2).innerHTML = book.pages;
  row.insertCell(3).innerHTML = book.read ? 'Read' : 'Unread';
  row.insertCell(4).innerHTML = `<button class="read">Change</button>`;
  row.insertCell(5).innerHTML = `<button class="remove">Remove</button>`;

  row.querySelector('button.read').addEventListener('click', () => {
    const bookIndex = myLibrary.map(bk => bk.title).indexOf(book.title);
    myLibrary[bookIndex].changeReadStatus();
    row.children[3].innerHTML = row.children[3].innerHTML === 'Read' ? 'Unread' : 'Read';
  });

  row.querySelector('button.remove').addEventListener('click', e => {
    const bookIndex = myLibrary.map(bk => bk.title).indexOf(book.title);
    myLibrary.splice(bookIndex, 1);
    e.target.parentElement.parentElement.remove();
  });
}

function clearForm() {
  document.querySelector('#title').value = null;
  document.querySelector('#author').value = null;
  document.querySelector('#pages').value = null;
}

function displayBooks() {
  document.querySelector('tbody').innerHTML = ''
  myLibrary.forEach(book => addBookRow(book));
}

function readRadios() {
  if (document.querySelector('input[name="read"]:checked').value === 'yes') return true;
  else return false;
}

function returnToTable() {
  document.querySelector('.bookTable').classList.remove('hidden');
  document.querySelector('.form').classList.add('hidden');
}

document.querySelector('#addBook').addEventListener('click', () => {
  document.querySelector('.bookTable').classList.add('hidden');
  document.querySelector('.form').classList.remove('hidden');
});

document.querySelector('#return').addEventListener('click', () => {
  returnToTable();
  clearForm();
});

document.querySelector('#submit').addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = readRadios();
  if (title && author && pages) {
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    returnToTable();
    clearForm();
  } else {
    alert('Please fill out all fields.')
  }
});


// dummy data
const x = new Book('Lorem Ipsum', 'Bob Internet', 1000, false);
const y = new Book('Spaceballs: The Book', 'Mel Brooks', 500, true);
addBookToLibrary(x);
addBookToLibrary(y);
displayBooks();