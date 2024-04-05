// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const addTask = $('#addTaskButton')
const toDoCards = $('todo-cards')


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let uniqTaskID = Math.floor(Math.random() + Date.now());
    return uniqTaskID
}

// Todo: create a function to create a task card
function createTaskCard(cardId, taskTitle, taskDueDate, taskDescription) {
   let newTask = {
    id: cardId,
    title: taskTitle.value,
    dueDate: taskDueDate.value,
    description: taskDescription.value,
   }
      taskList.push(newTask)
      localStorage.setItem('taskList', JSON.stringify(taskList));
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

    toDoCards.empty();

    taskList.forEach(function(newTaskCard) {
        let divCard = $('<div>')
        let todayFormatted = dayjs().format('MM/DD/YYYY')
        divCard.css('max-width', '75%')

        if (dayjs(todayFormatted).isSame(dayjs(newTaskCard.dueDate))) {
            divCard.addClass('card task-card text-white bg-warning mb-4')
            divCard.attr('id', newTaskCard.id)
        }
        if (dayjs(todayFormatted).isBefore(dayjs(newTaskCard.dueDate))) {
            divCard.addClass('card task-card text-white bg-danger mb-4')
            divCard.attr('id', newTaskCard.id)
        }
        if (dayjs(todayFormatted).isAfter(dayjs(newTaskCard.dueDate))) {
            divCard.addClass('card task-card text-white bg-light mb-4')
            divCard.attr('id', newTaskCard.id)
        }

        let cardTitleH3 = $('<h3>');
        cardTitleH3.addClass('card-header').text(newTaskCard.title)

        let divBody = $('<div>');
        divBody.addClass('card-body');

        let cardDescription = $('<p>');
        cardDescription.addClass('card-title').text(newTaskCard.description);

        let cardDueDate = $('<p>');
        cardDueDate.addClass('card-text').text(newTaskCard.dueDate);

        let deleteTaskButton = $('<a>');
        deleteTaskButton.text('Delete')
        deleteTaskButton.attr('href', '#');
        deleteTaskButton.attr('id', newTaskCard.id);
        deleteTaskButton.addClass('btn btn danger').css('border-color', 'white');

        if (newTaskCard.status === "to-do"){
            divCard.appendTo(toDoCards)
        }else if (newTaskCard.status === "in-progress"){
            divCard.appendTo(inProgessCards)
        } else if (newTaskCard.status === "done")
            divCard.appendTo(done)

    cardTitleH3.appendTo(divCard)
    divBody.appendTo(divCard)
    cardDescription.appendTo(divBody)
    cardDueDate.appendTo(divBody)
    deleteTaskButton.appendTo(divBody)

    })
  

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $()

    
$(function() {
        $("#datepicker" ).datepicker();
        createTask.on('click', handleAddTask)
      } );
      
$()
      
});



