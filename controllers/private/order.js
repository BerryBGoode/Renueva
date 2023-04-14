//const. donde se evalua la acción a realizar
const ORDER = 'business/private/order.php';
// inicialización de modal
M.Modal.init(document.querySelectorAll('.modal'));
//const para el modal
const MODAL = M.Modal.getInstance(document.getElementById('modal'));
//const. para el form.
const FORM = document.getElementById('form-order');
//const. para modificar el texto del boton
const BUTTON = document.getElementById('process')

//Método para preparar el modal para agregar
function onCreate() {
    //abrir el modal
    MODAL.open();
    //limpiar campos
    FORM.reset();
    BUTTON.innerText = `Add`;
    /*  llenar select's*/
    //llenar el <select> de 'No.Orders'
    loadSelect(ORDER, 'loadOrders', 'orders', 'Select order', 'id');
    //llenar el <select> de 'documents'
    loadSelect(ORDER, 'loadDocuments', 'documents', 'Select document');
    //llenar el <select> de 'states'
    loadSelect(ORDER, 'loadStates', 'states', 'Select state of this order');
    //llenar el <select> de 'products'
    loadSelect(ORDER, 'loadProducts', 'products', 'Select product');
}

