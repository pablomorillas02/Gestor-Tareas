// Este listener ve si hacemos click en el botón de ayuda para mostrar un mensaje
document.addEventListener('DOMContentLoaded', function () {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});