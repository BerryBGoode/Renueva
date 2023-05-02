<?php
// llamar el archivo con los queries
require_once('../../entities/access/product.php');

// array para retornar respuestas
$response = array('message' => null, 'exception' => null, 'dataset' => null, 'status' => 0, 'count' => 0, 'path' => null);
// verificar sí existe un acción
if ($_GET['action']) {
    
    // instancia de la clase con los queries de products
    $product = new ProductQuery;

    // evaluar la acción
    switch ($_GET['action']) {
        // acción para cargar los productos al cliente
        case 'loadProducts':

            if ($response['dataset'] = $product->loadProductsClient()) {
                $response['status'] = 1;
                $response['count'] = count($response['dataset']);
                
            } elseif (Connection::getException()) {
                $response['exception'] = Connection::getException();
            } else {
                $response['exception'] = "Doesn't exist products";
            }
            
            
            break;
        
        default:
            # code...
            break;
    }

} else {
    $response['exception'] = 'This action disabled';
}

// al array con las respuestas enviarle al header el formato de caracteres
header('content-type: application/json; charset=utf-8');
// codigicar a JSON la respuesta
print(json_encode($response));
