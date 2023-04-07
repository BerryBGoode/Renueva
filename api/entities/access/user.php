<?php
//archivo con las transaciones SQL
require_once('../../helpers/connection.php');
require_once('../../entities/transfers/user.php');

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
        $user = new User;
        //declarar var con el query
        $sql = 'INSERT INTO users(username, password, email, id_type_user) VALUES (?, ?, ?, ?)';
        //declara los parametros con arreglo con los get de cada dato del INSERT. El origen de estos es el objeto de la clase
        $params = array($user->getUsername(), $user->getPassword(), $user->getEmail(), $user->getTypeUser());
        //retornar el resultado del procedimiento, enviandole los parametros de la función
        Connection::storeProcedure($sql, $params);
    }

    /**
     * Métodos para verificar que los datos ingresados (login)
     * $username nombre de usuario a loggearse, $password contraseña del usuario
     * retorna -1 si usuario no existe, 0 si a contraseña es incorrecta
     * 1 si todo es correcto
     */
    public function validateUser($username, $password){
        //instancia del obj tipo User con los attr 
        $user = new User;
        //query para validar sí existe un registro con el nombre de ese usuario
        $sql1 = 'SELECT id_user
        FROM users 
        WHERE username  = ?';
        $param1 = array($username);
        //resulta es igual a los datos que retorne ese query
        $result1 = Connection::row($sql1, $param1);
        if($result1){
            $user->setID($result1['id_user']);//enviar id para sesion
            
        }else {
            return -1;
        }
    }

    

}


