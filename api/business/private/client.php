<?php
//importación de archivo con los queries
require_once('../../entities/access/client.php');
require_once('../../entities/access/user.php');
//importación de archivo con los datos de transferencia
require_once('../../entities/transfers/client.php');
require_once('../../entities/transfers/user.php');
//var. con la const. de la instancia de la clase Client y User
$client = CLIENT;
$user = USER;
//array que se convertira en JSON y se reenviará al front para verificar la respuesta del proceso solicitado
$response = array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null);

//verificar si existe una action
if (!isset($_GET['action'])) {
    //no existe esa acción
    print_r(json_encode('Action dissable'));
} else {
    //reanudar la sessión
    session_start();

    //instancia de la clase ClientsQuery y UserQuery (la clase con los queries)
    $clientquery = new ClientQuery;
    $userquery = new UserQuery;

    //verificar el ususario de la sesión
    if (!isset($_SESSION['id_user'])) {
        $response['exception'] = 'Action denied';
    } else {

        //verificar la acción que se quiere ejecutar
        switch ($_GET['action']) {
            case 'create':

                //validar los datos del form
                $_POST = Validate::form($_POST);


                //enviar los datos a los attrs.
                //valida los datos de manera individual de user
                $user->setTypeUser(2); //client
                if (!$user->setUsername($_POST['username'])) {
                    $response['exception'] = 'Username incorrect';
                } elseif (!$user->setPassword($_POST['password'])) {
                    $response['exception'] = 'Password incorrect';
                } elseif (!$user->setEmail($_POST['email'])) {
                    $response['exception'] = 'Format email incorrect';
                } elseif ($userquery->store()) {
                    $response['status'] = 1;
                    $iduser = $userquery->getLastUser();
                    //enviar los datos a los attrs. de cliente
                    //validar los datos de manera individual de client
                    if (!$client->setNames($_POST['names'])) {
                        $response['exception'] = 'Max number of character is 25';
                        $response['status'] = 0;
                    } elseif (!$client->setLastNames($_POST['lastnames'])) {
                        $response['exception'] = 'Max number of character is 25';
                        $response['status'] = 0;
                    } elseif (!$client->setDocument($_POST['document'])) {
                        $response['exception'] = 'Format document incorrect';
                        $response['status'] = 0;
                    } elseif (!$client->setAddress($_POST['address'])) {
                        $response['exception'] = 'Max number of character is 100';
                        $response['status'] = 0;
                    } elseif (!$client->setPhone($_POST['phone'])) {
                        $response['exception'] = 'Format phone number incorrect';
                        $response['status'] = 0;
                    } elseif (!$client->setUser($iduser)) {
                        $response['exception'] = 'incorrect user';
                        $response['status'] = 0;
                    } elseif ($clientquery->store()) {
                        
                        $response['status'] = 2;
                        $response['message'] = 'Data was successfully registred';
                    } else {
                        $response['message'] = 'Only client successfully registred';
                        $response['exception'] = Connection::getException();
                    }
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            default:
                # code...
                break;
        }
    }
    //formato para mostrar el contenido
    header('content-type: application/json; charset=utf-8');
    // print_r($response);
    //resultado formato json y retorna al controlador
    print(json_encode($response));
}
