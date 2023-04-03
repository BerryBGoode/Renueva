<?php
//archivo con las transaciones SQL
require_once('../../helpers/connection.php');
require_once('../transfers/user.php');

class UserQuery
{
    //attr tipo objeto de la clase user con los datos de transferencia (getter and setter)
    protected $user = null;
    //Clase para manejar los querys de los distintos objetos SQL 

    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */

    /**
     * Método para agregar un nuevo cliente
     */
    public function store()
    {
        //instanciar el objeto de la clase 'User'
        $user = new User();
        $user->setUsername('Fernando');
        $user->setPassword('1234567');
        $user->setEmail('21321313@gmail.com');
        // $user->setPhoto(null);
        $user->setTypeUser(1);
        //declarar var con el query
        $sql = 'INSERT INTO users(username, password, email, id_type_user) VALUES (?, ?, ?, ?)';
        //declara los parametros con arreglo con los get de cada dato del INSERT. El origen de estos es el objeto de la clase
        $params = array($user->getUsername(), $user->getPassword(), $user->getEmail(), $user->getTypeUser());
        //retornar el resultado del procedimiento, enviandole los parametros de la función
         Connection::storeProcedure($sql, $params);
    }
}

