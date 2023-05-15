//const. con la dirección del api de ususarios
const USERS = 'business/private/user.php';
//const para manejar el form de inicio de sesión
const LOGIN = document.getElementById('login');

/**
 * Método para cuando el documento ha sido establecido
 * trigger cuando cargue el contenido
 */
// document.addEventListener('DOMContentLoaded', async (event) => {
//     //verificar los usuarios registrados
//     const JSON = await dataRequest(USERS, 'readUsers');
//     //verfificar si existe una session
//     if (JSON.session) {
//         //direccionar al dashboard
//         location.href = 'dashboard.html';
//     } else if (JSON.status) {
        
//     }
// })

/**
 * Método para enviar los datos del login
 * trigger 'submit'
 */
LOGIN.addEventListener('submit', async (event) => {
    //valida que no se recargue la página
    event.preventDefault();
    //const de tipo FormData con los datos solicitados en el FORM
    const DATA = new FormData(LOGIN);
    //request para iniciar sesión
    //const. tipo JSON que retorna el response del server
    const JSON = await dataRequest(USERS, 'login', DATA);
    //sí el estado de este proceso es 1 se redirecciona al dashboard
    if (JSON.status) {
        notificationRedirect('success', JSON.message, true, 'dashboard.html');
    } else {
        notificationRedirect('error', JSON.exception, true);
    }

});
