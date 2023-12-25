// Esta función construye la vista del listado de tareas
function viewTask(task, firstTask) {
  var newTask = $("<li></li>")
    .addClass(
      "list-group-item d-flex justify-content-between align-items-center"
    )
    .attr("id", task.id);

  var taskText = $("<span></span>")
    .addClass(task.completada ? "completed_task" : "uncompleted_task")
    .attr("id", "task_text_" + task.id)
    .text(task.titulo);

  var buttons = $("<div></div>").addClass("btn-group");

  var completeForm = $("<form></form>")
    .attr("action", "/complete_task")
    .attr("method", "POST");
  var completeInput = $("<input>")
    .attr("type", "hidden")
    .attr("name", "task_id")
    .val(task.id);
  var completeButton = $("<button></button>")
    .addClass("btn btn-success")
    .attr("id", "check_button")
    .attr("type", "submit")
    .html('<i class="fa-solid fa-check" style="color: #FCFAF9;"></i>')
    .click(function (event) {
      completeTask(event, task.id);
    });
  completeForm.append(completeInput, completeButton);

  var editForm = $("<form></form>");
  var editInput = $("<input>")
    .attr("type", "hidden")
    .attr("name", "task_id")
    .val(task.id);
  var editButton = $("<button></button>")
    .addClass("btn btn-primary")
    .attr("id", "edit_button")
    .attr("type", "button")
    .html('<i class="fa-regular fa-pen-to-square" style="color: #FCFAF9;"></i>')
    .click(function (event) {
      editTask(task.id, task.titulo);
    });
  editForm.append(editInput, editButton);

  var deleteForm = $("<form></form>")
    .attr("action", "/delete_task")
    .attr("method", "POST");
  var deleteInput = $("<input>")
    .attr("type", "hidden")
    .attr("name", "task_id")
    .val(task.id);
  var deleteButton = $("<button></button>")
    .addClass("btn btn-danger")
    .attr("id", "delete_button")
    .attr("type", "submit")
    .html('<i class="fa-solid fa-x" style="color: #FCFAF9;"></i>')
    .click(function (event) {
      deleteTask(event, task.id);
    });
  deleteForm.append(deleteInput, deleteButton);

  buttons.append(completeForm, editForm, deleteForm);

  newTask.append(taskText, buttons);

  // Aquí se comprueba si es la primera tarea, si lo es se crea un listado nuevo
  if (firstTask || $(".list-group").length === 0) {
    var tasksList = $("<ul></ul>").addClass("list-group");
    tasksList.append(newTask);

    $(".container-fluid").hide("fade", 200, function () {
      $("body").append(tasksList);
    });
  } else {
    $(".list-group").append(newTask);
  }
}

// Esta función sirve para añadir una tarea
function addTask(event) {
  event.preventDefault();

  var taskText = document.getElementById("taskText").value;

  var formData = new FormData();
  formData.append("data", taskText);

  var popover = bootstrap.Popover.getInstance(
    document.getElementById("addButton")
  );

  fetch("/add", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        popover.hide();
        var newTask = data.task;
        var firstTask = data.firstTask;
        viewTask(newTask, firstTask); // Se construye la vista
      } else {
        if (popover) {
          popover.show();
          setTimeout(() => popover.hide(), 2000);
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Esta función sirve para marcar o desmarcar una tarea
function completeTask(event, taskId) {
  event.preventDefault();

  var formData = new FormData();
  formData.append("task_id", taskId);

  fetch("/complete_task", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        var task = document.getElementById("task_text_" + taskId);

        if (task) {
          // Aquí se comprueba si se marca o se desmarca y se actualiza la vista
          if (task.classList.contains("uncompleted_task")) {
            task.classList.remove("uncompleted_task");
            task.classList.add("completed_task");
          } else {
            task.classList.remove("completed_task");
            task.classList.add("uncompleted_task");
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Esta función sirve para borrar una tarea
function deleteTask(event, taskId) {
  event.preventDefault();

  var formData = new FormData();
  formData.append("task_id", taskId);

  fetch("/delete_task", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        var task = document.getElementById("task_text_" + taskId);

        if (task) {
          // Aquí se comprueba si la tarea borrada es la última
          if (data.lastTask == false) {
            var task_card = document.getElementById(taskId);

            task_card.remove();
            task.remove();
          } else {
            // Si es la última, se aplican una serie de animaciones
            var task_card = $("#" + taskId);
            task_card.hide("fade", 100, function () {
              $(this).remove();

              var task = $("#task_text_" + taskId);
              task.remove();

              $(".list-group").remove();

              $(".container-fluid").removeAttr("hidden");
              $(".container-fluid").show("fade", 200);
            });
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Esta función sirve para editar una tarea
function send_edit_task(taskId) {
  var input_id = "#new_task_text_" + taskId;
  var input_element = $(input_id);
  var input_data = input_element.val();

  var formData = new FormData();
  formData.append("task_id", taskId);
  formData.append("new_task_text", input_data);

  fetch("/edit_task", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        var new_task_text = "#task_text_" + taskId;
        $(new_task_text).html(input_data);
        $(new_task_text).attr("data-current-text", input_data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
