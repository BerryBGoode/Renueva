<?php
//archivos con los datos de transferencia (getter y setter)
require_once('../../entities/transfers/order.php');
//archivos con los queries
require_once('../../entities/access/order.php');
//array con que retirna el api y después de convertira a JSON
$response = array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'username' => null, 'client' => null);

//var. con la const. de tipo obj. de la clase order con los datos de trasnferencia
$order =  ORDER;

//verificar sí existe un acción
if (isset($_GET['action'])) {

    //renuadar la sesión
    session_start();
    //obj. de la clase order con los queries
    $query = new OrderQuery;
    //verificar el 'id_user' de la sesión
    if (isset($_SESSION['id_user'])) {
        
        //validar las acciones de un switch
        switch ($_GET['action']) {
            case 'loadStates':

                if ($response['dataset'] = $query->getAllStates()) {
                    $response['status'] = 1;
                } else {
                    $response['status'] = 0;
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'loadOrders':

                if ($response['dataset'] = $query->getIdOrder()) {
                    $response['status'] = 1;
                } else {
                    $response['status'] = 0;
                    $response['exception'] = Connection::getException();
                }


                break;

            case 'loadDocuments':

                if ($response['dataset'] = $query->getDocuments()) {
                    $response['status'] = 1;
                } else {
                    $response['status'] = 0;
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'loadClient':
                if ($_POST) {
                    
                    //convertir a string el 'document' que viene front
                    $document = implode(',', $_POST);

                    if ($response['client'] = $query->getClient($document)) {
                        $response['status'] = 1;
                    } else {
                        $response['status'] = 0;
                        $response['exception'] = Connection::getException();
                    }

                }
                break;

            case 'loadProducts':

                if ($response['dataset'] = $query->getProductAvailable()) {
                    $response['status'] = 1;
                } else {
                    $response['status'] = 0;
                    $response['exception'] = Connection::getException();
                }

                break;

            default:
                $response['exception'] = $_GET['action'] . ': This action is not defined';
        }
        //formato para mostrar el contenido
        header('content-type: application/json; charset=utf-8');
        // print_r($response);
        //resultado formato json y retorna al controlador
        print(json_encode($response));
    } else {
        //mensaje de error
        print('Action denied');
    }
} else {
    //acción no disponible
    print(json_encode('Action dissable'));
}
