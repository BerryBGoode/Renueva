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
//const. para redenrizar el cargado de la tabla
const ROWS = document.getElementById('table-body');
//const. para mostrar el mensage cargado del backend, para avisar por sí no existen ningún registro
const MSG = document.getElementById('table-heade');
//const. con el input con el "id_staff"
const INPUT = document.getElementById('id_staff');
//const. para agregar el texto al boton según el proceso
const TXTBUTTON = document.getElementById('process');

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
    console.log(JSON)
    if (JSON.status == 1) {

        //llenar tabla
        getData();
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

/**
 * Método que se ejecutan un evento 
 * trigger: reset
 */
FORM.addEventListener('reset', () => {
    //limpiar el form
    FORM.reset();
    //cerrar modal
    MODAL.close();
});

async function getData(form = null) {
    //verificar la acción, sí es para buscar o carga toda la tabla
    (form) ? action = 'search' : action = 'all';
    //const con los valores de la petición en formato JSON
    const JSON = await dataRequest(STAFF, action, form);
    //verificar que el estado sea 1
    if (JSON.status) {
        //recorer cada registro
        JSON.dataset.forEach(data => {
            //inyectar el código hmtl + js con los datos recolectados de la db
            ROWS.innerHTML += `<tr>
                <td class="hide">${data.id_staff}</td>
                <td class="hide">${data.id_user}</td>
                <td>${data.username}</td>
                <td>${data.names}</td>
                <td>${data.last_names}</td>
                <td>${data.document}</td>
                <td>${data.phone}</td>
                <td>${data.email}</td>
                <td class="action-col">

                    <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${data.id_staff})"
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
                    <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${data.id_user})"
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
        //cargar el mensaje resultante del request
        MSG.textContent = JSON.message;

    } else {
        //notificationRedirect('error', JSON.exception, false);
        console.log(JSON.status);
    }
}
//evento que se ejecuta cada vez que cargue el contenido del DOM
document.addEventListener('DOMContentLoaded', () => {
    //cargar la tabla
    getData();
})

//Método para preparar el modal para ingresar datos
function onCreate() {
    //limpiar los campos
    FORM.reset();
    //asignar el texto del boton
    TXTBUTTON.innerText = `Add`;
}
//async-await method para obtener los datos del 'staff' seleccionado, así también prepará el modal actualizar datos
async function onModify(id) {
    //const. tipo obj. con los datos necesarios para la consulta
    const DATA = new FormData();
    //agregar el id al obj. con los datos necesarios para la consulta
    DATA.append('id_staff', id);
    //const. en tendrá los resultados en formato JSON
    const JSON = await dataRequest(STAFF, 'one', DATA);
    if (JSON.status) {
        //abrir modal
        MODAL.open();
        //desactivar input
        document.getElementById('password').disabled = true;
        document.getElementById('lblpassword').style.cursor = 'default';
        //cargar los datos
        // console.log(JSON);
        document.getElementById('id_staff').value = id;
        document.getElementById('id_user').value = JSON.dataset.id_user;
        document.getElementById('names').value = JSON.dataset.names;
        document.getElementById('last_names').value = JSON.dataset.last_names;
        document.getElementById('document').value = JSON.dataset.document;
        document.getElementById('phone').value = JSON.dataset.phone;
        document.getElementById('username').value = JSON.dataset.username;
        document.getElementById('email').value = JSON.dataset.email;
        //ordenar label del input arriba
        M.updateTextFields();
        //asignar el texto del boton
        TXTBUTTON.innerText = `Modify`;

    } else {
        notificationRedirect('error', JSON.exception, false);
    }
}
//async-await method para eliminar los datos del 'staff' seleccionado
async function onDestroy(user) {

    //const. obj. para después asignarle el valor solicitado
    const DATA = new FormData();
    DATA.append('id_user', user);
    //confirmar la acción, especificando el usuario
    let confirm = await notificaciónConfirm('Do you wanna delete this staff');
    if (confirm) {
        //const. para obtener la respuesta a la petición de eliminar
        const JSON = await dataRequest(STAFF, 'delete', DATA);
        if (JSON.status) {
            //cerrar modal
            MODAL.close();
            //notificación
            notificationRedirect('success', JSON.message, true);
            //cargar la tabla
            getData();
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
}