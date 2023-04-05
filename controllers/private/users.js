//const. con la dirección del api de ususarios
const USERS = 'business/private/user.php';
//const para el formulario donde se obtienen los datos
const FORM = document.getElementById('form');
//const para el modal
const MODAL = document.getElementById('modal');
//const para el botton
const BUTTON = document.getElementById('save');


/**
 * (async await) Método para agregar datos desde el cliente
 * teniendo en cuenta el trigger es el evento 'submit'
 */
FORM.addEventListener('submit', async (event) => {
    //método void que valida que el usuario no recargue la página
    //evento nativo cuando la función es tipo async await
    event.preventDefault();
    //verificar la acción
    document.getElementById('id').value ? action = 'update' : action = 'create';
    //obj. const. para guardar los datos del form se le instancia la clase y se le envia el form
    const DATA = new FormData(FORM);
    //const para obtener el response del api
    console.log(DATA.get('username') + ' '+DATA.get('password') +' '+DATA.get('email'));
    const JSON = await dataRequest(USERS, action, DATA);
    if (JSON.status) {

        //llenar la tabla
        //cerrar el modal
        MODAL.close();
        //llamar la notificación, el tipo en caso el proceso sea exitoso y el mesaje enviado del api
        notification('success',' JSON.msg');
    } else {
        notification('error', 'JSON.execep');
        console.log('a');
    }
})
