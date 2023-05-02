// const para consultar las respuestas de la petición
const PRODUCT = 'business/public/product.php';
// const para renederizar los datos obtenidos de la promise
const CONTENT = document.getElementById('products');

// promise method para consultar y obtener las respuestas del api
const REQUEST = (action, form = null) => {
    // crear un objeto const. vacio con los valores de method y body vacíos
    const FORM = [
        method = '',
        body = ''
    ];
    // verificar sí vienen datos (para actualizar, eliminar, etc...)
    if (form) {
        FORM['method'] = 'post';
        FORM['body'] = form;
    } else {
        FORM['method'] = 'get';
    }
    // instanciar la clase Promise
    // enviandole resolve para obtener el valor de la promise (sí es exitosa)
    // reject para obtener el valor de la promise si hubo un error 
    // retornar la nueva promise
    return new Promise((resolve, reject) => {
        const PATH = new URL('http://localhost/renueva_temp/api/' + PRODUCT);
        // enviar el nombre de la acción
        PATH.searchParams.append('action', action);
        // consultar api según 'PATH' y datos de la petición
        fetch(PATH.href, FORM)
            // obtener la respuesta
            .then(response => {
                // verificar si la respuesta tiene un "ok" 
                // nativo de la clase Promise
                if (response.ok) {
                    // convertir a json y obtener los datos
                    // data es el arreglo con las respuestas
                    response.json().then(data => {
                        // obtener resultado de la data
                        resolve(data)
                    })
                } else {
                    // retraer el estado del proceso detectado por promise
                    reject(response.status)
                }

            })
            // obtener el error
            .catch(error => {
                // revolver el error
                reject(error);
            })

    })
}

// const méthod para cargar los datos en el formulario
const LOADCLIENT = () => {
    // reiniciar o iniciar los valores del contenedor
    CONTENT.innerHTML = ``;
    // llamar la promise 
    REQUEST('loadProducts')
        // obtener del obj promise la respuesta y guardarla en un objeto
        .then(data => {
            console.log(data.dataset)
            data.dataset.forEach(element => {
                // inyectar el contenido del anterior recorrido + actual
                CONTENT.innerHTML += `
                <div class="product">
                    <img src="" alt="img" srcset="">
                    <span>Product: ${element.name}</span>
                    <span>Price: $${element.price}</span>
                    <input type="number" name="productid" id="productid" class="hide" 
                    value="${element.id_product}">
                </div>
                `;
            });
        })
        .catch(error => {
            console.error(error);
            // notificationRedirect('error', data.exception, false);
        })
};

// evento que se ejecuta cada vez que carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    LOADCLIENT();

})