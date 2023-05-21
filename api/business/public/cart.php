<?php
// archivo con los queries de ordenes y detalle orden
require_once '../../entities/access/order.php';
// archivon con los attrs de ordenes y detalle orden
require_once '../../entities/transfers/order.php';

// arreglo que retornará las respuestas
$response = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);

// verificar que no exista una acción
if (!isset($_GET['action'])) {
    $response['exception'] = 'Action dissable';
} else {
    // renuvar las variables de sesión activa
    session_start();
    // instanciar la clase con los queries
    $query = new OrderQuery;
    // verificar que no exista una sessión
    if (!isset($_SESSION['id_client'])) {
        $response['status'] = -1;
        $response['exception'] = 'This action require to have account';
    } else {
        // verificar la acción de la que hace la petición
        switch ($_GET['action']) {
            case 'createOrder':
                // verificar sí el cliente que quiere comprar X producto tiene un orden pendiente
                if ($orders = $query->getOrderByClient($_SESSION['id_client'])) {
                    // línea 30 a la 37, valida que las ordenes pendientes tengan un detalle, sí no lo tienen la eliminará
                    // recorrer las ordenes encontradas
                    for ($i = 0; $i < count($orders); $i++) {
                        // verfícar sí esa orden no tiene detalle     
                        if (!$details = $query->details(implode(' ', $orders[$i]))) {
                            // eliminar orden pendiente sí no tiene detalle
                            // convertirla de array a string
                            $query->destroyOrder(implode(' ', $orders[$i]));
                            // print_r($order[$i]);
                        }
                    }
                    // hasta aquí tengo ordenes que tienen detalle
                    // verificar sí la orden pendiente y el producto ya tienen un detalle, para agregar +1 cantidad
                    // iterar el arreglo con la orden con detalle
                    for ($i = 0; $i < count($orders); $i++) {
                        // verificar sí el detalle de la orden ya tiene producto agregado
                        // y que el producto es el que quiere comprar el cliente
                        if ($details = $query->getDetailByOrderProduct(implode(' ', $orders[$i]), $_POST['product'])) {
                            // cliente ya tiene un detalle con ese producto
                            // entonces procede a agregar +1 a la cantidad de ese detalle                        
                            $query->addQuantitive($details[$i]['id_detail_order'], $_POST['quantity']);
                            $response['status'] = 1;
                        } else {
                            // agregar producto al detalle
                            if (!ORDER->setDOrder(implode(' ', $orders[$i]))) {
                                $response['exception'] = 'Error to get order';
                            } elseif (!ORDER->setProduct($_POST['product'])) {
                                $response['exception'] = 'Error to get product';
                            } elseif (!ORDER->setQuantity($_POST['quantity'])) {
                                $response['exception'] = 'Error to get quantity';
                            } elseif ($query->storeDetail()) {
                                $response['status'] = 1;
                            } else {
                                $response['exception'] = Connection::getException();
                            }
                        }
                    }
                } else {
                    // crear orden en caso tenga un orden nueva
                    // no tiene orden pendiente - crear orden y detalle
                    // definiar horario local
                    date_default_timezone_set('America/El_Salvador');
                    $today = date('Y-m-d');
                    // crear orden
                    if (!ORDER->setClient(implode(' ', $query->getClient($_SESSION['id_client'])))) {
                        $response['exception'] = 'Error to get client';
                    } elseif (!ORDER->setDate($today)) {
                        $response['exception'] = 'Error to get actually date';
                    } elseif (!ORDER->setState(implode(' ', $query->InProcess()))) {
                        $response['exception'] = 'Error to get state';
                    } elseif ($query->storeOrder()) {
                        // crear detalle                    
                        $id = implode(' ', $query->getLastOrder());
                        if ($id) {

                            //verificar los datos para agregar detalle
                            if (!ORDER->setDOrder($id)) {
                                $response['exception'] = 'Order incorrect';
                            } else if (!ORDER->setProduct($_POST['product'])) {
                                $response['exception'] = 'Product incorrect';
                            } elseif (!ORDER->setQuantity($_POST['quantity'])) {
                                $response['exception'] = 'Quantity incorrect';
                            } elseif ($query->storeDetail()) {
                                $response['status'] = 1;
                            } else {
                                $response['exception'] = Connection::getException();
                            }
                        } else {
                            $response['exception'] = Connection::getException();
                        }
                    } else {
                        $response['exception'] = Connection::getException();
                    }
                }

                break;

            case 'getActuallyOrder':

                if ($response['dataset'] = $query->getOrderByClient($_SESSION['id_client'])) {
                    $response['status'] = 1;
                } elseif (Connection::getException()) {
                    $response['exception'] = Connection::getException();
                } else {
                    $response['status'] = 2;
                    $response['exception'] = "Doesn't exist order";
                }
                break;

            case 'viewCart':

                if ($response['dataset'] = $query->details($_POST['order'])) {
                    $response['status'] = 1;
                    $response['message'] = count($response['dataset']);
                } elseif (Connection::getException()) {
                    $response['exception'] = Connection::getException();
                } else {
                    $response['exception'] = "Doesn't exist products in your cart";
                }


                break;

            case 'changeQuantity':

                if ($query->changeQuantity($_POST['quantity'], $_POST['detail'])) {
                    $response['status'] = 1;
                } else {
                    $response['exception'] = Connection::getException();
                }


                break;

            case 'deleteDetail':
                //validar el form
                $_POST = Validate::form($_POST);
                //validar el 'iddetail' que exista o si es menor a 0
                if (!$_POST['id_detail'] || $_POST['id_detail'] < 0) {
                    $response['exception'] = 'Error to get detail';
                } elseif ($query->destroyDetail($_POST['id_detail'])) {
                    $response['status'] = 1;
                    $response['message'] = 'Data was correctly delete';
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'endOrder':

                if ($query->changeStateOrder('on the way', $_POST['order'])) {
                    $response['status'] = 1;
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'cancelOrder':

                if ($query->changeStateOrder('cancelled', $_POST['order'])) {
                    $response['status'] = 1;
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;
            default:
                $response['exception'] = Connection::getException();
                break;
        }
    }
}
//formato para mostrar el contenido
header('content-type: application/json; charset=utf-8');
// print_r($response);
//resultado formato json y retorna al controlador
print(json_encode($response));
