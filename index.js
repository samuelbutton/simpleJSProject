let todoItems = [];

function addTodo(text) {
	// new todo initialized
	const todo = {
		text, 
		checked: false,
		// not necessarily used as date of entry, but as unique ID
		id: Date.now(),
	};

	todoItems.push(todo);
	
	// to log items to the console in order to ensure that they are getting added
	// console.log(todoItems);

	const list = document.querySelector('.js-todo-list');
	// allows us to add some HTML to the DOM using an already present element 
	// as a reference point
	list.insertAdjacentHTML('beforeend', `
		<li class="todo-item" data-key="${todo.id}">
			<input id="${todo.id}" type="checkbox" />
			<label for="${todo.id}" class="tick js-tick"></label>
			<span>${todo.text}</span>
			<button class="delete-todo js-delete-todo">
				<svg><use href="#delete-icon"></use></svg>
			</button>
		</li>
	`);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
	
	// need to look up the below
	event.preventDefault();
	// in the developer's words, the browser will attempt to submit the form to a server, which
	// will cause a page refresh - we do not want that in this case

	// this is the element on the page that the user is inputting information into
	const input = document.querySelector('.js-todo-input');

	// takes the input and processes
	// trim removes whitespace from the beginning and end of the string
	const text = input.value.trim();
	if (text !== '') {
		addTodo(text);
		input.value = '';
		input.focus();
	}
// 1. Recognize input with event listener 
// 2. make sure event is valid with preventDefault
// 3. process information and return focus for user
});

// select the same element
const list = document.querySelector('.js-todo-list');
// we listen for a click, and then check to see if the click target has a js-tick
// if so, then we get the parent of the click target and see what the key is
list.addEventListener('click', event => {
	if(event.target.classList.contains('js-tick')) {
		const itemKey = event.target.parentElement.dataset.key;
		toggleDone(itemKey);
	}
	if(event.target.classList.contains('js-delete-todo')) {
		const itemKey = event.target.parentElement.dataset.key;
		deleteTodo(itemKey);
	} 
});

function toggleDone(key) {
	//find index of the item for which the id equals the key
	const index = todoItems.findIndex(item => item.id === Number(key));
	todoItems[index].checked = !todoItems[index].checked;

	const item = document.querySelector(`[data-key='${key}']`);

	if (todoItems[index].checked) {
		// we add a class to the HTML object
		item.classList.add('done');
	} else {
		// we add a class to the HTML object
		item.classList.remove('done');
	}
}

function deleteTodo(key) {
	todoItems = todoItems.filter(item => item.id !== Number(key));
 	const item = document.querySelector(`[data-key='${key}']`);
 	item.remove();
 	const list = document.querySelector('.js-todo-list');
	if (todoItems.length === 0) list.innerHTML = '';
}