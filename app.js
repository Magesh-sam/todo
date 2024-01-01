const todoInput = document.querySelector('.taskname');
const addBtn = document.querySelector('.addbtn');
const error = document.querySelector('.error')
const todoList = document.querySelector('.todolist')
const emptyTodo = document.querySelector('.empty-todo')
const deleteBtns = document.querySelectorAll('.deletebtn');

let taskName = "";
let todos = [];
window.onload = () => {
    renderTodo();
    toggleEmptyTodo();

};

const renderTodo = () =>{
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log("todos",todos)
    if(todos.length>0){
        for(const todo of todos){
            createTodoElemenet(todo)
        }

    }
}
const toggleEmptyTodo = () => {
    if (todos.length === 0) {
        emptyTodo.style.display = "flex";
    } else {
        emptyTodo.style.display = "none";
    }
};


todoInput.addEventListener('change', (e) => {
    taskName = e.target.value;
    error.classList.remove('error-visible')
    error.classList.add('error-hidden')


})
todoInput.addEventListener('focus', () => {
    error.classList.remove('error-visible')
    error.classList.add('error-hidden')


})

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (taskName.length === 0) {
        error.classList.add('error-visible')
        error.classList.remove('error-hidden')
    }
    else {
        addTodo(taskName)
    }
})



const addTodo = (taskName) => {
    const newTask = {
        taskName,
        isCompleted: false,
        id: crypto.randomUUID()
    }
    todos.push(newTask);
    todoInput.value = ""
    createTodoElemenet(newTask)
    localStorage.setItem("todos", JSON.stringify(todos))
    toggleEmptyTodo();


}

const createTodoElemenet = (newTask) => {
    console.log("creating element with id",newTask.id)
    const todoElement = document.createElement('div');
    todoElement.classList.add("todo");

    todoElement.id = newTask.id;
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.id=newTask.id;
todoCheckbox.checked = newTask.isCompleted
    todoCheckbox.classList.add("todocheckbox")
    todoCheckbox.checked = newTask.isCompleted;
    const textElement = document.createElement('p')
    textElement.textContent = newTask.taskName;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "❌"
    deleteBtn.classList.add("deletebtn")
    deleteBtn.id=newTask.id;
    todoElement.append(todoCheckbox, textElement, deleteBtn)
    todoList.append(todoElement)
}


const deleteTodo = (id) =>{
    const consent = confirm("Are you sure want to remove this?")
    if(!consent){
        return
    }
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const todoElement = document.getElementById(id)
    if(todoElement){
        todoElement.remove()
    }
    if(todoIndex !== 1){

        todos.splice(todoIndex,1)
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    toggleEmptyTodo();



}


const toggleTodoStatus = (id) => {
    const todo = todos.find(todo => todo.id === id);
    const todoElement = document.getElementById(id)
    
    if(todo){
        
        todo.isCompleted  = !todo?.isCompleted
    }
    if(todoElement){
        todoElement.style.background = todo.isCompleted ? "#bbb8b840" : ""
    }
   

    
    localStorage.setItem("todos", JSON.stringify(todos));
    
}


todoList.addEventListener('click',(e)=>{
   if(e.target.classList.contains('deletebtn')){
       const id = e.target.id;
      deleteTodo(id);
      
   }
   if(e.target.classList.contains('todocheckbox')){
    const id = e.target.id;
    toggleTodoStatus(id)
   }
})


