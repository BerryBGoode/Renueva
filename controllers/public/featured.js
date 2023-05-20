// constante para consultar las respuestas de la petición
const FEATURED = 'business/public/product.php';
// constante para renederizar los datos obtenidos de la promise
const CONTENT = document.getElementById('featured');
// constante para acceder desde este directorio a las imagenes de api
const PATH = '../../api/images/products/';
// objeto para guardar id de los productos  
const PRODUCTS = [];

//promise method que consulta y se obtiene las respuestas del api
const REQUEST  = (action, form = null) => {
    //Se crea un objeto vacío con los valores method y body, estos dos vacíos
    const FORM = [
        method = '',
        body = ''
    ];
    //se verifica si provienen datos
    if(form) {
        FORM['method'] = 'post';
        FORM['body'] = form;
     } else{
        FORM['method'] = 'get';
     }

     //se retorna la nueva promise
     return new Promise((resolve, reject) =>{
        const PATH = new URL('http://localhost/renueva_temp/api/' + FEATURED);
        //Se envía el nombre de la acción
        PATH.searchParams.append('action',action);
        //se consulta api según PATH y datos solicitados
        fetch(PATH.href, FORM)
            //se obtienen respuestas
            .then(response => {
                //verificar si la respuesta contiene un "ok"}
                if (response.ok) {
                    //se convieren a json y se  obtienen los datos
                    response.json().then(data =>{
                        //se obtiene resultados de la data
                        resolve(data)
                    })
                }else{
                    // retraer el estado del proceso detectado por promise
                    reject(response.status)
                }
            })
            //se obtiene el error
            .catch(error => {
                reject(error);
            })
     })
}

//constante method que carga los datos en el formulario
const LOADFEATURED = () => {
    //se reinicia o  inician los valores dedl contenedor
    CONTENT.innerHTML = '';
    //se manda a llamar ala promise
    REQUEST('loadProductsFeatured')
        //se obtiene del obj promise, la respuesta y se guarda en un objeto.
        .then(data => {
            //se reuinician los valores
            PRODUCTS.splice(0, PRODUCTS.length);
            //se define  un  var para identificar cuando se ha recorriddo el objto JSON
            let index = 0;
            data.dataset.forEach(element=>{
                PRODUCTS.push(element.id_product);
                //seinyecta  el contenido del anterior recorrido + el actual
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
                            <button type="submit" class="btn product-btn">
                                Buy
                            </button>
                        </form>
                    </div>
                </div>                
                `;
                
                index++;
            });
        })
        .catch(error => {
            console.error(error);
        })
};

//evento que se ejecutará cada vez que se cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    LOADCLIENT();
})