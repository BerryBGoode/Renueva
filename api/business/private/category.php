<?php
//archivos con los datos de transferencia (getter y setter) de category
require_once('../../entities/transfers/category.php');
//archivos con los queries de categorty
require_once('../../entities/access/category.php');
//array con que retirna el api y después de convertira a JSON
$response = array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'username' => null);

//var igual a una const. de la clase category con los attr de transferencia de datos
$category = CATEGORY;

//verificar sí existe la acción traida get
if (isset($_GET['action'])) {
    //empezar una sesión
    session_start();
    //obj. de la clase category con los queries
    $query = new CategoryQuery;
    //verficar si existe una sessión, así restrigir las acciones al tener una sesión activa        

    if (isset($_SESSION['id_user'])) {

        switch ($_GET['action']) {
            case 'create':
                //validar los datos que trae el formulario por medio del método $_POST con todos los datos
                $_POST = Validate::form($_POST);
                if (!$category->setCategory($_POST['category_name'])) {
                    $response['exception'] = 'action denegate';
                } elseif ($query->store()) {
                    $response['status'] = 1;
                    $response['message'] = 'Data was successfully registred';
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;

            default:
                # code...
                break;
        }
    } else {
        $response['exception'] = 'action denegate';
    }
    //formato para mostrar el contenido
    header('content-type: application/json; charset=utf-8');
    // print_r($response);
    //resultado formato json y retorna al controlador
    print(json_encode($response));
} else {
    print(json_encode('Action dissable'));
}
