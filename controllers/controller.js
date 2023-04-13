/**
 * Controller de para vista publica y privada
 */

//directorio del api
const API = 'http://localhost/renueva_temp/api/';


/****************************************/
/*****  S  W  E  E  T    A  L  E  R  T */
/**************************************/

/**
 * Método para formar un mensaje tipo confirmación y redirección.
 */
function notificationRedirect(type, msg, time, url = null) {
    //convertir el type a letra minuscula
    
    //evaluar el tipo de mensaje
    switch (type.toLowerCase()) {
        case 'success':
            title = 'Success';
            icon = type;
            break;
        case 'error':
            title = 'Error';
            icon = type;
            break;
        case 'warning':
            title = 'Warning';
            icon = type;
            break;
        case 'info':
            title = 'Info';
            icon = type;
            break;
    }
    //obj con las opciones del mensaje
    let options = {
        title: title,
        text: msg,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Accept',
            className: 'cyan'
        }
    };
    //verificar el tiempo que se desea
    //sino tiene valor se establece nulo
    (time) ? options.time = 3000 : options.time = null;
    //con el "swal" se muestra el mensaje en base a los que sale en el obj. options
    swal(options).then(() => {
        if (url) {
            //se redirecciona a la pagina indicada según proceso.
            location.href = url
        }
    });
}

/**
 * Método para enviar mensaje de confirmación
 */

function notificaciónConfirm(msg) {
    return swal({
        title: 'Confirm',
        text: msg,
        icon: 'info',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true,
                className: 'read accent-1'
            },
            confirm: {
                text: 'Yes',
                value: true,
                visible: true,
                className: 'grey darken-1'
            }
        }
    });
}

/**
 *  Método async para enviar datos de los form's al backend y recibir datos del backend
 *  es un async await porque se espera la respues del backend
 *  url path donde los datos que se quiere intercambiar, action acción a realizar (create...),
 *  form (no necesario), recolecta la info. ingresada por el usuario
 */
async function dataRequest(url, action, form = null) {
    //const para establecer el método de la petición (POST o GET)   
    //Object es una clase nativa
    const REQUEST = new Object;
    //sí el form tienen datos es un envio, sino es un request para obtener datos
    //sí el form tiene datos es porque se ingresa info. sino es porque pide info.
    if (form) {
        //method y body son attr que se definen aquí
        REQUEST.method = 'post';
        REQUEST.body = form;
    } else {
        REQUEST.method = 'get';
    }
    try {
        //objeto de tipo URL
        const PATH = new URL(API + url);
        //parametro de la acción solicitada por el usuario
        PATH.searchParams.append('action', action);
        //const para la respuesta es igual a que tiene que esperar la respuesta del servidor
        //enviandole la dirección del API y el request o petición de tipo "get" o "post"
        const RESPONSE = await fetch(PATH.href, REQUEST);
        // lo retornado convertirlo a JSON.
        return RESPONSE.json();
    } catch (error) {
        //si hay un problema la consola imprimirá el error
        console.log(error);
    }
}