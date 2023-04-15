//const. donde se evalua la acción a realizar
const ORDER = 'business/private/order.php';
// inicialización de modal
M.Modal.init(document.querySelectorAll('.modal'));
//const para el modal
const MODAL = M.Modal.getInstance(document.getElementById('modal'));
//const. para el form.
const FORM = document.getElementById('form-order');
//const. para modificar el texto del boton
const BUTTON = document.getElementById('process')
//const. para crear evento al seleccionar un elemento del <select>
const SELECT = document.querySelector('#documents');
//const. para el formulario de clients (donde selecciona el doc. del 'client')
const CLIENT = document.getElementById('client');

//Método para preparar el modal para agregar
function onCreate() {
    //abrir el modal
    MODAL.open();
    //limpiar campos
    FORM.reset();
    BUTTON.innerText = `Add`;
    /*  llenar select's*/
    //llenar el <select> de 'No.Orders'
    loadSelect(ORDER, 'loadOrders', 'orders', 'Select order', 'id');
    //llenar el <select> de 'documents'
    loadSelect(ORDER, 'loadDocuments', 'documents', 'Select document');
    //llenar el <select> de 'states'
    loadSelect(ORDER, 'loadStates', 'states', 'Select state of this order');
    //llenar el <select> de 'products'
    loadSelect(ORDER, 'loadProducts', 'products', 'Select product');
}

/**
 * Método para cargar los datos del cliente según el documento seleccionado
 * mediante el evento 'change' del <form con método "post"> 
 * el <form> solo lo compone el select
 * esto para recuperar el id del cliente con ese documento
 */
CLIENT.addEventListener('change', async () => {
    //obtener los datos que tiene el <form> (el valor del <select>)
    const DATA = new FormData(CLIENT);
    //verificar si el <select> no tiene el valor por defecto
    if (SELECT.value) {
        
        //const. para guardar las respuesta del API
        const JSON = await dataRequest(ORDER, 'loadClient', DATA);
        if (JSON.status) {
            //mostrar en los inputs los datos del cliente
            document.getElementById('idclient').value = JSON.client.id_client;
            document.getElementById('names').value = JSON.client.names;
            document.getElementById('lastnames').value = JSON.client.last_names;
            document.getElementById('address').value = JSON.client.address;
            //acomodar el label
            M.updateTextFields();
        } else {
            notificationRedirect('error', JSON.exception, false);
        }

    }
})