// dirección para consultar la acciones
const COMMENT = '/business/private/review.php';
// obtener los valores de la url para obtener los comentario del producto a buscar
const PRODUCT = window.location.search;
// para insertar las filas de los datos recuperados
const ROWS = document.getElementById('table-body');
// para insertar la cantidad de registros encontrados
const MSG = document.getElementById('table-heade');

/**
 * Método para obtener el producto que se consulta, este producto viene de la url
 */
function getProductURL(){
    // instanciar la clase URLSearchParams para buscar los parametros de la URL
    const URL = new URLSearchParams(PRODUCT);
    // obtener el valor entero del parametro que se encuentra en la URL
    // parametro de esta URL es 'productid', también es el nombre del input que tiene el id del producto de la tabla
    // que se encuentra en productos para acceder aquí
    const VALUE = URL.get('productid');
    // retornar el valor entero del parametro de la URL
    return VALUE;
}

document.addEventListener('DOMContentLoaded', () => {
    loadTable();
})

/**
 * async-await method para obtener los datos a cargar
 */
async function loadTable(){
    // reiniciar los datos de las filas recuperadas
    ROWS.innerHTML = ``;
    // instancia de la clase FormData
    const DATA = new FormData;
    // adjuntar el id del producto a consultar los comentarios
    DATA.append('idproduct', getProductURL());
    // obtener los datos del api según el proceso
    const JSON = await dataRequest(COMMENT, 'comments', DATA);

    if (JSON.status) {
        
        JSON.dataset.forEach(element => {
            // el '+=' se utilizar para agregar el valor recorrido más el anterior
            ROWS.innerHTML +=`<tr>
                <td>${element.username}</td>
                <td>${element.product}</td>
                <td>${element.comment}</td>
                <td>${element.date_comment}</td>
                <td>

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
    }else{
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
        const JSON = await dataRequest(COMMENT, 'delete', DATA);
        if (JSON.status) {
            loadTable();
            notificationRedirect('success', JSON.message, true);
        } else {
            MODAL.open();
            notificationRedirect('error', JSON.exception, false);
        }
    }
}
