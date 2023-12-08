function viewTask(task) {
    var newTask = $('<li></li>')
        .addClass('list-group-item d-flex justify-content-between align-items-center')
        .attr('id', task.id);

    var taskText = $('<span></span>')
        .addClass(task.completada ? 'completed_task' : 'uncompleted_task')
        .attr('id', 'task_text_' + task.id)
        .text(task.titulo);

    var buttons = $('<div></div>').addClass('btn-group');

    var completeForm = $('<form></form>')
        .attr('action', '/complete_task')
        .attr('method', 'POST');
    var completeInput = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'task_id')
        .val(task.id);
    var completeButton = $('<button></button>')
        .addClass('btn btn-success')
        .attr('id', 'check_button')
        .attr('type', 'submit')
        .html('<i class="fa-solid fa-check" style="color: #FCFAF9;"></i>')
        .click(function (event) {
            completeTask(event, task.id);
        });
    completeForm.append(completeInput, completeButton);

    var editForm = $('<form></form>')
        .attr('action', '/edit_task')
        .attr('method', 'POST');
    var editInput = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'task_id')
        .val(task.id);
    var editButton = $('<button></button>')
        .addClass('btn btn-primary')
        .attr('id', 'edit_button')
        .attr('type', 'button')
        .html('<i class="fa-regular fa-pen-to-square" style="color: #FCFAF9;"></i>');
    editForm.append(editInput, editButton);

    var deleteForm = $('<form></form>')
        .attr('action', '/delete_task')
        .attr('method', 'POST');
    var deleteInput = $('<input>')
        .attr('type', 'hidden')
        .attr('name', 'task_id')
        .val(task.id);
    var deleteButton = $('<button></button>')
        .addClass('btn btn-danger')
        .attr('id', 'delete_button')
        .attr('type', 'submit')
        .html('<i class="fa-solid fa-x" style="color: #FCFAF9;"></i>')
        .click(function (event) {
            deleteTask(event, task.id);
        });
    deleteForm.append(deleteInput, deleteButton);

    buttons.append(completeForm, editForm, deleteForm);

    newTask.append(taskText, buttons);

    $('.list-group').append(newTask);
}

function addTask(event) {
    event.preventDefault();

    var taskText = document.getElementById('taskText').value;

    var formData = new FormData();
    formData.append('data', taskText);

    fetch('/add', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Éxito (creación)');

                var newTask = data.task;
                viewTask(newTask);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function completeTask(event, taskId) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('task_id', taskId);

    fetch('/complete_task', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Éxito (actualización de estado)');

                var task = document.getElementById('task_text_' + taskId);

                if (task) {
                    console.log("Elemento encontrado:", task);

                    if (task.classList.contains('uncompleted_task')) {
                        task.classList.remove('uncompleted_task');
                        task.classList.add('completed_task');
                    } else {
                        task.classList.remove('completed_task');
                        task.classList.add('uncompleted_task');
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteTask(event, taskId) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('task_id', taskId);

    fetch('/delete_task', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Éxito (borrado)');

                var task = document.getElementById('task_text_' + taskId);

                if (task) {
                    console.log("Elemento encontrado:", task);

                    var task_card = document.getElementById(taskId);
                    task_card.remove();
                    task.remove();
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}