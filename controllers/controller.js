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

function notificationConfirm(msg) {
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
 * Método para enviar mensaje de confirmación con 3 opciones
 */
function notificacionOptions(msg) {
    return swal({
        title: 'Confirm',
        text: msg,
        icon: 'info',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: 0,
                visible: true,
                className: 'read accent-1'
            },
            confirm1: {
                text: 'Delete product of this order',
                value: 1,
                visible: true,
                className: 'grey darken-1'
            },
            confirm2: {
                text: 'Delete both',
                value: 2,
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

/**
 * Método para cargar los datos de un select,
 * filename referencia del archivo que evalua la acción,
 * action acción a realizar,
 * select id de la etiqueta <select> a llenar,
 * option primer valor o opción del <option> de la etiqueta <select>,
 * selected si se seleccionará uno (para cargar el valor ingresado en ese registro).
 */
async function loadSelect(filename, action, select, selected = null) {

    //const. formato JSON, para guardar los datos de la petición
    const JSON = await dataRequest(filename, action);
    // inicializar var. para después asignar datos
    let list = '';
    //verificar el estado
    if (JSON.status) {
        //si existen valores y todo ocurrio bien
        list += `<option disabled selected>Select option</option>`;
        if (select === 'orders') {
            list += `<option value="0">New Order</option>`;
        }

        if (JSON.status === -1) {
            // cargar un option con el message
            list = `<option value="-1" disabled selected>Avoid options</option>`
        } else {

            JSON.dataset.forEach(element => {
                //obtener el valor del (id)
                id = Object.values(element)[0];
                //obtener el valor del texto perteneciente al id
                value = Object.values(element)[1];


                //verificar sí se quiere carga en el <select> el id
                if (select === 'orders') {
                    //verificar si el id es igual del valor ingresado anteriormente (en caso de ser update)
                    //primer caso, si es para update : segundo para create
                    (id != selected) ? list += `<option value="${id}">${id}</option>` : list += `<option value="${id}" selected>${id}</option>`;
                } else {
                    //verificar si el id es igual del valor ingresado anteriormente (en caso de ser update)
                    //primer caso, si es para update : segundo para create
                    (id != selected) ? list += `<option value="${id}">${value}</option>` : list += `<option value="${id}" selected>${value}</option>`;
                }

            });
        }

    } else {
        //si no existen o ocurro algo erroneo
        option = `<option>void options</option>`;
    }
    //Agregar las opciones al <select>
    document.getElementById(select).innerHTML = list;
    //Inicializar el <select> para así despligue las opciones
    M.FormSelect.init(document.querySelectorAll('select'));
}

/**
 * Método para cargar select's en productos
 * filename donde ira a evaluar la acción
 * select tabla a cargar también tiene que ser el id del select
 * selected si se seleccionará uno (para cargar el valor ingresado en ese registro)
 * idselect sí se quieren cargar id's
 */
async function loadSelectAll(filename, select, selected = null, idselect = false) {
    //definir instancia de la clase FormData
    const DATA = new FormData;
    //agregar dato al post
    DATA.append('object', select);
    //obtener los datos de la petición
    const JSON = await dataRequest(filename, 'load', DATA);
    //inicializar o reiniciar lista para después asignar datos
    let list = '';
    if (JSON.status) {
        //si existen valores
        //agregar a la lista
        list += `<option disabled selected>Select option</option>`;
        //recorrer los datos obtenidos
        JSON.dataset.forEach(element => {
            //obtener el valor del id
            id = Object.values(element)[0];
            // obtener la otra columna con datos 
            value = Object.values(element)[1];

            if (idselect) {
                // verificar si el id es del valor ingresado anteriormente (update)
                (id != selected) ? list += `<option value="${id}">${id}</option>` : list += `<option value="${id}" selected>${id}</option>`;
            } else {
                (id != selected) ? list += `<option value="${id}">${value}</option>` : list += `<option value="${id}" selected>${value}</option>`;
            }

        });
    } else {
        // si no existen datos u ocurre algún error
        option = `<option> void options </option>`;
    }
    //agregar las opciones
    document.getElementById(select).innerHTML = list;
    //Inicializar el <select> para así despligue las opciones
    M.FormSelect.init(document.querySelectorAll('select'));
}

/**
 * Método para generar gráfico de barras veriticales
 * @param {*} dom elemento del DOM donde se aplicará
 * @param {*} x datos del eje X
 * @param {*} y datos del eje y
 * @param {*} msg mensaje de los datos
 * @param {*} title titulo del gráfico
 */
function graphBar(dom, x, y, msg = null, title) {
    // arreglo para guardar código de los colores para la gráfica en hex
    let colores = [];
    // generar colores hex de 6 cigras por cada elemento independiente
    x.forEach(() => {
        // agregar el código hex para cada barra vert. de la gráfica
        colores.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // establecer un elemento del DOM donde se aplicará la grafica
    const element = document.getElementById(dom).getContext('2d');

    const grap = new Chart(element, {
        type: 'bar',
        data: {
            labels: x,
            datasets: [{
                label: msg,
                data: y,
                borderColor: '#000',
                borderWidth: 1,
                backgroundColor: colores,
                barPercentage: 1,
            }]
        },
        options: {
            aspectRatio: 1,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                msg: {
                    display: false,
                }
            },
            scales: {
                y: {
                    tricks: {
                        stepSize: 1,
                        beginAtZero: true
                    }
                }
            }
        }
    });
}

/**
 * Método para generar gráfica de pastel
 * @param {*} dom elemento del DOM donde se aplicará
 * @param {*} msg mensaje de la gráfica
 * @param {*} values datos a mostrar
 * @param {*} title titulo de la gráfica
 */
function graphPie(dom, msg, values, title) {
    // colores para agregar al gráfico
    let colors = [];
    // generar los colores en base a la cantidad de registros recibidos
    values.forEach(() => {
        // generar un color hex 
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // elemento donde se mostrará la gráfica
    const element = document.getElementById(dom).getContext('2d');
    const graph = new Chart(element, {
        type: 'pie',
        data: {
            labels: msg,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    })
}


/**
 * Método para generar gráfica polar
 * @param {*} dom elemento del DOM donde se aplicará
 * @param {*} elements elementos de los que se quiere saber el dato
 * @param {*} title mensaje del grafico
 * @param {*} values valorea a agregar la gráfica
 */
function polarGraph(dom, elements, title, values) {
    // colores para agregar al gráfico
    let colors = [];
    // generar los colores en base a la cantidad de registros recibidos
    values.forEach(() => {
        // generar un color hex 
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // elemento donde se mostrará la gráfica
    const element = document.getElementById(dom).getContext('2d');
    const graph = new Chart(element, {
        type: 'polarArea',
        data: {
            labels: elements,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    })
}

/**
 * Método para generar una gráfica lineal (preferiblemente para ventas)
 * @param {*} dom elemento del DOM donde se mostrará la gráfica
 * @param {*} labels elementos a índependientes a estudiar 
 * @param {*} values valores a mostrar en la gráfica
 * @param {*} title titulo de la gráfica
 */
function lineGraph(dom, labels, values, title) {
    // obtener elemento del DOM donde se mostrará
    // labels = Utils.months({count: 7})
    const element = document.getElementById(dom).getContext('2d');
    // instancia del obj con las opciones de la gráfica
    const graph = new Chart(element, {
        type: 'line',
        data: {
            labels: labels,//['January', 'February', 'March', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'],
            datasets: [{
                label: title,
                data: values,
                fill: true,
                borderColor: '#FFFBF2',
                tension: 0.1
            }]
            // labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            // datasets: [{
            //     label: 'Datos de la gráfica',
            //     data: [10, 20, 15, 30, 25],
            //     borderColor: 'rgba(75, 192, 192, 1)',
            //     backgroundColor: 'rgba(75, 192, 192, 0.2)',
            //     borderWidth: 1,
            //     fill: true
            // }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}