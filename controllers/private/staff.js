//const. con la dirección del api de "staff"
const STAFF = 'business/private/staff.php';
//const con el id del form
const FORM = document.getElementById('form-staff');
// inicialización de modal
M.Modal.init(document.querySelectorAll('.modal'));
//const para el modal
const MODAL = M.Modal.getInstance(document.getElementById('modal'));
//obj. cons. con las prop de las opciones es del alert
const OPTIONS = {
    dismissible: false
}

/**
 * async-awat método tipo event para enviar los datos del form al api
 * trigger: submit 
 */
FORM.addEventListener('submit', async (event) => {
    //var. para el action
    let action;
    //prevenir que el usuario recargue la página en el proceso
    event.preventDefault();
    //verificar para que 'action' si hay un id es 'update' sino 'create'
    document.getElementById('id_staff').value || document.getElementById('id_user').value ? action = 'update' : action = 'create';
    //obtener los datos del formulario y guardarlos en una const.
    const DATA = new FormData(FORM);
    //hacer la patición y guardarla en una const.
    const JSON = await dataRequest(STAFF, action, DATA);
    //verificar el estado de ese proceso
    if (JSON.status == 1) {

        //llenar tabla

        //cerrar el modal
        MODAL.close();
        //notificación
        notificationRedirect('success', JSON.message, true);
    } else if (JSON.status == 2) {
        notificationRedirect('error', JSON.message + ". Error:" + JSON.exception, true);
    } else {
        notificationRedirect('error', JSON.exception, true);
    }
})