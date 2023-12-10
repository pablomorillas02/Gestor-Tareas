/*
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">@example.com</span>
  </div>
</div>
 */

function editTask(taskId, titulo) {
    $('#task_text_' + taskId).html('');

    //Creación del div
    $('<div></div>')
    .attr({
      'class': 'input-group',
      'id': 'input_div_' + taskId
    })
    .appendTo('#task_text_' + taskId);

    // Creación del input
    $('<input></input>')
    .attr({
        'type': 'text',
        'name': 'new_task_text_' + taskId,
        'class': 'form-control',
        'id': 'new_task_text_' + taskId,
        'size': 30,
        'value': titulo
    })
    .appendTo('#input_div_' + taskId);

    // Creación de un div que contendrá al botón
    $('<div></div>')
    .attr({
      'class': 'input-group-append',
      'id': 'div_button_' + taskId
    })
    .appendTo('#new_task_text_' + taskId)

    // Creación del botón de confirmar
    $('<button></button>')
    .attr({
        'type': 'submit',
        'id': 'confirm_edit_' + taskId,
        'class': 'btn btn-success'
    })
    .appendTo('#input_div_' + taskId);

    // Creación del icono de confirmar
    $('<i></i>')
    .attr({
      'class': 'fa-solid fa-check',
      'style': 'color: #FCFAF9'
    }).appendTo('#confirm_edit_' + taskId);

    $('#confirm_edit_' + taskId).focus();
}

/*
$(document).on('blur','#task_text_' + taskId, function(){
    var name = $(this).val();
    $.ajax({
      type: 'post',
      url: '/edit_task',
      success: function(){
        $('#task_text_' + taskId).text(name);
      }
    });
});
*/