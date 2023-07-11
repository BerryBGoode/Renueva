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
if (isset($_SESSION['id_user'])) {
    
} else {

    $userquery = new UserQuery;
    //acciones cuando no se a iniciado
    switch ($_GET['action']) {
        case 'login':
            //validar que el $_POST no traiga espacio demás
            $_POST = Validate::form($_POST);

            if (!$userquery->validateUser($_POST['username'])) {
                $response['exception'] = 'User no registred';
            } elseif ($userquery->validatePassword($_POST['password'])) {
                $response['status'] = 1;
                $response['message'] = 'Authenticate Correct';
                //crear una sesion con el id usuario recuperado
                $_SESSION['id_user'] = $user->getID();
                $_SESSION['username'] = $user->getUsername();
            } else {
                $response['exception'] = 'Password incorrect';
            }
            
            break;
        
        
        default:
            $response['exception'] = 'This Action is disable out sesion';           
    }
} 

//formato para mostrar el contenido
header('content-type: application/json; charset=utf-8');    
// print_r($response);
//resultado formato json y retorna al controlador
print(json_encode($response));