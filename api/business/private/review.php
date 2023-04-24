<?php
// archivo con los datos de transferencia
require_once('../../entities/transfers/review.php');
// archivo con los queries
require_once('../../entities/access/review.php');

// arreglo que sirve para retornar al 'front' las respuestas según el proceso elegido o, ya sea que este correcto o incorrecto 
$response = array('status' => 0, 'client' => null, 'message' => null, 'exception' => null, 'dataset' => null);

// verificar sí existe una acción
if (!isset($_GET['action'])) {
    $response['exception'] = 'Action dissable';
} else {
    // reanudar la sesión
    session_start();

    // verificar sí existe un sesión de admin
    if (!isset($_SESSION['id_user'])) {

        $response['exception'] = 'Action denied';
    } else {

        // instancia de la clase 'Review' (REVIEW tiene la instancia)
        $review = REVIEW;
        // instancia de la clase 'ReviewQuery'
        $query = new ReviewQuery;
        // verificar el contenido del 'action'
        switch ($_GET['action']) {
            case 'getDocument':

                if ($response['dataset'] = $query->getDocumentClient()) {
                    $response['status'] = 1;
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'getClient':

                if ($response['client'] = $query->getClient($_POST['documents'])) {
                    $response['status'] = 1;
                } else {
                    print_r($_POST);
                    $response['exception'] = Connection::getException();
                }


                break;

            case 'create':
                // validar los datos
                $_POST = Validate::form($_POST);

                // validar que exista el detalle según producto y orden recibidos
                if ($detail = $query->checkDetail(
                    $_POST['products'],
                    $_POST['orders']
                )) {

                    // validar los datos
                    if (!$review->setComment($_POST['comment'])) {
                        $response['exception'] = 'Error in comment';
                    } elseif (!$review->setIdDetailOrder($detail['id_detail_order'])) {
                        $response['exception'] = 'Detail incorrect';
                    } elseif ($query->store()) {
                        $response['status'] = 1;
                        $response['message'] = 'Data was successfully registred';
                    } else {
                        $response['exception'] = Connection::getException();
                    }
                } else {
                    $response['exception'] = "Doesn't exist this detail ";
                }

                break;

            default:
                $response['exception'] = "This action dosen't exist";
                break;
        }
    }
}
//formato para mostrar el contenido
header('content-type: application/json; charset=utf-8');
// print_r($response);
//resultado formato json y retorna al controlador
print(json_encode($response));