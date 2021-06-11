'use strict';

const
    todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');
let data = JSON.parse(localStorage.getItem('todoData'));
console.log(data);
let todoData = [];



const addTodo = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach((item, i) => {
        const newDo = document.createElement('li');
        newDo.classList.add('todo-item');
        newDo.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            todoCompleted.append(newDo);
        } else {
            todoList.append(newDo);
        }
        const completeBtn = newDo.querySelector('.todo-complete');
        completeBtn.addEventListener('click', () => {
            item.completed = !item.completed;
            addTodo();
        });
        const removeBtn = newDo.querySelector('.todo-remove');
        removeBtn.addEventListener('click', () => {
            if(i > -1){
            todoData.splice(i, 1);
            }
            addTodo();
        });
        
    });
    headerInput.value = '';
};

todoControl.addEventListener('submit', e => {
    e.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    if (headerInput.value !== '') {
        todoData.push(newTodo);
    }
    addTodo();
    
});
    
const showData = () => {
    if (data !== null) {
        todoData = data;
    }
};
        
    
    todoControl.addEventListener('submit',  () => {
        localStorage.setItem('todoData', JSON.stringify(todoData)); 
        showData();
    });
    showData();
    console.log(data);
addTodo();


