let storage = window.localStorage;
const form = document.querySelector('#form');
const input = document.querySelector('#form-input');
const todoList = document.querySelector('#todo-list');
let todoArr = JSON.parse(storage.getItem('todo_list')) || [];

// todo check button
function completeTodo(todoID) {
    let button = document.querySelector(`#${todoID.replaceAll(' ', '-')}`);
    button.classList.add('checked');
    button.parentNode.classList.add('checked-todo');
    
    setTimeout(() => {
        button.parentNode.remove();
        const index = todoArr.indexOf(todoID.replaceAll(' ', '-'));
        todoArr.splice(index, 1);
    }, 2000);
}
// create todo func.
function addTodo (todo) {
    let checkButton = document.createElement('button');
    checkButton.classList.add('todo-check');
    checkButton.id = todo.replaceAll(' ', '-');
    checkButton.setAttribute('onClick', `completeTodo('${todo}')`);
    
    let li = document.createElement('li');
    li.classList.add('todo');
    li.innerText = todo;
    li.prepend(checkButton);
    
    todoList.appendChild(li);
}

// setup
if(todoArr.length > 0) {
    for(let i = 0; i < todoArr.length; i++) {
        addTodo(todoArr[i]);
    }
}

// form submit listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trimmedInput = input.value.trim();
    addTodo(trimmedInput);
    todoArr.push(trimmedInput);
    input.value = '';
});

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