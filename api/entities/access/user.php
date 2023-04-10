<?php
//archivo con las sentencias SQL
require_once('../../helpers/connection.php');
require_once('../../entities/transfers/user.php');

class UserQuery
{
    //Clase para manejar los querys de los distintos objetos SQL 

    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */

    /**
     * Método para agregar un nuevo registro
     */
    public function store()
    {

        //$user igual a la constante con la instancia de la clase
        $user = USER;
        //$user->setTypeUser(1);
        //declarar var con el query
        $sql = 'INSERT INTO users(username, password, email, id_type_user/*, photo*/) VALUES (?, ?, ?, ?/*,?*/)';
        //declara los parametros con arreglo con los get de cada dato del INSERT. El origen de estos es el objeto de la clase
        $params = array($user->getUsername(), $user->getPassword(), $user->getEmail(), $user->getTypeUser()/*, $user->getPhoto()*/);
        //print_r($params);
        //retornar el resultado del procedimiento, enviandole los parametros de la función
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Métodos para verificar que los datos ingresados (login)
     * $username nombre de usuario a loggearse, $password contraseña del usuario
     * retorna -1 si usuario no existe, 0 si a contraseña es incorrecta
     * 1 si todo es correcto
     */
    public function validateUser($username, $password)
    {
        //$user igual a la constante con la instancia de la clase
        $user = USER;
        //query para validar sí existe un registro con el nombre de ese usuario
        $sql1 = 'SELECT id_user
        FROM users 
        WHERE username  = ?';
        $param1 = array($username);
        //resulta es igual a los datos que retorne ese query
        $result1 = Connection::row($sql1, $param1);
        if ($result1) {
            $user->setID($result1['id_user']); //enviar id para sesion

            $sql2 = 'SELECT password FROM users WHERE id_user = ?';
            $param2 = array($result1['id_user']);
            $result2 = Connection::row($sql2, $param2);
            if (password_verify($password, $result2['password'])) {
                //autenticación correcta
                return 1;
            } else {
                // existe usuario pero no contraseña // contraseña incorrecta
                return 0;
            }
        } else {
            //no existe usuario ni contraseña
            return -1;
        }
    }
}
// $query = new UserQuery;
// echo $query->validateUser('Fer', 'Fer1234567');
