const addTaskButton = $('#addTaskButton')
const formModal = $('#formModal')
const toDoCards = $('#todo-cards') 
const inProgessCards = $('#in-progress-cards');
const doneCards = $('#doneCards');
const createTask = $('#createTask')

    // const taskTitle = $('#taskTitle').val();
    // const taskDueDate = $('#datepicker').val(); 
    // const taskDescription = $('#taskDescription').val(); 

let droppableContainer = $('.lanes')

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
 // lets us reference particular id. incrementally add 1 to each new activity,
 // if not tasks - default to 0, handle when there are no activities yet
 // return id and save current id to local storage s
function generateTaskId() {
    let uniqTaskID = Math.floor(Math.random() + Date.now());
    return uniqTaskID
}

// Todo: create a function to handle adding a new task
 // form on modal - connect to button ADD, grab all items and set status of task and push to localS

 function handleAddTask(){

    const cardId = generateTaskId(); 
    const taskTitle = $('#taskTitle').val();
    const taskDueDate = $('#datepicker').val(); 
    const taskDescription = $('#taskDescription').val(); 

    createTaskCard( cardId, taskTitle, taskDueDate, taskDescription);
    localStorage.setItem('tasks', JSON.stringify(taskList));

}

// Todo: create a function to create a task card
 // assemble pieces of the task card, new div, bootstrap, body, text, delete button
 // jquery
function createTaskCard(cardId, taskTitle, taskDueDate, taskDescription) {
    
    
   let newTask = {
    id: cardId,
    title: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription,
    status: "to-do"
   }
      taskList.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Todo: create a function to render the task list and make cards draggable
 // jquery draggable
 // for each loop 
function renderTaskList() {}

    toDoCards.empty();

    taskList.forEach(function(newTaskCard) {
        var divCard = $('<div>');
        var todayFormatted = dayjs().format('MM/DD/YYYY');
        divCard.css('max-width', '75%');

        if (dayjs(todayFormatted).isSame(dayjs(newTaskCard.dueDate))) {
            divCard.addClass('card task-card text-white bg-warning mb-4')
        }
        if (dayjs(todayFormatted).isBefore(dayjs(newTaskCard.dueDate))) {
            divCard.addClass('card task-card text-white bg-danger mb-4')
        }
        if (dayjs(todayFormatted).isAfter(dayjs(newTaskCard.dueDate))) {
            divCard.addClass('card task-card text-white bg-light mb-4')
        }
        divCard.attr('id', newTaskCard.id)

        let cardTitleH3 = $('<h3>').addClass('card-header').text(newTaskCard.title);

        let divBody = $('<div>').addClass('card-body');

        let cardDescription = $('<p>').addClass('card-title').text(newTaskCard.description);

        let cardDueDate = $('<p>').addClass('card-text').text(newTaskCard.dueDate);

        let deleteTaskButton = $('<a>').text('Delete').attr('href', '#').attr('id', newTaskCard.id).addClass('btn btn-danger').css('border-color', 'white');

        cardTitleH3.appendTo(divCard)
        divBody.appendTo(divCard)
        cardDescription.appendTo(divBody)
        cardDueDate.appendTo(divBody)
        deleteTaskButton.appendTo(divBody)

// Loop through projects and create project cards for each status

        if (newTaskCard.status === "to-do"){
            divCard.appendTo(toDoCards);
        }else if (newTaskCard.status === "in-progress"){
            divCard.appendTo(inProgessCards);
        } else if (newTaskCard.status === "done"){
            divCard.appendTo(doneCards);
        }
    
        localStorage.setItem('tasks', JSON.stringify(taskList));

    $(".task-card").draggable ({

    })
})

// Todo: create a function to handle deleting a task
 // look a particular id, re-run renderTaskList function
function handleDeleteTask(taskId){
    
    for (let i = 0; i < taskList.length; i++){
    if (taskList[i].id == taskId){
    taskList.splice(i,1);
    localStorage.setItem('taskList',JSON.stringify(taskList));
    renderTaskList();
    break;
  }
 }
}

// Todo: create a function to handle dropping a task into a new status lane
 // move from place to place
 // identify id, go through logic of changing status variable, re-run render TaskList
function handleDrop(event, ui) {
    event.preventDefault();

    let card = ui.draggable[0];
    let parentId = card.parent().attr('id');
    let cardId = card.attr('id');

    if (parentId === "todo-cards") {
        card.appendTo(inProgessCards);
        card.attr('id', 'in-progress-cards');
    }else if (parentId === "in-progress-cards"){
            card.appendTo(doneCards)
            card.attr('id', 'done-cards');
        }else if (parentId === 'done-cards'){
            card.removeClass('bg-danger bg-warning').addClass('bg-light')
            card.attr('id', 'done-cards')
        }
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
 // how system know to call and event listerners
$(document).ready(function () {

    $(addTaskButton).on('click', handleAddTask)
        // createTask.on('click', handleAddTask)


    $( '#datepicker' ).datepicker({
        // dateFormat: 'mm/dd/yyyy'
    });

    renderTaskList();

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });

    // createTask.on('click', handleAddTask)
    // addTaskButton.on('click', createTaskCard)
});