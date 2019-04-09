import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', e => {
	// get search term
	const searchTerm = searchInput.value;
	// get sort
	const sortBy = document.querySelector('input[name="sortby"]:checked').value;
	// get limit 5, 10, 15, 20, 25..
	const searchLimit = document.getElementById('limit').value;

	// check input - if not empty
	if(searchTerm === ''){
		// show message
		showMessage('Please add a search term', 'alert-danger');
	}

	// clear input
	searchInput.value = '';

	// search Reddit
	reddit.search(searchTerm, searchLimit, sortBy)
	.then(results => {
		// console.log(results);
		let output = '<div class ="card-columns">';
		// loop through posts
		results.forEach(post => {
			// check for image
			const image = post.preview ? post.preview.images[0].source.url : 
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK9gEBjMAx1zt9oyoDXekIf8aAw35ijdFxY9pKnO9iZbG5vfePfQ';

			output += `
			<div class="card">
			  <img src="${image}" class="card-img-top" alt="...">
			  <div class="card-body">
			    <h5 class="card-title">${post.title}</h5>
			    <p class="card-text">${truncateText(post.selftext, 100)}</p>
			    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
			    <hr>
			    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
			    <span class="badge badge-dark">Score: ${post.score}</span>
			  </div>
			</div>
			`;
		});
		output += '</div>';
		document.getElementById('results').innerHTML = output;
	});




	e.preventDefault();
});


// Show Message Func
function showMessage (message, className) {
	// crete div
	const div = document.createElement('div');
	// add classes
	div.className = `alert ${className}`;
	// add text
	div.appendChild(document.createTextNode(message));
	// get parent element
	const searchContainer = document.getElementById('search-container');
	// get search
	const search = document.getElementById('search');

	// insert message
	searchContainer.insertBefore(div, search);

	// time out alert
	setTimeout(() => document.querySelector('.alert').remove(), 3000);
}


// truncate Text
function truncateText(text, limit){
	const shortened = text.indexOf(' ', limit);
	if(shortened == -1) return text;
	return text.substring(0, shortened);
}



















