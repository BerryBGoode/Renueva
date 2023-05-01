//ruta para consultar la acción
const PRODUCT = 'business/private/product.php';
//const con el form
const FORM = document.getElementById('form-products');
//const para especificar la acción a realizar
const TXTBUTTON = document.getElementById('process');
//inicialización del modal con materialize
M.Modal.init(document.querySelectorAll('.modal'));
const MODAL = M.Modal.getInstance(document.getElementById('modal'));
//const para ir agregando el contenido recuperado en la tabla
const ROWS = document.getElementById('tbody');
//const para especificar cantidad de datos recuperados
const MSG = document.getElementById('thead-msg');
// const con el form del search
const FORMSEARCH = document.getElementById('form-search');
// const con el input search
const SEARCH = document.getElementById('search');

/**
 * Método que se ejecuta cuando se va a agregar
 * invocado en render.js
 */
function onCreate() {
    //validar que no cargue un id product
    document.getElementById('idproduct').value = null;
    FORM.reset();
    TXTBUTTON.innerText = 'Add';
    // llenar select's
    loadSelectAll(PRODUCT, 'states_products');
    loadSelectAll(PRODUCT, 'categories')
}

/**
 * Método tipo evento que se ejecuta en el boton cancelar del modal
 * desencadenador (reset)
 */
FORM.addEventListener('reset', () => {
    FORM.reset();
    MODAL.close();
})

/**
 * async-await método tipo evento que se ejecuta para guardar o actualizar datos
 * desncadenador (submit)
 */
FORM.addEventListener('submit', async (evt) => {
    //evitar que el usuario recargue la página
    evt.preventDefault();
    //validar la acción
    console.log(document.getElementById('idproduct').value);
    document.getElementById('idproduct').value ? action = 'udpate' : action = 'create';
    //obtener los datos del form
    const DATA = new FormData(FORM);
    //const. en formato JSON para obtener las respuestas del servidor
    const JSON = await dataRequest(PRODUCT, action, DATA);
    if (JSON.status) {


        loadTable();
        notificationRedirect('success', JSON.message, true);
        MODAL.close();
        FORM.reset();
    } else {
        MODAL.open();
        console.log(JSON);
        notificationRedirect('error', JSON.exception, false);
    }
})

/**
 * async-awat método para cargar la tabla
 * form: posibles datos que se pueden enviar como paramétros de la consulta
 */
async function loadTable() {
    // obtener las respuestas del servidor
    const JSON = await dataRequest(PRODUCT, 'loadTable');
    // inicializar los valores de la filas o reiniciarlos
    ROWS.innerHTML = ``;
    if (JSON.status) {
        JSON.dataset.forEach(element => {
            // el '+=' se utilizar para agregar el valor recorrido más el anterior
            ROWS.innerHTML += `<tr>
                <td class="hide">${element.id_product}</td>
                <td class="hide">${element.id_category}</td>
                <td class="hide">${element.id_state_product}</td>
                <td>${element.name}</td>
                <td>${element.state_product}</td>
                <td>${element.category}</td>
                <td>${element.price}</td>
                <td>${element.stock}</td>
                <td>
                    <form action="comments.html" method="get">
                    <!-- reviews button -->
                    <input type="number" name="productid" id="productid" class="hide" value="${element.id_product}">
                    <label class="hide" for="productid">ID product</label>
                    <button type="submit" class="button-transparent">
                        <svg width="28" height="28" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="viewComments(${element.id_product})">
                            <path d="M26.8719 27.5042H25.7373C24.543 27.5042 23.4084 27.9563 22.5724 28.7729L20.0195 31.2375C18.8551 32.3604 16.9591 32.3604 15.7946 31.2375L13.2418 28.7729C12.4058 27.9563 11.2562 27.5042 10.0769 27.5042H8.95719C6.47899 27.5042 4.47852 25.5646 4.47852 23.1729V7.26248C4.47852 4.87081 6.47899 2.93127 8.95719 2.93127H26.8719C29.3501 2.93127 31.3506 4.87081 31.3506 7.26248V23.1729C31.3506 25.55 29.3501 27.5042 26.8719 27.5042Z" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.9144 14.5834C19.8356 14.5834 21.393 13.0621 21.393 11.1854C21.393 9.30883 19.8356 7.7876 17.9144 7.7876C15.9934 7.7876 14.436 9.30883 14.436 11.1854C14.436 13.0621 15.9934 14.5834 17.9144 14.5834Z" stroke="#424242" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23.886 22.8377C23.886 20.2127 21.2137 18.0835 17.9144 18.0835C14.6151 18.0835 11.9429 20.2127 11.9429 22.8377" stroke="#424242" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    </form>
                </td>
                <td class="action-col">

                <!-- boton para actualizar -->
                <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${element.id_product})"
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
                <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${element.id_product})"
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
        // cargar mensaje del request
        MSG.textContent = JSON.message;
    } else {
        notificationRedirect('error', JSON.exception, false);
        console.log(JSON);
    }
}

/**
 * evento que se ejecuta cada vez que se carga una página (se carga el DOM de js)
 */
document.addEventListener('DOMContentLoaded', () => {
    loadTable();
});

/**
 * async-awat método para cargar inputs según los datos seleccionados
 */
async function onModify(id) {
    // instancia de la clase FormDate
    const DATA = new FormData;
    // agregar el id, se llama en el backend con el método POST
    DATA.append('idproduct', id);
    // obtener la respuesta en formato JSON
    const JSON = await dataRequest(PRODUCT, 'one', DATA);
    if (JSON.status) {
        // abrir el modal
        MODAL.open();
        // asignar los datos a los inputs
        document.getElementById('idproduct').value = JSON.dataset.id_product;
        document.getElementById('idcategory').value = JSON.dataset.id_category;
        document.getElementById('product').value = JSON.dataset.name;
        document.getElementById('description').value = JSON.dataset.description;
        document.getElementById('price').value = JSON.dataset.price;
        document.getElementById('stock').value = JSON.dataset.stock;
        // asignar a los select's
        loadSelectAll(PRODUCT, 'categories', JSON.dataset.id_category);
        loadSelectAll(PRODUCT, 'states_products', JSON.dataset.id_state_product);
        // asignar al file
        document.getElementById('image').required = false;
        M.updateTextFields();
        TXTBUTTON.innerHTML = `Modify`;

    } else {
        notificationRedirect('error', JSON.exception, false);
        console.log(JSON);
    }
}

/**
 * async-await método para eliminar el producto seleccionado
 */
async function onDestroy(id) {
    // enviar mensaje de confirmación
    // el await funciona para esperar la respuesta del usuario
    let confirm = await notificationConfirm('Do you wanna delete this product?');
    if (confirm) {
        // instancia de la clase FormData
        const DATA = new FormData;
        // adjuntar el id del product a eliminar
        DATA.append('idproduct', id);
        // esperar la respuesta y guardarla en const. llamada JSON
        const JSON = await dataRequest(PRODUCT, 'delete', DATA);

        // verificar el estado de la petición
        if (JSON.status) {
            loadTable();
            notificationRedirect('success', JSON.message, true);
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
}

/**
 * asycn-await method para carha rlos datos en la tabla según el input search
 */
async function onSearch(evt) {
    // evitar la recarga de la página
    evt.preventDefault();
    // esperar la respuesta del api
    const JSON = await dataRequest(PRODUCT, 'loadTable');
    // verificar la respuesta
    if (JSON.status) {
        // reiniciar el valor de las filas
        ROWS.innerHTML = ``;
        // convertir a minusculas el texto del input
        let search = SEARCH.value.toLowerCase();
        if (search === '') {
            loadTable();
        } else {
            for (let products of JSON.dataset) {
                // convertir a minuscula los datos string con los que se puede buscar
                let name = products.name;
                let state = products.state_product;
                let category = products.category;
                // verificar sí valor del input coincide con algún caracter de ellos
                if (name.indexOf(search) !== -1 || state.indexOf(search) !== -1 || category.indexOf(search) !== -1) {
                    // el '+=' se utilizar para agregar el valor recorrido más el anterior
                    ROWS.innerHTML += `<tr>
                    <td class="hide">${products.id_product}</td>
                    <td class="hide">${products.id_category}</td>
                    <td class="hide">${products.id_state_product}</td>
                    <td>${products.name}</td>
                    <td>${products.state_product}</td>
                    <td>${products.category}</td>
                    <td>${products.price}</td>
                    <td>${products.stock}</td>
                    <td>
                        <form action="comments.html" method="get">
                        <!-- reviews button -->
                        <input type="number" name="productid" id="productid" class="hide" value="${products.id_product}">
                        <label class="hide" for="productid">ID product</label>
                        <button type="submit" class="button-transparent">
                            <svg width="28" height="28" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="viewComments(${products.id_product})">
                                <path d="M26.8719 27.5042H25.7373C24.543 27.5042 23.4084 27.9563 22.5724 28.7729L20.0195 31.2375C18.8551 32.3604 16.9591 32.3604 15.7946 31.2375L13.2418 28.7729C12.4058 27.9563 11.2562 27.5042 10.0769 27.5042H8.95719C6.47899 27.5042 4.47852 25.5646 4.47852 23.1729V7.26248C4.47852 4.87081 6.47899 2.93127 8.95719 2.93127H26.8719C29.3501 2.93127 31.3506 4.87081 31.3506 7.26248V23.1729C31.3506 25.55 29.3501 27.5042 26.8719 27.5042Z" stroke="#424242" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.9144 14.5834C19.8356 14.5834 21.393 13.0621 21.393 11.1854C21.393 9.30883 19.8356 7.7876 17.9144 7.7876C15.9934 7.7876 14.436 9.30883 14.436 11.1854C14.436 13.0621 15.9934 14.5834 17.9144 14.5834Z" stroke="#424242" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23.886 22.8377C23.886 20.2127 21.2137 18.0835 17.9144 18.0835C14.6151 18.0835 11.9429 20.2127 11.9429 22.8377" stroke="#424242" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        </form>
                    </td>
                    <td class="action-col">

                    <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${products.id_product})"
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
                    <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${products.id_product})"
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

    } else {
        notificationRedirect('error', JSON.exception, false);
    }
}

/**
 * async-await event para filtrado en la tabla los datos según la 'key' tipeada
 */
FORMSEARCH.addEventListener('keyup', async (evt) => onSearch(evt));

/**
 * async-await event para filtrado del buscado cuando ejecute el evento 'submit'
 */
FORMSEARCH.addEventListener('submit', async (event) => onSearch(event))