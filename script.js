
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchBooks(query);
    }
});

function searchBooks(query) {
    // Replace `API_KEY` with your actual API key
    const apiKey = 'AIzaSyCHsdUp_XoTRb6Eu9LjSWOCop-LoFi1-tg';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);  // Log the book items for debugging
            displayBooks(data.items);
        })
        .catch(error => console.error('Error fetching books:', error));
}

function displayBooks(books) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear previous results

    if (!books || books.length === 0) {
        mainContent.innerHTML = '<p>No results found.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        // Handle missing imageLinks or Thumbnail properties
        const coverImage = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail 
            ? book.volumeInfo.imageLinks.thumbnail 
            : 'https://via.placeholder.com/128x194?text=No+Cover+Available';

        // Use a placeholder image if no cover is available
        bookCard.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <p><strong>Author:</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p><strong>Genre:</strong> ${book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown'}</p>
            <p><strong>Content Version:</strong> ${book.volumeInfo.contentVersion ? book.volumeInfo.contentVersion : 'Unknown'}</p>
            <p><strong>Publisher:</strong> ${book.volumeInfo.publisher ? book.volumeInfo.publisher : 'Unknown'}</p>
            <p><strong>Description:</strong> ${book.volumeInfo.description ? book.volumeInfo.description : 'No description available.'}</p>
            <img id="img-cover" src="${coverImage}" alt="${book.volumeInfo.title} cover">
        `;

        mainContent.appendChild(bookCard);
    });
}
