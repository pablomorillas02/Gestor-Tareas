function editTask(taskId, titulo) {
    console.log('Editando ' + titulo);

    $('#task_text_' + taskId).html('');

    // Creación del div
    $('<div></div>')
    .attr({
      'class': 'input-group',
      'id': 'input_div_' + taskId
    })
    .appendTo('#task_text_' + taskId);

    // Creación de un formulario para poder mandar las solicitudes POST
    $('<form></form>')
    .attr({
      'id': 'edit_form_' + taskId,
      'action': '/edit_task',
      'method': 'POST'
    })
    .appendTo('#input_div_' + taskId);

    // Input para guardar la id
    $('<input></input>')
    .attr({
      'type': 'hidden',
      'name': 'task_id',
      'value': taskId
    })
    .appendTo('#input_div_' + taskId);

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
        'class': 'btn btn-success',
        'onclick': 'send_edit_task("' + taskId + '")'
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