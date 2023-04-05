<?php
require_once('../../entities/transfers/user.php');
//referencia a la clase con la transferencia de datos (getter y setter)

//comprobar si no existe (isset) un acción por el método GET solicitada por el usuario
//el 'action' viene del controlador (el botton presionado)
if (!isset($_GET['action'])) {
    json_encode('Solicitud no registrada');
} else {
    //crear una sesión o reaundarla (necesario para realizar proceso que necesitan datos de la sesión)
    //session_start();
    //objeto de la clase user
    $user = new User();
    //arreglo para guardar lo que retorne los datos de transferencia y transacciones SQL (queries)
    $response = array('session' => 0, 'status' => 0, 'msg' => null, 'username' => null, 'datasetter' => null, 'execep' => null);
    //verificar si existe la sesión iniciar 
    //para poder administrar las acciones que puede realizar cuando ha iniciado sesión que cuando no
    //por el momento para avanzar el scrud de usuario solo cuando haya un sesión iniciada
    //if (isset($_SESSION['id_usuario'])) {

        //asignar 1 a la sesión porque existe una sesión
        //$response['session'] = 1;
        //como existe una sesión, verificar la acción que quiere tomar el usuario
        switch ($_GET['action']) {

                //para insertar
            case 'create':
                //validar los datos que trae el formulario por medio del método $_POST con todos los datos
                $_POST = Validate::form($_POST);             
                //enviando datos y validando datos
                //solo los casos incorrectos
                //$_POST['inputname']
                $user->setTypeUser(1); //solo tipo usuario 1 por testing
                $user->setPhoto(null);//solo por testing
                if (!$user->setUsername($_POST['username'])) {
                    $response['execep'] = 'Username incorrect';
                } elseif (!$user->setPassword($_POST['password'])) {
                    $response['execep'] = Validate::errorPassword();
                } elseif (!$user->setEmail($_POST['email'])) {
                    $response['execep'] = 'Email format incorrect';
                }else{
                    $response['execep'] = Connection::getExecption();
                }

                break;

            default:
                # code...
                break;
        }
    //}
    //formato para mostrar el contenido
    header('content-type: application/json; charset=utf-8');
    //resultado formato json y retorna al controlador
    json_encode($response);

}
