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
                
                if(task) {
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