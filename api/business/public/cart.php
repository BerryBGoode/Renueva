<?php
// archivo con los queries de ordenes y detalle orden
require_once '../../entities/access/order.php';
// archivon con los attrs de ordenes y detalle orden
require_once '../../entities/transfers/order.php';

// arreglo que retornará las respuestas
$response = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);

// verificar que no exista una acción
if (!isset($_GET['action'])) {
    $response['exception']= 'Action dissable';
} else {
    // renuvar la sesión activa
    session_start();
    // instanciar la clase con los queries
    $query = new OrderQuery;
    // verificar que no exista una sessión
    if (!isset($_SESSION['id_user'])) {
        $response['status'] = -1;
        $response['exception'] = 'This action require to have account';
    } else {
        // verificar la acción de la que hace la petición
        switch ($_GET['action']) {
            case 'createOrder':
                
                

                break;
            
            default:
                # code...
                break;
        }
    }
    
}

?>