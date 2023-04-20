<?php
// archivo con los datos de transferencia
require_once('../../entities/transfers/product.php');
// archivo con los queries
require_once('../../entities/access/product.php');

$response = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);

if (!isset($_GET['action'])) {
    $response['exception'] = "Doesn't exist action";
} else {

    // reanudar la sesión para poder utilizar las var. de sesión
    session_start();

    // verificar existencia de una sesión de administrador
    // id_user según la db.
    if (!isset($_SESSION['id_user'])) {
        $response['exception'] = 'Action denied';
    } else {

        // instancia de las clase con los attrs
        $product = PRODUCT;
        // instancia de la clase con los queries
        $query = new ProductQuery;


        // verificar la acción con un switch
        switch ($_GET['action']) {

            case 'load':
                //verificar si se han enviado datos
                if ($_POST) {

                    if ($response['dataset'] = $query->loadAll($_POST['object'])) {
                        $response['status'] = 1;
                    } else {
                        $response['exception'] = Connection::getException();
                    }
                }

                break;

            case 'loadTable':

                if ($response['dataset'] = $query->all()) {
                    $response['status'] = 1;
                    // $response['message'] = count($response['dataset']) . ' existentes';
                } else {
                    $response['exception'] = Connection::getException();
                }

                break;
            case 'create':

                // validar los datos del form
                $_POST = Validate::form($_POST);
                $response['dataset'] = $_POST;
                // verificar si tiene formato correcto según cada dato que se ingrese
                if (!$product->setName($_POST['product'])) {
                    $response['exception'] = 'Name incorrect';
                } elseif (!$product->setDescription($_POST['description'])) {
                    $response['exception'] = 'Description incorrect';
                } elseif (!$product->setCategory($_POST['categories'])) {
                    $response['exception'] = 'Select one category';
                } elseif (!$product->setState($_POST['states_products'])) {
                    $response['exception'] = 'Select one state';
                } elseif (!$product->setPrice($_POST['price'])) {
                    $response['exception'] = 'Price format incorrect';
                } elseif (!$product->setStock($_POST['stock'])) {
                    $response['exception'] = 'Stock invalid';
                }       // verificar que se subio un archivo al form ('image': input name), ('tmp_name': nombre temporal)
                elseif (!is_uploaded_file($_FILES['image']['tmp_name'])) {
                    $response['exception'] = 'Select one image';
                } elseif (!$product->setImage($_FILES['image'])) {
                    $response['exception'] = Validate::getErrorFile();
                } elseif ($query->store()) {
                    $response['status'] = 1;
                    // guardar archivo en la api
                    if (Validate::storeFile($_FILES['image'], $product->getPath(), $product->getImage())) {
                        $response['message'] = 'Data was successfully registred';
                    } else {
                        $response['message'] = "Data was successfully registred, but the imagen doesn't save";
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
