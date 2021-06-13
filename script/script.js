'use strict';

const
    todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');
let todoData = [];
let data ='';

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
            localStorage.setItem('todoData', JSON.stringify(data));
            addTodo();
        });
        const removeBtn = newDo.querySelector('.todo-remove');
        removeBtn.addEventListener('click', () => {
            if (i > -1) {
                todoData.splice(i, 1);
            }
            localStorage.setItem('todoData', JSON.stringify(data));
            addTodo();
        });

    });
    headerInput.value = '';
};

todoControl.addEventListener('submit', e => {
    e.preventDefault();
    const newTodo = {
        value: headerInput.value.trim(),
        completed: false,
    };
    if (headerInput.value.trim() !== '') {
        todoData.push(newTodo);
    }
    addTodo();

});

const showData = () => {
    data = JSON.parse(localStorage.getItem('todoData'));
    if (data !== null) {
        todoData = data;
    }
};

todoControl.addEventListener('submit', () => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
    console.log(todoData);
    showData();
});



showData();
addTodo();