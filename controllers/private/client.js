//const. con el form
const FORM = document.getElementById('form-client');
//const con la ruta donde hacer los request
const CLIENT = 'business/private/client.php';
//const con el texto del boton según proceso
const TXTBUTTON = document.getElementById('process');
//inicialización de Modal con Materialize
M.Modal.init(document.querySelectorAll('.modal'));
//const para manipular el modal (instancia)
const MODAL = M.Modal.getInstance(document.getElementById('modal'));
//cons para tener los datos de las filas
const ROWS = document.getElementById('tb-body');
//const para obtener la primera fila antes del th
const MSG = document.getElementById('table-heade');
//obj. con las props de las opciones del alert
const OPTIONS = {
    dismissible : false
}

/**
 * Método para limpiar form
 * evento desencadenado por 'reset'
 */
FORM.addEventListener('reset', () => {
    FORM.reset();
    MODAL.close();
})

/**
 * Método para preparar visualmente cuando se va agregar
 * este método es llamado en render.js
 */
function onCreate() {
    FORM.reset();
    TXTBUTTON.innerText = `Add`;
}

/**
 * Método para enviar datos para actualizar o agregar
 * evento desencadenado por 'submit'
 */
FORM.addEventListener('submit', async (evt) => {
    //validar que no se pueda recargar la página
    evt.preventDefault();
    //verificar la acción
    document.getElementById('idclient').value ? action = 'update' : action = 'create';
    //filtrar los datos del form
    //instanciando la clas FormData y enviandole el form a validar
    const DATA = new FormData(FORM);
    //const. con la respuesta 
    const JSON = await dataRequest(CLIENT, action, DATA);
    if (JSON.status) {
        
        //cargar tabla

        //mensaje 
        notificationRedirect('success', JSON.message, true);
        MODAL.close();
    } else {
        MODAL.open();
        console.log(JSON);
        notificationRedirect('error', JSON.exception, false);
    }
})