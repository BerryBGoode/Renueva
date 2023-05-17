// const para consultar las respuestas de la petición
const PRODUCT = 'business/public/product.php';
const CART = 'business/public/cart.php';
// const para renederizar los datos obtenidos de la promise
const CONTENT = document.getElementById('products');
// const para acceder desde este directorio a las imagenes de api
const PATH = '../../api/images/products/';
// obj para guardar id de los productos  
const PRODUCTS = [];
// inicializar toast


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


            // reiniciar los valores 
            PRODUCTS.splice(0, PRODUCTS.length);
            // definiar un var. para identificar la vez que se ha recorrido el objeto JSON
            let index = 0;
            data.dataset.forEach(element => {
                PRODUCTS.push(element.id_product);

                // inyectar el contenido del anterior recorrido + actual                        
                CONTENT.innerHTML += `    
                
                <div class="product"> 
                    <div class="image">
                        <img src="${PATH + element.image}" alt="img" class="product-image">                        
                    </div>

                    <div class="detail_product">
                        <span>${element.name}</span>
                        <span>${element.category}</span>
                        <span>$${element.price}</span>                        
                    <div>             
                    
                    <div class="buttons-form-product">
                            <!-- ver producto -->
                        <form action="article.html" method="get" id="article">
                            <input type="number" name="productid" id="productid" class="hide" value="${PRODUCTS[index]}">                    
                            <button type="submit" class="btn product-btn">
                            <svg class="view-icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.2293 12.5001C16.2293 14.5626 14.5626 16.2293 12.5001 16.2293C10.4376 16.2293 8.771 14.5626 8.771 12.5001C8.771 10.4376 10.4376 8.771 12.5001 8.771C14.5626 8.771 16.2293 10.4376 16.2293 12.5001Z" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.5001 21.1146C16.1772 21.1146 19.6043 18.9479 21.9897 15.1979C22.9272 13.7292 22.9272 11.2604 21.9897 9.79167C19.6043 6.04167 16.1772 3.875 12.5001 3.875C8.823 3.875 5.39591 6.04167 3.0105 9.79167C2.073 11.2604 2.073 13.7292 3.0105 15.1979C5.39591 18.9479 8.823 21.1146 12.5001 21.1146Z" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        
                            </button>                                                
                        </form>
                            <!-- agregar producto a orden -->
                        <form method="post" id="product">
                            <input type="number" name="idproduct" id="idproduct" class="hide" value="${PRODUCTS[index]}">
                            <button type="submit" class="btn product-btn add-cart" value="${PRODUCTS[index]}">
                                Buy
                            </button>
                        </form>
                    </div>
                </div>                
                `;

                index++;
            });
            // obtener los botones para 'comprar'
            const BUY = document.getElementsByClassName('add-cart');
            // recorrer los botones encontrados
            for (let i = 0; i < BUY.length; i++) {
                // crear evento click
                BUY[i].addEventListener('click', async event => {
                    event.preventDefault();
                    const DATA = new FormData;
                    DATA.append('product', BUY[i].value);
                    DATA.append('quantitive', 1);
                    // crear estado en proceso en la db
                    const JSON = await dataRequest(CART, 'createOrder', DATA);
                    if (JSON.status) {
                        M.toast({ html: 'Product append in cart' });
                    }else{
                        M.toast({ html: JSON.excep});
                    }


                })
            }
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