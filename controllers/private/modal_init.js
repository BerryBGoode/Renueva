//modal init

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#modal');
  var instances = M.Modal.init(elems);
});
//dropdown init
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});