// archivo para hacer peticiones
const PRODUCT = 'business/private/product.php';
const COMMENT = 'business/private/review.php'
const CART = 'business/public/cart.php';
// dirección donde se encuntran las imagenes registradas
const PATH = '../../api/images/products/';
// componente donde renderizar comentarios
const COMMENTS = document.getElementById('container-comments');
// formulario para agregar producto
const FORM = document.getElementById('form-order');
// var para contador
let count = document.getElementById('count');


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

const PRODUCTURL = getProductURL();

// evento que se ejecuta cuando carga el dom
document.addEventListener('DOMContentLoaded', async event => {
    loadComments(event);
    loadArticle(event);
})

const loadArticle = async event => {
    event.preventDefault();
    const ID = new FormData;
    // console.log(getProductURL());
    ID.append('idproduct', PRODUCTURL);
    const JSON = await dataRequest(PRODUCT, 'one', ID);
    if (JSON.status) {
        // console.log(JSON)
        // cargar datos en los componentes html

        // detalles del producto
        document.getElementById('name').innerText = JSON.dataset.name;
        document.getElementById('category').innerText = JSON.dataset.category;
        document.getElementById('description').innerText = JSON.dataset.description;
        document.getElementById('price').innerText = '$' + JSON.dataset.price;
        document.getElementById('img').innerHTML = `<img src="${PATH + JSON.dataset.image}" id="img" width="100%" height="100%" alt="${JSON.dataset.name}">`;


        // contador
        count.innerText = 1;
        count.value = 1;
        quantity();

    } else {
        M.toast({ html: 'Error to get this product!!' });
        // evento para redireccionar a la página de productos cuando haya pasado un problema
        // con el servidor, se redireccionará después de cierto tiempoß
        setTimeout(() => {
            location.href = 'products.html';
        }, 1000) //esperar 1 segundo
    }
}

// método para cargar comentarios
const loadComments = async event => {
    // evitar comportamiento por defecto
    event.preventDefault();
    // reiniciar valores del componente o límpiar componente
    COMMENTS.innerHTML = ``;
    // instancia donde guardar el producto a consultar
    const ID = new FormData;
    ID.append('idproduct', PRODUCTURL);
    const JSON = await dataRequest(COMMENT, 'comments', ID);
    // veríficar sí existen comentarios
    if (JSON.status === 1) {
        // recorrer los comentarios encontrados
        JSON.dataset.forEach(element => {
            COMMENTS.innerHTML += `<div class="card2-article">
                    <div class="info-comment">
                        <span>${element.username}</span>
                        <span>${element.comment}</span>
                        <span>${element.date_comment}</span>                        
                    </div>
                </div>
                <div class="space2"></div>
                `;
        });
    }
}

const quantity = () => {

    // obtener boton para quitar cantidad y crear evento click
    document.getElementById('rest').addEventListener('click', () => {
        // verificar sí el contandor es mayor o igual 1 
        if (count.value > 1) {
            // poder restar cantidad
            count.value = count.value - 1;
            count.innerText = count.value;
        }

    })

    // obtener boton para agregar cantidad y crear evento click
    document.getElementById('sum').addEventListener('click', () => {
        count.value = count.value + 1;
        count.innerText = count.value;
    })
}

FORM.addEventListener('submit', async event => {
    event.preventDefault();
    const DATA = new FormData;
    DATA.append('product', PRODUCTURL);
    DATA.append('quantity', count.value);
    DATA.append('view', 'article');
    // DATA.append('date', );
    // crear estado en proceso en la db
    const JSON = await dataRequest(CART, 'createOrder', DATA);
    console.log(JSON);
    if (JSON.status === 1) {
        M.toast({ html: 'Product append in cart' });
    } else if (JSON.status === -1) {
        M.toast({ html: "You're need sign in to append product" });
        setTimeout(() => {
            location.href = 'login.html'
        }, 1500);
    } else {
        let msg = JSON.exception + ' ';
        M.toast({ html: msg });
    }
})

// Publicar comentario
document.getElementById('form-comment').addEventListener('submit', async event => {
    event.preventDefault();
    const DATA = new FormData(document.getElementById('form-comment'));
    DATA.append('product', PRODUCTURL);
    const JSON = await dataRequest(COMMENT, 'publishComment', DATA);
    console.log(JSON);
    switch (JSON.status) {
        case 1:
            // producto comentado correctamente
            M.toast({ html: 'Commented product' });
            break;

        case 2:
            // no cumple algún requerimiento
            M.toast({ html: JSON.exception })
            break;
        case -1:
            // no ha iniciado sesión
            M.toast({ html: "You're need sign in to append product" });
            setTimeout(() => {
                location.href = 'login.html'
            }, 1500);
            break;
        default:
            break;
    }

});