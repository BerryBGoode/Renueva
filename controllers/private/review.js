// dirección para consultar datos de las reviews
const REVIEW = '/business/private/review.php';
// consultar datos para cargar todo
const PRODUCTS = '/business/private/product.php';
// formulario para obtener los datos del client
const CLIENT = document.getElementById('form-client');
// formulario para obtener la review
const FORM = document.getElementById('form-review');
// const con el boton para indicar el proceso
const TXTBUTTON = document.getElementById('process');
// msg. para indicar no. de registros
const MSG = document.getElementById('msg');
// const para adjutar registros recuperados
const ROWS = document.getElementById('tbody');
// const con el <select> de documentos
const DOCUMENTS = document.getElementById('documents');
// inicialización de modal
M.Modal.init(document.querySelectorAll('.modal'));
//const para el modal
const MODAL = M.Modal.getInstance(document.getElementById('modal'));

/**
 * evento para cargar los datos del cliente según el doc. seleccionado
 * desencadenador 'change' del <form> para obtener cliente
 */
CLIENT.addEventListener('change', async () => {
    // Validar que el dato seleccionado no sea por defecto
    if (DOCUMENTS.value) {
        // obtener el documento
        const DATA = new FormData(CLIENT);
        // obtener los resultado del api según datos consultados
        const JSON = await dataRequest(REVIEW, 'getClient', DATA);
        // verificar el estado del proceso
        if (JSON.status) {
            // cagar los datos del cliente en los inputs
            document.getElementById('names').value = JSON.client.names;
            document.getElementById('lastnames').value = JSON.client.last_names;
            document.getElementById('username').value = JSON.client.username;
            // adatar labels
            M.updateTextFields();
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
})

/**
 * evento para obtener los datos del <form> y actualizarlos o agregarlos
 * desencadenador 'submit' del <form> principal
 */
FORM.addEventListener('submit', async (evt) => {
    // validar que el usuario no recargue la página
    evt.preventDefault();
    // verificar sí el <input> del 'idreview' está con datos
    document.getElementById('idreview').value ? action = 'update' : action = 'create';
    // enviar los datos del <form>
    const DATA = new FormData(FORM);
    // obtener la respuesta del servidor
    const JSON = await dataRequest(REVIEW, action, DATA)
    if (JSON.status) {
        // cargar table
        loadTable();
        MODAL.close();
        FORM.reset();
        notificationRedirect('success', JSON.message, true);
    } else {
        notificationRedirect('error', JSON.exception, false);
        MODAL.open();
    }
});

/**
 * función para preparar modal y formulario para agregar
 */
function onCreate() {
    FORM.reset();
    TXTBUTTON.innerHTML = `Add`;
    // cargar select's
    loadSelect(REVIEW, 'getDocument', 'documents');
    loadSelectAll(PRODUCTS, 'products', null, false);
    loadSelectAll(PRODUCTS, 'orders', null, true);

}
