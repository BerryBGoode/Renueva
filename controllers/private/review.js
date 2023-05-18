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
// formulario para del buscador
const FORMSEARCH = document.getElementById('form-search');

/**
 * función para preparar modal y formulario para agregar
 */
function onCreate() {
    FORM.reset();
    TXTBUTTON.innerHTML = `Add`;
    // cargar select's
    loadSelect(REVIEW, 'getDocument', 'documents');
    loadSelectAll(PRODUCTS, 'products', null, false);
    loadSelectAll(PRODUCTS, 'orders', null, true);

}


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
 * async-await para cargar la tabla
 */
async function loadTable() {
    // reiniciar los valores de las filas
    ROWS.innerHTML = ``;
    // obtener la respuesta del servidor 
    const JSON = await dataRequest(REVIEW, 'all');
    if (JSON.status === 1) {
        // console.log(JSON.dataset)
        // recorrer todos los registros que tiene el dataset
        JSON.dataset.forEach(element => {
            // ROWS igual a la fila recorrida + la anterior
            ROWS.innerHTML += `<tr>
                <td class="hide">${element.id_review}</td>
                <td class="hide">${element.id_detail_order}</td>
                <td class="hide">${element.id_product}</td>
                <td class="hide">${element.id_order}</td>
                <td>${element.username}</td>
                <td>${element.name}</td>
                <td class="comment-col">${element.comment}</td>
                <td>${element.date_comment}</td>
                <td class="action-col">
                
                <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${element.id_review})"
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
                    <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${element.id_review})"
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
            </tr>`;
        });
        MSG.textContent = JSON.message;
    } else if (JSON.status === -1) {
        notificationRedirect('info', JSON.exception, false);
    }
    else {
        notificationRedirect('error', JSON.exception, false);
    }
}

/**
 * evento que se realizar cada bex que el DOM de js carga 
 * (Cada vez que se carga una página)
 */
document.addEventListener('DOMContentLoaded', () => {
    loadTable();
})

/**
 * async-await para preparar el modal y formulario para actualizar datos
 */
async function onModify(id) {
    // indicar al boton el proceso de actualizar
    TXTBUTTON.innerHTML = `Modify`;
    // instancia de la clase FormData enviar datos sin un <form>
    const DATA = new FormData;
    // console.log(id)
    // adjuntar el id review
    DATA.append('idreview', id);
    // obtener la respuesta del servidor
    const JSON = await dataRequest(REVIEW, 'one', DATA);
    if (JSON.status) {
        // cargar los inputs según el registro seleccionado
        loadSelect(REVIEW, 'getDocument', 'documents', JSON.dataset.id_client, false);
        document.getElementById('names').value = JSON.dataset.names;
        document.getElementById('lastnames').value = JSON.dataset.last_names;
        document.getElementById('username').value = JSON.dataset.username;
        document.getElementById('iddetail').value = JSON.dataset.id_detail_order;
        document.getElementById('idproduct').value = JSON.dataset.id_product;
        document.getElementById('idreview').value = JSON.dataset.id_review;
        document.getElementById('idclient').value = JSON.dataset.id_client;

        document.getElementById('comment').value = JSON.dataset.comment;
        loadSelectAll(PRODUCTS, 'products', JSON.dataset.id_product, false);
        loadSelectAll(PRODUCTS, 'orders', JSON.dataset.id_order, true);
        MODAL.open();
        // adaptar labels al input con texto
        M.updateTextFields();
    } else {

        notificationRedirect('error', JSON.exception, false);
    }
}

/**
 * Método para eliminar la review seleccionada
 */
async function onDestroy(id) {
    // mensaje para que el usuario confirma la acción
    let confirm = await notificationConfirm('Do you wanna delete this review?');
    // verificar la respuesta
    if (confirm) {
        // instanciar la clase FormData
        const DATA = new FormData;
        // adjuntar el id del registro a eliminar
        DATA.append('idreview', id);
        // obtener la respuesta del servidor
        const JSON = await dataRequest(REVIEW, 'delete', DATA);
        if (JSON.status) {
            loadTable();
            notificationRedirect('success', JSON.message, true);
        } else {
            MODAL.open();
            notificationRedirect('error', JSON.exception, false);
        }
    }
}

/**
 * Método para limpiar <form>
 * evento desencadenado por 'reset'
*/
FORM.addEventListener('reset', () => {
    FORM.reset();
    MODAL.close();
})

/**
 * async-await method para cargar los datos en la tabla según lo que vaya
 * teclando el usuario en el input
 * buscador tipo filtrado
 * evento descencadenado por cuando suben la 'key' del teclado
 */
async function onSearch(evt) {
    // validar que no se recargue la página
    evt.preventDefault();
    // obtener las respuestas del api
    const JSON = await dataRequest(REVIEW, 'all');
    if (!JSON.status) {
        notificationRedirect('error', JSON.exception, false);
    } else {
        // reinciar los valores de las filas
        ROWS.innerHTML = ``;
        // convertir a lower los string por los que se puede buscar y el valor del input también
        // para agilizar la busqueda
        let search = document.getElementById('search').value.toLowerCase();
        // verificar si el input está vacio
        if (search === '') {
            // reinciar los valores de las filas
            ROWS.innerHTML = ``;
            loadTable();
        } else {
            // recorrer todos los registro encontrados en la consulta normal
            for (let reviews of JSON.dataset) {
                // convertir a minusculas los string recuperados y por los cuales se podrá buscar
                let username = reviews.username.toLowerCase();
                let product = reviews.name.toLowerCase();
                if (username.indexOf(search) !== -1 || product.indexOf(search) !== -1) {
                    // se usa el '+=' para añadir a ese elemento el valor recorrido más el anterior
                    ROWS.innerHTML += `<tr>
                    <td class="hide">${reviews.id_review}</td>
                    <td class="hide">${reviews.id_detail_order}</td>
                    <td class="hide">${reviews.id_product}</td>
                    <td class="hide">${reviews.id_order}</td>
                    <td>${reviews.username}</td>
                    <td>${reviews.name}</td>
                    <td class="comment-col">${reviews.comment}</td>
                    <td>${reviews.date_comment}</td>
                    <td class="action-col">
                    
                    <!-- boton para actualizar -->
                        <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${reviews.id_review})"
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
                        <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${reviews.id_review})"
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
                </tr>`;
                }
            }
        }
    }
}

/**
 * async-await event para filtrado en la tabla los datos según la 'key' tipeada
 */
FORMSEARCH.addEventListener('keyup', async (event) => onSearch(event));

/**
 * async-await event para filtrado del buscado cuando ejecute el evento 'submit'
 */
FORMSEARCH.addEventListener('submit', async (event) => onSearch(event));