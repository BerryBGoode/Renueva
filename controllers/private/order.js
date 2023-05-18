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
//const. para redenrizar el cargado de la tabla
const ROWS = document.getElementById('table-body');
//const. para mostrar el mensage cargado del backend, para avisar por sí no existen ningún registro
const MSG = document.getElementById('table-heade');
// const con el formulario del buscador
const FORMSEARCH = document.getElementById('form-search');
// const con el input search
const SEARCH = document.getElementById('search');


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
    document.getElementById('idorder').value ? action = 'update' : action = 'create';
    //const. para la instancia de la clase FormData con los datos del form
    const DATA = new FormData(FORM);
    //const. para guardar el resultado de la petición 
    const JSON = await dataRequest(ORDER, action, DATA);
    if (JSON.status) {

        //cargar tabla
        getData();
        //cerrar modal
        MODAL.close();
        FORM.reset();
        notificationRedirect('success', JSON.message, true);
    } else {
        MODAL.open();
        notificationRedirect('error', JSON.exception, false);
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
    //llenar el <select> de 'documents'
    loadSelect(ORDER, 'loadDocuments', 'documents');
    //llenar el <select> de 'states'
    loadSelect(ORDER, 'loadStates', 'states');
}

/**
 * async-await para carga la tabla
 * form, para verificar si la acción es buscar o cargar
 */
async function getData(
    form = null
) {
    ROWS.innerHTML = '';
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
            // el '+=' se utilizar para agregar el valor recorrido más el anterior
            ROWS.innerHTML += `<tr>            
                <td>${element.id_order}</td>
                <td>${element.document}</td>
                <td>${element.names}</td>
                <td>${element.last_names}</td>
                <td>${element.date_order}</td>
                <td class="address-col">${element.address}</td>
                <td>${element.state_order}</td>
                <td>

                    <!-- boton para ver detalle-->
                    <form action="detail_order.html" method="get">
                        <input type="number" name="orderid" id="orderid" class="hide" value="${element.id_order}">
                        <button type="submit" class="button-transparent">
                            <svg width="27" height="27" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.667 17.7917H21.8753" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.667 23.625H18.0545" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5837 8.74999H20.417C23.3337 8.74999 23.3337 7.29166 23.3337 5.83332C23.3337 2.91666 21.8753 2.91666 20.417 2.91666H14.5837C13.1253 2.91666 11.667 2.91666 11.667 5.83332C11.667 8.74999 13.1253 8.74999 14.5837 8.74999Z" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23.3333 5.86252C28.1896 6.12502 30.625 7.91877 30.625 14.5833V23.3333C30.625 29.1667 29.1667 32.0833 21.875 32.0833H13.125C5.83333 32.0833 4.375 29.1667 4.375 23.3333V14.5833C4.375 7.93335 6.81042 6.12502 11.6667 5.86252" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>                
                            </svg>
                        </button>
                    </form>
                                    
                </td>
                <td class="action-col">                                    
                
                    <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${element.id_order})"
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
                    <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${element.id_order})"
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

/**
 * async-await function para preparar formulario y datos a enviar al back
 * para podes actualizar los datos sí se desea
 */
async function onModify(id) {
    //const. con el form para enviar los datos por el método post
    const DATA = new FormData();
    //agregar el id del detalle al form
    //que es igual al param
    DATA.append('iddetail', id);
    //const. con las respuestas del api
    const JSON = await dataRequest(ORDER, 'one', DATA);
    //verificar la respuesta
    if (JSON.status) {
        //abrir el modal
        MODAL.open();
        //asignar los valores recuperados, a los inputs
        document.getElementById('address').value = JSON.dataset.address;
        document.getElementById('date').value = JSON.dataset.date_order;
        document.getElementById('idclient').value = JSON.dataset.id_client;
        document.getElementById('idorder').value = JSON.dataset.id_order;

        loadSelect(ORDER, 'loadDocuments', 'documents', JSON.dataset.id_client);
        loadSelect(ORDER, 'loadStates', 'states', JSON.dataset.id_state_order);

        document.getElementById('names').value = JSON.dataset.names;
        document.getElementById('lastnames').value = JSON.dataset.last_names;

        BUTTON.innerText = `Modify`;
        //ajustar los toolstip cuando tengan texto
        M.updateTextFields();
    } else {
        notificationRedirect('error', JSON.exception, false);
    }
}

//async-await method para eliminar los datos del detalle o de la orden seleccionada
async function onDestroy(order) {
    //const. obj. para agregarle el 'idorder' y 'iddetail'
    const DATA = new FormData();
    DATA.append('idorder', order);
    let confirm = await notificationConfirm('Do you wanna delete some?');
    if (confirm) {
        //solo se quiere eliminar la orden y sus dependientes
        //enviar el id
        DATA.append('id_order', order);
        //const. para guardar el response
        const JSON = await dataRequest(ORDER, 'deleteBoth', DATA);
        //verificar el estado de la acción
        if (JSON.status) {

            getData();
            notificationRedirect('success', JSON.message, true);
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
}

/**
 * asycn-await method para cargar datos en la tabla de manera filtrada
 * evt, attr que se puede utilizar en una función cuando se utiliza
 * 'eventListener'
 */
async function onSearch(evt) {
    // evit que se recargue la página
    evt.preventDefault();
    // instancia de la clase FormData
    const DATA = new FormData(FORMSEARCH);
    // obtener la respuesta según el proceso a realizar
    const JSON = await dataRequest(ORDER, 'all', DATA);
    if (!JSON.status) {
        notificationRedirect('error', JSON.exception, false);
    } else {
        // reiniciar los valores de la tabla
        ROWS.innerHTML = ``;
        // convertir los valores del input a minuscula para la busqueda
        let search = SEARCH.value.toLowerCase();
        // verificar que el input no este vacío para hacer la busqueda, si no cargar la tabla normal
        if (search === '') {
            getData();
        } else {
            // recorrer todos los datos recuperados y verificar con el 'indexOf'
            // si ese coincide con el del input
            for (let orders of JSON.dataset) {
                // convertir a minusculas los datos tipo string
                let product = orders.name.toLowerCase();
                let state = orders.state_order.toLowerCase();
                // verificar sí conicide un caracter con alguno de ellos
                if (product.indexOf(search) !== -1 || orders.document.indexOf(search) !== -1 ||
                    state.indexOf(search) !== -1) {
                    // cargar los datos que coicidan
                    // se usa el '+=' para añadir a ese elemento el valor recorrido más el anterior
                    ROWS.innerHTML += `<tr>            
                    <td>${orders.id_order}</td>
                    <td>${orders.document}</td>
                    <td>${orders.names}</td>
                    <td>${orders.last_names}</td>
                    <td>${orders.date_order}</td>
                    <td class="address-col">${orders.address}</td>
                    <td>${orders.state_order}</td>
                    <td class="action-col">
                        
                        <svg width="27" height="27" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.667 17.7917H21.8753" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.667 23.625H18.0545" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.5837 8.74999H20.417C23.3337 8.74999 23.3337 7.29166 23.3337 5.83332C23.3337 2.91666 21.8753 2.91666 20.417 2.91666H14.5837C13.1253 2.91666 11.667 2.91666 11.667 5.83332C11.667 8.74999 13.1253 8.74999 14.5837 8.74999Z" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23.3333 5.86252C28.1896 6.12502 30.625 7.91877 30.625 14.5833V23.3333C30.625 29.1667 29.1667 32.0833 21.875 32.0833H13.125C5.83333 32.0833 4.375 29.1667 4.375 23.3333V14.5833C4.375 7.93335 6.81042 6.12502 11.6667 5.86252" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>                
                        </svg>
                    
                    
                        <!-- boton para actualizar -->
                        <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${orders.id_order})"
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
                        <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${orders.id_order})"
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
                }
            }
        }
    }
}

/**
 * asycn-await event para cargar los datos cuando te tipeé una 'key'
 */
FORMSEARCH.addEventListener('keyup', async (evt) => onSearch(evt));

/**
 * async-await event para cargar los datos cuando se ejecute el submit
 */
FORMSEARCH.addEventListener('submit', async (evt) => onSearch(evt));