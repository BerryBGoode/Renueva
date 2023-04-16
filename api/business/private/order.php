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
            case 'create':
                //validar form
                $_POST = Validate::form($_POST);
                //verificar si es nueva orden
                $response['session'] = $_POST['orders'];
                //verificar si es nueva orden
                if ($_POST['orders'] != 0) {

                    //enviar los datos de la orden
                    if ($order->setDOrder($_POST['orders'])) {
                        $response['status'] = 3;
                    } else {

                        $response['exception'] = 'Order incorrect';
                    }
                } else {
                    //nueva orden
                    //validar datos para insertar order
                    if (!$order->setClient($_POST['idclient'])) {
                        $response['exception'] = 'Client incorrect';
                    } else if (!$order->setDate($_POST['date'])) {
                        $response['exception'] = 'Date incorrect';
                    } else if (!$order->setState($_POST['state'])) {
                        $response['exception'] = 'State incorrect';
                    } elseif ($query->storeOrder()) {

                        //se agrego la orden correctamente
                        $response['status'] = 2;
                    } else {

                        $response['exception'] = 'Exception 1';
                    }
                }

                if ($response['status'] == 2) {

                    //cuando no existia la orden, recuperar la última (si no ha sido seleccionada alguna)
                    $id = implode(', ', $query->getLastOrder());
                    if ($id) {

                        //verificar los datos para agregar detalle
                        if (!$order->setDOrder($id)) {
                            $response['exception'] = 'Order incorrect';
                        } else if (!$order->setProduct($_POST['products'])) {
                            $response['exception'] = 'Product incorrect';
                        } elseif (!$order->setQuantity($_POST['quantity'])) {
                            $response['exception'] = 'Quantity incorrect';
                        } elseif ($query->storeDetail()) {
                            $response['status'] = 1;
                            $response['message'] = 'Data was successfully registred';
                        } else {

                            $response['exception'] = 'Only order successfully registred';
                        }
                    } else {
                        $response['exception'] = 'Error to get order';
                    }
                    //cuando se tiene un orden creada
                } elseif ($response['status'] == 3) {
                    //validar los datos a enviar
                    if (!$order->setProduct($_POST['products'])) {

                        $response['exception'] = 'Product incorrect';
                    } elseif (!$order->setQuantity($_POST['quantity'])) {
                        $response['exception'] = 'Quantity incorrect';
                    } //ingresar datos
                    elseif ($query->storeDetail()) {
                        $response['status'] = 1;
                        $response['message'] = 'Data was successfully registred';
                    } else {
                        $response['exception'] = 'Only order successfully registred';
                    }
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
