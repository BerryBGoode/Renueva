// archivo para hacer las peticiones
const USER = 'business/private/user.php';
// obtener el formulario para registrar cliente
const FORM = document.getElementById('register');


FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const DATA = new FormData(FORM);
    const JSON = await dataRequest(USER, 'signup', DATA);
    console.log('to regist')
    if (JSON.status) {
        notificationRedirect('success', JSON.message, true, 'login.html');
    } else {
        notificationRedirect('error', JSON.exception, false);
    }
})