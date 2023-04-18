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
                        $response['dataset'] = $_POST;
                    } else {
                        $response['message'] = 'Only client successfully registred';
                        $response['exception'] = Connection::getException();
                    }
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'all':
                //verificar si la consulta o el método all() salio como esperaba
                if ($response['dataset'] = $clientquery->all()) {
                    $response['status'] = 1;
                } elseif (Connection::getException()) {
                    $response['exception'] = Connection::getException();
                } else {
                    $response['exception'] = "Doesn't exist regiter";
                }


                break;


            case 'one':
                //verificar si enviaron algo por el método $_POST
                //como no hay un evento post en el front
                //el $_POST[''] en esta perte tiene que ser según se llama en el controller de esta entidad
                if (($_POST['id_client'] && $_POST['id_client']) || ($_POST['id_client'] > 0 || $_POST['id_client'] > 0)) {

                    if ($response['dataset'] = $clientquery->one($_POST['id_client'])) {
                        $response['status'] = 1;
                    } elseif (Connection::getException()) {
                        $response['exception'] = Connection::getException();
                    } else {
                        $response['exception'] = 'Error to find this client';
                    }
                } else {
                    $response['exception'] = 'Error to get user or client';
                }


                break;

            case 'update':

                //validar los datos a enviar
                $_POST = Validate::form($_POST);
                //validar los datos de usuario
                // print_r($_POST);
                if (!$user->setID($_POST['iduser'])) {
                    $response['exception'] = 'User incorrect';
                } elseif (!$user->setUsername($_POST['username'])) {
                    $response['exception'] = 'Username incorrect';
                } elseif (!$user->setEmail($_POST['email'])) {
                    $response['exception'] = 'Format email incorrect';
                } elseif ($userquery->change()) {

                    $response['status'] = 1;

                    //validar los datos del cliente
                    if (!$client->setId($_POST['idclient'])) {

                        $response['status'] = 0;
                        $response['exception'] = 'Client incorrect';
                    } elseif (!$client->setNames($_POST['names'])) {

                        $response['status'] = 0;
                        $response['exception'] = 'Names incorrect';
                    } elseif (!$client->setLastNames($_POST['lastnames'])) {

                        $response['status'] = 0;
                        $response['exception'] = 'Lastnames incorrect';
                    } elseif (!$client->setDocument($_POST['document'])) {

                        $response['status'] = 0;
                        $response['exception'] = 'Format document incorrect';
                    } elseif (!$client->setPhone($_POST['phone'])) {
                        $response['status'] = 0;
                        $response['exception'] = 'Format phone incorrect';
                    } elseif (!$client->setAddress($_POST['address'])) {
                        $response['status'] = 0;
                        $response['exception'] = 'Address incorrect max character(100)';
                    } elseif ($clientquery->change()) {
                        $response['status'] = 2;
                        $response['message'] = 'Data was successfully modified';
                    } else {
                        $response['message'] = 'Only user was successfully modified';
                        $response['exception'] = Connection::getException();
                    }
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'delete':
                
                //verificar que se obtubo obtuvo un id
                if ($_POST['iduser']) {

                    //verificar el proceso
                    if ($userquery->destroy($_POST['iduser'])) {
                        $response['status'] = 1;
                        $response['message'] = 'Data was successfully delete';
                    } else {
                        $response['exception'] = 'Error to delete this client';
                    }
                } else {
                    $response['exception'] = 'Error to get client';
                }


                break;
            default:
                $response['exception'] = 'This action disable';
                break;
        }
    }
    //formato para mostrar el contenido
    header('content-type: application/json; charset=utf-8');
    // print_r($response);
    //resultado formato json y retorna al controlador
    print(json_encode($response));
}
