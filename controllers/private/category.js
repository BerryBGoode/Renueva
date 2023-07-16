const CATEGORY = 'business/private/category.php';
//const. con el form
const FORM = document.getElementById('form-category');
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
// formulario para el buscador
const FORMSEARCH = document.getElementById('form-search');



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
    document.getElementById('id_category').value ? action = 'update' : action = 'create';
    //filtrar los datos del form
    //instanciando la clas FormData y enviandole el form a validar
    const DATA = new FormData(FORM);
    //const. con la respuesta 
    const JSON = await dataRequest(CATEGORY, action, DATA);
    if (JSON.status) {
        //cargar tabla
        loadTable();
        //mensaje 
        notificationRedirect('success', JSON.message, true);

        MODAL.close();
        FORM.reset();
    } else {
        MODAL.open();
        notificationRedirect('error', JSON.exception, false);
    } 
})


/**
 * async-await para cargar la tabla
 */
async function loadTable() {

    ROWS.innerHTML = ``;
    //const JSON con el response
    const JSON = await dataRequest(CATEGORY, 'all');
    if (JSON.status) {
        //cargar a agregar al html los datos recuperados
        JSON.dataset.forEach(element => {
            //agregar += el valor anterior, más el recorrido
            ROWS.innerHTML += `<tr>
            <td>${element.category}</td>
            <td>${element.amount}</td>
            <td class="action-col">

                    <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${element.id_category})"
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
                    <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${element.id_category})"
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
        //cargar mensaje del request
        MSG.textContent = JSON.message;
    } else {
        notificationRedirect('error', JSON.exception, false);
    }
}

/**
 * evento que se ejecuta cada vez que la base donde trabaja JS carga
 * (DOM)
 */
document.addEventListener('DOMContentLoaded', () => {
    loadTable();
})

/**
 * async-await para cargar los datos del registro seleccionado
 */
async function onModify(idcategory) {
    //obj. de la clase FormData, para enviar los datos al API
    const DATA = new FormData;
    //agregarle el id va modificar
    //como no hay evento post se envía de está manera
    // en la instancia de la clase
    DATA.append('id_category', idcategory);
    //const la respuesta según la petición
    const JSON = await dataRequest(CATEGORY, 'one', DATA);
    if (JSON.status) {
        MODAL.open();
        //asignar los datos a los inputs
        document.getElementById('idcategory').value = JSON.dataset.id_category;
        document.getElementById('category').value = JSON.dataset.category;

        //ordenar label del input arriba
        M.updateTextFields();
        //asignar el texto del boton
        TXTBUTTON.innerText = `Modify`;
    } else {
        notificationRedirect('error', JSON.exception, false);
    }

}

/**
 * asycn-await, para eliminar el cliente seleccionado
 */
async function onDestroy(idcategory) {
    //mandar mensaje de confirmación
    let confirm = await notificationConfirm('Do you wanna delete this category, remeber all products beloging on this category also delete!!!?');
    if (confirm) {
        //instancia de la clase FormData para enviar el id
        const DATA = new FormData;
        DATA.append('id_category', idcategory);
        //respuesta según la petición
        const JSON = await dataRequest(CATEGORY, 'delete', DATA);
        if (JSON.status) {
            MODAL.close();
            loadTable();
            notificationRedirect('success', JSON.message, true);
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
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
 * async-await method para cargar los datos en la tabla según lo que vaya
 * teclando el usuario en el input
 * buscador tipo filtrado
 * evento descencadenado por cuando suben la 'key' del teclado
 */
async function onSearch(evt) {
    evt.preventDefault();
    const JSON = await dataRequest(CATEGORY, 'all');
    if (!JSON.status) {
        notificationRedirect('error', JSON.exception, false);
    } else {
        ROWS.innerHTML = ``;
        let search = document.getElementById('search').value.toLowerCase();
        if (search === '') {
            ROWS.innerHTML = ``;
            loadTable();
        } else {
            for (let categories of JSON.dataset) {
                let category = categories.category.toLowerCase();
                if (category.indexOf(search) !== -1) {
                    ROWS.innerHTML += `<tr>
                    <td>${categories.category}</td>
                    <td>${categories.amount}</td>
                    <td class="action-col">

                            <!-- boton para actualizar -->
                            <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${categories.id_category})"
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
                            <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${categories.id_category})"
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

FORMSEARCH.addEventListener('keyup', async (evt) => onSearch(evt));
FORMSEARCH.addEventListener('submit', async (evt) => onSearch(evt));