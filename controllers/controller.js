/**
 * Controller de para vista publica y privada
 */

//directorio del api
const API = 'http://localhost/renueva_temp/api/';


/****************************************/
/*****  S  W  E  E  T    A  L  E  R  T */
/**************************************/



/**
 * Método para formar un mensaje tipo confirmación.
 */
function notification(title, msg) {
    //tipo de icono error, warning, info, success

    return Swal.fire({
        position: 'top-end',
        icon: title.charAt(0).toLowerCase() + title.slice(1),
        title: title,
        text: msg,
        showConfirmButton: false,
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
        console.log(PATH.href + REQUEST);
        const RESPONSE = await fetch(PATH.href, REQUEST);
        // lo retornado convertirlo a JSON.
        console.log(RESPONSE.json())
        return RESPONSE.json();
    } catch (error) {
        //si hay un problema la consola imprimirá el error
        console.log(error);
    }
}