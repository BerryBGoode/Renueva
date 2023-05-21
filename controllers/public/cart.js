// archivo donde hace las peticiones
const CART = 'business/public/cart.php';
// componente donde cargan los detalle 
const TABLE = document.getElementById('tb-body');
// elemento para cargar la cantidad de pedidos
const DETAILS = document.getElementById('table-heade');
// elemento donde carga el total de la orden
const TOTAL = document.getElementById('total');
// arreglo donde guardar los subtotales para ir sumando cada uno
const SUBTOTAL = [];

/**
 * Método para obtener la orden del url
 */
const getOrderURL = () => {
    // instanciar la clase URLSearchParams para buscar los parametros de la URL
    const URL = new URLSearchParams(window.location.search);
    // obtener el valor entero del parametro que se encuentra en la URL
    // parametro de esta URL es 'productid', también es el nombre del input que tiene el id del producto de la tabla
    // que se encuentra en productos para acceder aquí
    const VALUE = URL.get('orderid');
    // retornar el valor entero del parametro de la URL
    return VALUE;
}

// evento que se ejecuta cuando carga la página
document.addEventListener('DOMContentLoaded', async event => {
    event.preventDefault();
    // obtener la orden actual del cliente    
    // const ORDER = await dataRequest(CART, 'getActuallyOrder');
    // // verificar el estado de la petición de obtener el id order
    // if (ORDER.status) {
    //     const DATA = new FormData;
    // }

    if (!getOrderURL()) {
        M.toast({ html: "Doesn't exist order" });
        setTimeout(() => {
            location.href = '../../view/public';
        }, 2000)
    }
    LOAD();
})

const LOAD = async () => {
    TABLE.innerHTML = ``;
    DETAILS.innerHTML = ``;
    const ORDER = new FormData;
    // adjuntar order
    ORDER.append('order', getOrderURL());
    const JSON = await dataRequest(CART, 'viewCart', ORDER);
    if (JSON.status) {
        // reiniciar los valores del arreglo
        SUBTOTAL.splice(0, SUBTOTAL.length);
        // recorrer los pedidos encontrados
        DETAILS.innerHTML = `<span>${JSON.message} orders</span>`
        JSON.dataset.forEach(element => {
            TABLE.innerHTML += `
                <tr>
                    <td class="hide iddetail">${element.id_detail_order}</td>
                    <td>${element.name}</td>
                    <td>$${element.price}</td>
                    <td>
                    
                    <div class="quantity">
                        
                        <svg id="rest" class="rest" width="19" height="19" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.5 22.9168C18.2291 22.9168 22.9166 18.2293 22.9166 12.5002C22.9166 6.771 18.2291 2.0835 12.5 2.0835C6.77081 2.0835 2.08331 6.771 2.08331 12.5002C2.08331 18.2293 6.77081 22.9168 12.5 22.9168Z"
                                stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.33331 12.5H16.6666" stroke="#424242" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                        <span id="count" class="count">${element.cuantitive}</span>

                        <svg id="sum" class="sum" width="19" height="19" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.5 22.9168C18.2292 22.9168 22.9167 18.2293 22.9167 12.5002C22.9167 6.771 18.2292 2.0835 12.5 2.0835C6.77084 2.0835 2.08334 6.771 2.08334 12.5002C2.08334 18.2293 6.77084 22.9168 12.5 22.9168Z"
                                stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.33334 12.5H16.6667" stroke="#424242" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M12.5 16.6668V8.3335" stroke="#424242" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                    </div>
                    
                    </td>
                    <td>$${element.total}</td>
                    <td>
                        <!-- boton para eliminar -->
                        <svg width="22" height="25" viewBox="0 0 30 33" fill="none" onclick="onDestroy(${element.id_detail_order})"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M28.4432 7.7208C23.4903 7.23955 18.5076 6.99164 13.5398 6.99164C10.5948 6.99164 7.64985 7.13747 4.70487 7.42914L1.67065 7.7208"
                                stroke="#424242" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M9.85107 6.24791L10.1783 4.33749C10.4163 2.95207 10.5948 1.91666 13.1084 1.91666H17.0053C19.5189 1.91666 19.7123 3.01041 19.9354 4.35207L20.2626 6.24791"
                                stroke="#424242" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M25.2452 12.3292L24.2784 27.0146C24.1148 29.3041 23.981 31.0833 19.8312 31.0833H10.2824C6.13267 31.0833 5.9988 29.3041 5.83519 27.0146L4.86841 12.3292"
                                stroke="#424242" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M12.573 23.0625H17.5259" stroke="#424242" stroke-width="3"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.3386 17.2292H18.7754" stroke="#424242" stroke-width="3"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>   
                    </td>
                </tr>
            `;
            // asignar el subtotal obtenido del registro que esta recorriendo
            SUBTOTAL.push(element.total);

            // obtener id del detalle
            const ID = document.getElementsByClassName('iddetail');
            // obtener los botones para agregar 1 cantidad
            const SUM = document.getElementsByClassName('sum');
            // obtener los botones para restar 1 cantidad
            const REST = document.getElementsByClassName('rest');
            // elemento donde esta el valor del contador en base a la cantidad
            let count = document.getElementsByClassName('count');
            // recorrer los botones encontrados
            for (let index = 0; index < ID.length; index++) {
                // Evento para agregar cantidad
                SUM[index].addEventListener('click', async event => {
                    event.preventDefault();
                    // hacer suma
                    let result = parseInt(count[index].textContent) + 1;
                    // mostrar en la tabla
                    count[index].innerHTML = result;
                    // actualizar
                    const DETAIL = new FormData;
                    DETAIL.append('detail', ID[index].textContent);
                    DETAIL.append('quantity', result);
                    const JSON = await dataRequest(CART, 'changeQuantity', DETAIL);
                    if (JSON.status) {
                        M.toast({ html: "Product append" });
                    }

                })
                // Evento para restar cantidad
                REST[index].addEventListener('click', async event => {
                    event.preventDefault();
                    // hacer suma
                    let result = parseInt(count[index].textContent) - 1;
                    // mostrar en la tabla
                    count[index].innerHTML = result;
                    // actualizar
                    const DETAIL = new FormData;
                    DETAIL.append('detail', ID[index].textContent);
                    DETAIL.append('quantity', result);
                    const JSON = await dataRequest(CART, 'changeQuantity', DETAIL);
                    if (JSON.status) {
                        M.toast({ html: "Product disappend" });
                    }
                })
            }
        });
        // almacena los subtotales para irlos sumando y encontrar el total
        let total = 0;
        let index = 0;
        // iterrar arreglo con los subtotales obtenidos
        for (const UNIT of SUBTOTAL) {
            total += parseFloat(UNIT + ' index: ' + index);
        }
        TOTAL.innerHTML = `<h5 class="bold">
        $${total.toLocaleString(5)}    
        </h5>`


    }
}

async function onDestroy(id) {
    let confirm = await notificationConfirm('Do you wanna delete this detail?');
    if (confirm) {
        const DATA = new FormData;
        DATA.append('id_detail', id);
        const JSON = await dataRequest(CART, 'deleteDetail', DATA);
        if (JSON.status) {
            LOAD();
            notificationRedirect('success', JSON.message, true);
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
}