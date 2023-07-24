const DETAIL = 'business/private/order.php';
const FORM = document.getElementById('form-detail')
const TXTBUTTON = document.getElementById('process')
const ORDER = window.location.search;
const ROWS = document.getElementById('table-body');
const MSG = document.getElementById('');
const FORMSEARCH = document.getElementById('');
const ROWTOTAL = document.getElementById('total');
const SUBTOTAL = [];
M.Modal.init(document.querySelectorAll('.modal'));
const MODAL = M.Modal.getInstance(document.getElementById('modal'));

function getOrderURL() {
    const URL = new URLSearchParams(ORDER);
    const VALUE = URL.get('orderid');
    return VALUE;
}

document.addEventListener('DOMContentLoaded', () => {
    loadTable();    
})

async function loadTable() {
    ROWS.innerHTML = ``;
    
    const DATA = new FormData;
    DATA.append('idorder', getOrderURL());
    const JSON = await dataRequest(DETAIL, 'loadDetails', DATA);
    if (JSON.status === 1) {
        // reinciar los valores del array
        SUBTOTAL.splice(0, SUBTOTAL.length);

        JSON.dataset.forEach(element => {

            ROWS.innerHTML += `<tr>
                <td>${element.name}</td>
                <td>
                
                <!-- input para agregar cuantitve -->
                    <svg width="19" height="19" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 22.9168C18.2292 22.9168 22.9167 18.2293 22.9167 12.5002C22.9167 6.771 18.2292 2.0835 12.5 2.0835C6.77084 2.0835 2.08334 6.771 2.08334 12.5002C2.08334 18.2293 6.77084 22.9168 12.5 22.9168Z" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.33334 12.5H16.6667" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 16.6668V8.3335" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                
                ${element.cuantitive}

                <!-- input para restar quantive -->
                    <svg width="19" height="19" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 22.9168C18.2291 22.9168 22.9166 18.2293 22.9166 12.5002C22.9166 6.771 18.2291 2.0835 12.5 2.0835C6.77081 2.0835 2.08331 6.771 2.08331 12.5002C2.08331 18.2293 6.77081 22.9168 12.5 22.9168Z" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.33331 12.5H16.6666" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                                
                
                
                </td>
                <td>$${element.price}</td>
                <td>$${element.total}</td>
                <td>

                    <!-- boton para actualizar -->
                    <svg width="26" height="25" viewBox="0 0 34 33" fill="none" onclick="onModify(${element.id_detail_order})"
                    xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.0215 1.91666H12.0468C4.60998 1.91666 1.63525 4.83332 1.63525 12.125V20.875C1.63525 28.1667 4.60998 31.0833 12.0468 31.0833H20.971C28.4078 31.0833 31.3825 28.1667 31.3825 20.875V17.9583"
                            stroke="#424242" stroke-width="3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M22.5177 3.40417L10.7973 14.8958C10.3511 15.3333 9.90489 16.1937 9.81565 16.8208L9.17609 21.2104C8.93811 22.8 10.0834 23.9083 11.7046 23.6896L16.1816 23.0625C16.8063 22.975 17.6838 22.5375 18.1449 22.1L29.8653 10.6083C31.8881 8.625 32.84 6.32084 29.8653 3.40417C26.8906 0.487502 24.5405 1.42084 22.5177 3.40417Z"
                            stroke="#424242" stroke-width="3" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M20.8372 5.05191C21.8337 8.53733 24.6151 11.2644 28.1847 12.2561"
                            stroke="#424242" stroke-width="3" stroke-miterlimit="10"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

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
            </tr>`;

            // asignar al array los valores recuperados de los subtotales
        SUBTOTAL.push(element.total)

        });
    

        // almacenar la suma de los sutototales (total)
        let total = 0;
        
        let index = 0;
        // crear una variante del array con los SUBTOTALES
        for(const UNIT of SUBTOTAL){
            // al valor anterior sumarle el número
            total += parseFloat(UNIT + ' index: '+index);
            
        }
        ROWTOTAL.innerHTML = `$` +total.toLocaleString(5)

    } else if (JSON.status === -1) {
        notificationRedirect('info', JSON.exception, false);
    } else {
        notificationRedirect('error', JSON.exception, false)
    }
}

/**
 * evento para limpiar todo campos cuando pase en evento reset
*/
FORM.addEventListener('reset', () => {
    //limipiar el form
    FORM.reset();
    //cerrar modal
    MODAL.close();
});


FORM.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    document.getElementById('iddetail').value ? action = 'changeDetail' : action = 'addDetail';
    const DATA = new FormData(FORM);
    DATA.append('idorder', getOrderURL());
    const JSON = await dataRequest(DETAIL, action, DATA);
    if (JSON.status) {
        loadTable();
        notificationRedirect('success', JSON.message, true);
        MODAL.close();
    } else {
        notificationRedirect('error', JSON.exception, false);
    }
})

async function onCreate(){
    FORM.reset();
    TXTBUTTON.innerHTML = `Add`;
    const DATA = new FormData;
    DATA.append('idorder', getOrderURL())
    const JSON = await dataRequest(DETAIL, 'loadClientOrder', DATA);
    loadSelect(DETAIL, 'loadProducts', 'products');
    
    if (JSON.status === 1) {
        
        document.getElementById('names').value = JSON.client.names;
        document.getElementById('lastnames').value = JSON.client.last_names;
        document.getElementById('address').value = JSON.client.address;
        M.updateTextFields();
    } else if (JSON.status === -1){
        notificationRedirect('info', JSON.exception, false)
    }
    else {
        notificationRedirect('error', JSON.exception, false);
    }
}

async function onModify(id){
    FORM.reset();
    TXTBUTTON.innerHTML = `Modify`;
    const DATA = new FormData;
    DATA.append('iddetail', id);
    const JSON = await dataRequest(DETAIL, 'one', DATA);
    if (JSON.status) {
        MODAL.open();    
        loadSelect(DETAIL, 'loadProducts', 'products', JSON.dataset.id_product);

        document.getElementById('names').value = JSON.dataset.names;
        document.getElementById('lastnames').value = JSON.dataset.last_names;
        document.getElementById('address').value = JSON.dataset.address;
        M.updateTextFields();
    } else {
        notificationRedirect('error', JSON.exception, false);
    }
}

async function onDestroy(id){
    let confirm = await notificationConfirm('Do you wanna delete this detail?');
    if (confirm) {
        const DATA = new FormData;
        DATA.append('id_detail', id);
        const JSON = await dataRequest(DETAIL, 'deleteDetail', DATA);
        if (JSON.status) {
            loadTable();
            notificationRedirect('success', JSON.message, true);
        } else {
            notificationRedirect('error', JSON.exception, false);
        }
    }
}

async function OpenReport() {
    const DATA = new FormData;
    const ORDER = getOrderURL();
    DATA.append('idorder', ORDER);
    const JSON = await dataRequest(DETAIL, 'getOrderToReport', DATA);
    if (JSON.status) {
        const PATH = new URL(JSON.dataset);
        window.open(PATH.href)
    }
}