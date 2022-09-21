let storage = window.localStorage;
const form = document.querySelector('#form');
const input = document.querySelector('#form-input');
const todoList = document.querySelector('#todo-list');
let todoArr = JSON.parse(storage.getItem('todo_list')) || [];

function createTodo(todo) {
    let li = document.createElement('li');
        li.classList.add('todo')
        li.innerText = todo;
        li.addEventListener('click', () => {
            li.classList.add('checked');
            
            const index = todoArr.indexOf(todo);
            todoArr.splice(index, 1);
        });

    todoList.appendChild(li);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    createTodo(input.value.trim());
    todoArr.push(input.value.trim());

    input.value = '';
})

// setup
if(todoArr.length > 0) {
    todoArr.forEach(todo => {
        createTodo(todo)
    })
}

// on tab close
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    let todoStr = JSON.stringify(todoArr);

    storage.setItem('todo_list', todoStr);
    return;
}, {capture: true});

// Service Worker
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./serviceworker.js')
            .then((reg) => console.log('success: ', reg.scope))
            .catch((err) => console.error('Error: ', err))
    })
}