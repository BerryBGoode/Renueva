<?php
//archivos con los datos de transferencia (getter y setter) de staff y user
require_once('../../entities/transfers/user.php');
require_once('../../entities/transfers/staff.php');
//archivos con los queries de staff y user
require_once('../../entities/access/user.php');
require_once('../../entities/access/staff.php');
//array con que retirna el api y después de convertira a JSON
$response = array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'username' => null);

//var igual a una const. de la clase user y staff con los attr de transferencia de datos
$user = USER;
$staff = STAFF;

//verificar sí existe la acción traida get
if (isset($_GET['action'])) {

    //empezar una sesión
    session_start();
    //obj. de la clase user y staff con los queries
    $userquery = new UserQuery;
    $staffquery = new StaffQuery;
    //verficar si existe una sessión, así restrigir las acciones al tener una sesión activa        
    if (isset($_SESSION['id_user'])) {

        $response['sesion'] = 1;
        //verificar la acción
        switch ($_GET['action']) {
            case 'create':

                //validar los datos que trae el formulario por medio del método $_POST con todos los datos
                $_POST = Validate::form($_POST);
                //enviando datos y validando datos
                //solo los casos incorrectos

                //datos del usuario (user)
                $user->setTypeUser(1); //admin 
                if (!$user->setUsername($_POST['username'])) {
                    $response['exception'] = 'Username incorrect';
                } elseif (!$user->setPassword($_POST['password'])) {
                    $response['exception'] = Validate::errorPassword();
                } elseif (!$user->setEmail($_POST['email'])) {
                    $response['exception'] = 'Email format incorrect';
                } /*else if (!$user->setPhoto('')) {
                    $response['exception'] = Validate::errorFile();
                }*/ elseif ($userquery->store()) {

                    $response['status']  = 1;
                    // $iduser = $staffquery->getLastUser();
                    //datos del empleado (staff)                    
                    if (!$staff->setNames($_POST['names'])) {
                        $response['exception'] = 'Max number of character is 25';
                    } elseif (!$staff->setLastNames($_POST['last_names'])) {
                        $response['exception'] = 'Max number of character is 25';
                    } elseif (!$staff->setDocument($_POST['document'])) {
                        $response['exception'] = 'Format document is incorrect';
                    } elseif (!$staff->setPhone($_POST['phone'])) {
                        $response['exception'] = 'Format phone number is incorrect';
                    } else if ($response['status'] == 1) {
                        $iduser = $staffquery->getLastUser();
                        if (!$staff->setUser($iduser)) {
                            $response['exception'] = 'User incorrect';
                        } else if ($staff->getUser() < 0) {
                            $response['exception'] = 'User error';
                        } else if ($staffquery->store()) {
                            $response['status'] = 1;
                            $response['message'] = 'User and staff registred correctly';
                        } else {
                            $response['exception'] = Connection::getException();
                            $response['status'] = 2;
                            $response['message'] = 'Only user registred correctly';
                        }
                    }
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            case 'logOut':
                //si se pudo eliminar la sesión
                if (session_destroy()) {
                    $response['status'] = 1;
                    $response['message'] = 'Log out process correct';
                } else {
                    $response['exception'] = 'Something wrong to log out';
                }

                break;

            case 'getUser':

                // if (isset($_SESSION['username'])) {
                //     $response['status'] = 1;
                //     $response['username'] = $_SESSION['username'];
                // } else {
                //     $response['exception'] = 'Undefined username';
                // }

                break;

            case 'readProfile':



                break;

            case 'editProfile':



                break;

            case 'changePassword':



                break;

            case 'all':
                //si existe un valor al intentar recuperar los registros
                //asignarlo al 'dataset'
                if ($response['dataset'] = $staffquery->all()) {
                    $response['status'] = 1;
                    $response['message'] = '';
                } elseif (Connection::getException()) {
                    $response['exception'] = Connection::getException();
                } else {
                    $response['exception'] = "Doesn't exist register";
                }

                break;

            case 'search':



                break;

            case 'one':
                //sí no existe un 'id_staff'
                if (!$_POST['id_staff']) {
                    $response['exception'] = 'Error to get staff';
                } else {
                    //si existe un valor al intentar recuperar los registros
                    //asignarlo al 'dataset'
                    if ($response['dataset'] = $staffquery->row($_POST['id_staff'])) {
                        $response['status'] = 1;
                    } elseif (Connection::getException()) {
                        $response['exception'] = Connection::getException();
                    } else {
                        $response['exception'] = "This register doesn't exist";
                    }
                }

                break;

            case 'update':
                


                break;

            case 'delete':




                break;
            default:
                $response['exception'] = 'This action is disable in session';
        }
    } else {
        //acciones que puede realizar cuando no ha iniciado sesión
        switch ($_GET['action']) {
            case 'login':

                //validar que el $_POST no traiga espacio demás
                $_POST = Validate::form($_POST);
                if ($userquery->validateUser($_POST['username'], $_POST['password']) == -1) {
                    $response['exception'] = 'User no registred';
                } elseif ($userquery->validateUser($_POST['username'], $_POST['password'] == 0)) {
                    $response['exception'] = 'Incorrect password';
                } else {
                    $response['status'] = 1;
                    $response['message'] = 'Authenticate Correct';
                    //crear  una sesión con el id usuario recuperado
                    $_SESSION['id_user'] = $user->getID();
                    $_SESSION['username'] = $user->getUsername();
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
} else {
    print(json_encode('Action dissable'));
}
