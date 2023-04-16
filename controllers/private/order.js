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
//obj. cons. con las prop de las opciones es del alert
const OPTIONS = {
    dismissible: false
}
//const. para redenrizar el cargado de la tabla
const ROWS = document.getElementById('table-body');
//const. para mostrar el mensage cargado del backend, para avisar por sí no existen ningún registro
const MSG = document.getElementById('table-heade');

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
});

/**
 * async-awat método tipo event para enviar los datos del form al api
 * trigger: submit 
 */
FORM.addEventListener('submit', async (event) => {
    //evitar que el usuario recargue la página
    event.preventDefault();
    //verificar la acción
    document.getElementById('iddetail').value ? action = 'update' : action = 'create';
    //const. para la instancia de la clase FormData con los datos del form
    const DATA = new FormData(FORM);
    //const. para guardar el resultado de la petición 
    const JSON = await dataRequest(ORDER, action, DATA);
    if (JSON.status) {

        //cargar tabla
        getData();
        //cerrar modal
        MODAL.close();
        notificationRedirect('success', JSON.message, true);
    } else {
        console.log(JSON)
        notificationRedirect('error', JSON.exception + " " + JSON.session, false);
    }
});

/**
 * evento para limpiar todo campos cuando pase en evento reset
*/
FORM.addEventListener('reset', () => {
    //limipiar el form
    FORM.reset();
    //cerrar modal
    MODAL.close();
});

//Método para preparar el modal para agregar
function onCreate() {
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
 * async-await para carga la tabla
 * form, para verificar si la acción es buscar o cargar
 */
async function getData(
    form = null
) {
    //verificar si es para cargar todo o buscar
    (form) ? action = 'search' : action = 'all';
    //const. para guardar el response
    const JSON = await dataRequest(ORDER, action, form);
    //verificar el estado de la acción
    if (JSON.status) {
        //recorrer cada registro
        //+= se utiliza para ir almacenando el valor, y como aquí se recorre un ciclo
        //se guarda o algo así el valor del anterior
        JSON.dataset.forEach(element => {
            ROWS.innerHTML += `<tr>
                <td class="hide">${element.id_detail_order}</td>
                <td class="hide">${element.id_product}</td>
                <td class="hide">${element.id_client}</td>
                <td>${element.id_order}</td>
                <td>${element.address}</td>
                <td>${element.document}</td>
                <td>${element.name}</td>
                <td>${element.cuantitive}</td>
                <td>${element.date_order}</td>
                <td>${element.total}</td>
                <td>${element.state_order}</td>
                <td class="action-col">

                    <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${element.id_detail_order})"
                    xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.0215 1.91666H12.0468C4.60998 1.91666 1.63525 4.83332 1.63525 12.125V20.875C1.63525 28.1667 4.60998 31.0833 12.0468 31.0833H20.971C28.4078 31.0833 31.3825 28.1667 31.3825 20.875V17.9583"
                            stroke="#424242" stroke-width="3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M22.5177 3.40417L10.7973 14.8958C10.3511 15.3333 9.90489 16.1937 9.81565 16.8208L9.17609 21.2104C8.93811 22.8 10.0834 23.9083 11.7046 23.6896L16.1816 23.0625C16.8063 22.975 17.6838 22.5375 18.1449 22.1L29.8653 10.6083C31.8881 8.625 32.84 6.32084 29.8653 3.40417C26.8906 0.487502 24.5405 1.42084 22.5177 3.40417Z"
                            stroke="#424242" stroke-width="3" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M20.8372 5.05191C21.8337 8.53733 24.6151 11.2644 28.1847 12.2561"
                            stroke="#424242" stroke-width="3" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <!-- boton para eliminar -->
                    <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${element.id_detail_order})"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M28.4432 7.7208C23.4903 7.23955 18.5076 6.99164 13.5398 6.99164C10.5948 6.99164 7.64985 7.13747 4.70487 7.42914L1.67065 7.7208"
                            stroke="#424242" stroke-width="3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M9.85107 6.24791L10.1783 4.33749C10.4163 2.95207 10.5948 1.91666 13.1084 1.91666H17.0053C19.5189 1.91666 19.7123 3.01041 19.9354 4.35207L20.2626 6.24791"
                            stroke="#424242" stroke-width="3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M25.2452 12.3292L24.2784 27.0146C24.1148 29.3041 23.981 31.0833 19.8312 31.0833H10.2824C6.13267 31.0833 5.9988 29.3041 5.83519 27.0146L4.86841 12.3292"
                            stroke="#424242" stroke-width="3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12.573 23.0625H17.5259" stroke="#424242" stroke-width="3"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.3386 17.2292H18.7754" stroke="#424242" stroke-width="3"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </td>
            </tr>`
        });
        //cargar el mensaje del request
        MSG.textContent = JSON.message;
    } else {
        notificationRedirect('error', JSON.exception, false);
    }
}

/**
 * evento que se ejecuta cada que carga el DOM de js
 */
document.addEventListener('DOMContentLoaded', () => {
    //cargar la tabla
    getData();
})