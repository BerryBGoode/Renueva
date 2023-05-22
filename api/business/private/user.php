<?php
require_once('../../entities/transfers/user.php');
require_once('../../entities/access/user.php');
//referencia a la clase con la transferencia de datos (getter y setter)

//comprobar si no existe (isset) un acción por el método GET solicitada por el usuario
//el 'action' viene del controlador (el botton presionado)
if (isset($_GET['action'])) {
    //crear una sesión o reaundarla (necesario para realizar proceso que necesitan datos de la sesión)
    session_start();
    //objeto de la clase user con los attr de trasnferencia 
    $user = USER;
    //objeto de clase userquery
    $userquery = new UserQuery;
    //arreglo para guardar lo que retorne los datos de transferencia y transacciones SQL (queries)
    $response =  array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'username' => null);
    //verificar si existe la sesión iniciar 
    //para poder administrar las acciones que puede realizar cuando ha iniciado sesión que cuando no
    //por el momento para avanzar el scrud de usuario solo cuando haya un sesión iniciada
    if (isset($_SESSION['id_user']) || isset($_SESSION['id_client'])) {

        //asignar 1 a la sesión porque existe una sesión
        $response['session'] = 1;
        //como existe una sesión, verificar la acción que quiere tomar el usuario
        switch ($_GET['action']) {

            case 'getUser';
                if (isset($_SESSION['username'])) {
                    $response['status'] = 1;
                    $response['username'] = $_SESSION['username'];
                } else {
                    $response['exception'] = 'Undefined username';
                }

            case 'logOut':
                if (session_destroy()) {
                    $response['status'] = 1;
                    $response['message'] = 'Log out process correct';
                } else {
                    $response['exception'] = 'Something wrong to log out';
                }
                break;

            case 'LoginClient':

                //validar que el $_POST no traiga espacio demás
                $_POST = Validate::form($_POST);

                if (!$userquery->validateClient($_POST['username'])) {
                    $response['exception'] = 'User no registred';
                } elseif ($userquery->validatePassword($_POST['password'])) {
                    $response['status'] = 1;
                    $response['message'] = 'Authenticate Correct';
                    //crear  una sesión con el id usuario recuperado
                    $_SESSION['id_client'] = $user->getID();
                    $_SESSION['user_client'] = $user->getUsername();
                } else {
                    $response['exception'] = 'Password incorrect';
                }
                break;

            case 'logOutClient':
                // borrar variables de sesión de cliente
                unset($_SESSION['id_client']);
                unset($_SESSION['user_client']);
                break;
            case 'checkSessionClient':
                print_r($_SESSION);
                // verificar sesión
                if (!isset($_SESSION['id_client'])) {
                    $response['status'] = -1;
                } else {
                    $response['status'] = 1;
                }

                break;

            default:
                $response['exception'] = 'This Action is disable in session';
        }
    } else {
        //acciones cuando no sé a iniciado sesión
        switch ($_GET['action']) {

            case 'login':

                //validar que el $_POST no traiga espacio demás
                $_POST = Validate::form($_POST);

                if (!$userquery->validateUser($_POST['username'])) {
                    $response['exception'] = 'User no registred';
                } elseif ($userquery->validatePassword($_POST['password'])) {
                    $response['status'] = 1;
                    $response['message'] = 'Authenticate Correct';
                    //crear  una sesión con el id usuario recuperado
                    $_SESSION['id_user'] = $user->getID();
                    $_SESSION['username'] = $_POST['username'];
                } else {
                    $response['exception'] = 'Password incorrect';
                }
                break;

                // login clientes
            case 'LoginClient':

                //validar que el $_POST no traiga espacio demás
                $_POST = Validate::form($_POST);

                if (!$userquery->validateClient($_POST['username'])) {
                    $response['exception'] = 'User no registred';
                } elseif ($userquery->validatePassword($_POST['password'])) {
                    $response['status'] = 1;
                    $response['message'] = 'Authenticate Correct';
                    //crear  una sesión con el id usuario recuperado
                    $_SESSION['id_client'] = $user->getID();
                    $_SESSION['user_client'] = $_POST['username'];
                } else {
                    $response['exception'] = 'Password incorrect';
                }
                break;

            case 'signup':
                //validar los datos que trae el formulario por medio del método $_POST con todos los datos
                $_POST = Validate::form($_POST);
                //enviando datos y validando datos
                //solo los casos incorrectos
                //$_POST['inputname']
                print_r($_POST);
                $user->setTypeUser($userquery->getTypeUser('Client')['id_type_user']); //solo tipo usuario 1 por testing
                if (!$user->setUsername($_POST['username'])) {
                    $response['exception'] = 'Username incorrect';
                } elseif (!$user->setPassword($_POST['password'])) {
                    $response['exception'] = Validate::errorPassword();
                } elseif (!$user->setEmail($_POST['email'])) {
                    $response['exception'] = 'Email format incorrect';
                } elseif ($userquery->store() && !Connection::getException()) {
                    $response['status'] = 1;
                    $response['message'] = 'User registred correctly';
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            default:
                $response['exception'] = 'This Action is disable out session';
        }
    }
    //formato para mostrar el contenido
    header('content-type: application/json; charset=utf-8');
    // print_r($response);
    //resultado formato json y retorna al controlador
    print(json_encode($response));
} else {
    print(json_encode('Solicitud no registrada'));
}
