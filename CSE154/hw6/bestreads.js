/*
Abraham Miller
CSE154 AD
This javascript file fetches data from a php service and injects in the correct content
for the website.
*/
(function() {
	'use strict';
	
	//this function runs on the page load. It starts fetching book data and sets up
	//an event handler for the onclick of the home button.
	window.onload = function() {
		fetchBooks();
		document.querySelector('#back').onclick = fetchBooks;
	};

	//this function sets up the page to display content for the entire library
	//and calls fetchData to get the content and populate the page.
	function fetchBooks() {
		document.querySelector('#allbooks').style.display = 'block';
		document.querySelector('#singlebook').style.display = 'none';
		fetchData('mode=books', populateBooks);
	}

	//this function sets up the page to display content for a single book
	//and calls fetchData to get the content and populate the page. 
	function fetchSingleBook() {
		document.querySelector('#allbooks').style.display = 'none';
		document.querySelector('#singlebook').style.display = 'block';
		document.querySelector('#cover').setAttribute('src', 'books/' + this.id + '/cover.jpg');
		fetchData('mode=description&title=' + this.id, populateDescription);
		fetchData('mode=info&title=' + this.id, populateInfo);
		fetchData('mode=reviews&title=' + this.id, populateReviews);
	}

	//generic ajax request function that can be used to fetch specified data
	//and then calls a specified onload function.
	function fetchData(params, onload) {
		var xhr = new XMLHttpRequest();	
		xhr.open('GET', 'bestreads.php?' + params, true);
		xhr.onload = onload;
		xhr.send();
	}

	//takes the fetched description data and displays it in the appropriate spot on the page
	function populateDescription() {
		document.querySelector('#description').innerHTML = this.responseText;
	}

	//takes the fetched Review data and displays it in the appropriate spot on the page
	function populateReviews () {
		document.querySelector('#reviews').innerHTML = this.responseText;
	}

	//takes the fetched book Info data and displays it in the appropriate spot on the page
	function populateInfo () {
		var info = JSON.parse(this.responseText);
		document.querySelector('#title').innerHTML = info.title;
		document.querySelector('#author').innerHTML = info.author;
		document.querySelector('#stars').innerHTML = info.stars;
	}

	//takes the fetched data for displaying the whole book library and populates the page
	//with book buttons.
	function populateBooks() {
		var node = this.responseXML;
		var books = node.querySelectorAll('books book');
		document.querySelector('#allbooks').innerHTML = '';
		for (var i = 0; i < books.length; i++) {
			var coverEl = document.createElement('img');
			coverEl.setAttribute('src', 'books/' + 
					books[i].querySelector('folder').textContent + '/cover.jpg');
			coverEl.setAttribute('alt', books[i].querySelector('folder').textContent + 'cover');
			var titleEl = document.createElement('p');
			titleEl.innerHTML = books[i].querySelector('title').textContent;
			var divEl = document.createElement('div');
			divEl.appendChild(coverEl);
			divEl.appendChild(titleEl);
			divEl.id = books[i].querySelector('folder').textContent;
			divEl.onclick = fetchSingleBook;
			document.querySelector('#allbooks').appendChild(divEl);
		}
	}
})();

