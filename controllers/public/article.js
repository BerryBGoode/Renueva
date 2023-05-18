// archivo para hacer peticiones
const PRODUCT = 'business/private/product.php';
const CART = 'business/public/cart.php';
const PATH = '../../api/images/products/';
/**
 * Método para obtener el producto que se consulta, este producto viene de la url
 */
function getProductURL() {
    // instanciar la clase URLSearchParams para buscar los parametros de la URL
    const URL = new URLSearchParams(window.location.search);
    // obtener el valor entero del parametro que se encuentra en la URL
    // parametro de esta URL es 'productid', también es el nombre del input que tiene el id del producto de la tabla
    // que se encuentra en productos para acceder aquí
    const VALUE = URL.get('productid');
    // retornar el valor entero del parametro de la URL
    return VALUE;
}

// evento que se ejecuta cuando carga el dom
document.addEventListener('DOMContentLoaded', async event => {
    event.preventDefault();
    const ID = new FormData;
    // console.log(getProductURL());
    ID.append('idproduct', getProductURL());
    const JSON = await dataRequest(PRODUCT, 'one', ID);
    if (JSON.status) {
        // console.log(JSON)
        // cargar datos en los componentes html
        document.getElementById('name').innerText = JSON.dataset.name;
        document.getElementById('category').innerText = JSON.dataset.category;
        document.getElementById('description').innerText = JSON.dataset.description;
        document.getElementById('price').innerText = '$'+ JSON.dataset.price;
        document.getElementById('img').innerHTML = `<img src="${PATH + JSON.dataset.image}" id="img" width="100%" height="100%" alt="${JSON.dataset.name}">`;
    } else {
        M.toast({ html: 'Error to get this product!!' });
        // evento para redireccionar a la página de productos cuando haya pasado un problema
        // con el servidor, se redireccionará después de cierto tiempoß
        setTimeout(() => {
            location.href = 'products.html';
        }, 1000) //esperar 1 segundo
    }
})
