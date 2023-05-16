
const USERS = 'business/private/user.php';
//Contante para poder implantar el formulario de inicio de sesión del cliente
const SESION_CLIENT = document.getElementById('session-client');
//Se utiliza el componente llamado Tooltip para que ejecuten las sugerencias textuales
M.Tooltip.init(document.querySelectorAll('.tooltipped'));

//Método que controlará los eventos al momento de enviar los datos del formulario de inicio de sesión del cliente
SESION_CLIENT.addEventListener('submit', async (event) => {
    //evento para que no se recargue la página al momento de enviar el formulario
    event.preventDefault();
    //Constante tipo objeto que tendrá los datos que se han ingresado en el formulario 
    const FORM = new FormData(SESION_CLIENT);
    //Se verifica si el cliente está registrado 
    const JSON = await dataRequest(USERS, 'LoginClient', FORM);
    //Se comprueba si todo es completamente correcto para posteriormente direccionar al usuario a la siguiente página, en caso contrario, mandará un mensaje de error.
    if (JSON.status) {
        notificationRedirect('success', JSON.message, true, 'home.html')
    } else{
        notificationRedirect('error', JSON.exception, false)
    }
});