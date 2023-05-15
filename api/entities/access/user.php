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
     * Método para obtener el último usuario
     * retorna el id del usuario
     */
    public function getLastUser()
    {
        $sql = 'SELECT MAX(id_user) as id_user FROM users';
        $result = Connection::row($sql);
        return $result['id_user'];
    }

    /**
     * método para obtener el id del tipo usuario a obtener
     * retorna un arreglo con los datos recuperados de la consulta
     */
    public function getTypeUser($type)
    {
        $sql = 'SELECT id_type_user FROM types_users WHERE type_user = ?';
        $param = array($type);
        return Connection::row($sql, $param);
    }

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
     * Método para verificar que los datos ingresados (login)
     * $username nombre de usuario a loggearse
     * retorna retorna el id del usuario
     */
    public function validateUser($username)
    {
        //$user igual a la constante con la instancia de la clase
        $user = USER;
        $admin = 1;
        //query para validar sí existe un registro con el nombre de ese usuario
        $sql = 'SELECT id_user
        FROM users 
        WHERE username  = ? AND id_type_user = ?';
        $param = array($username, $admin);
        //resulta es igual a los datos que retorne ese query
        $result = Connection::row($sql, $param);
        if ($result) {
            $user->setID($result['id_user']); //enviar id para sesion
            return true;
        }
    }

    /**
     * Método para verificar que la contraseña del usuario que se recupero sea igual a la que 
     * la que trae el front-end
     * $password texto plano traido de login
     * retorna el resultado del proceso
     */
    public function validatePassword($password)
    {
        //$user igual a la constante con la instancia de la clase
        $user = USER;
        $sql = 'SELECT password FROM users WHERE id_user = ?';
        $param = array($user->getID());
        $result = Connection::row($sql, $param);

        if (password_verify($password, $result['password'])) {
            //autenticación correcta
            return true;
        }
    }

    /**
     * Método para actualizar los datos posibles del usuario
     * retornar el resultado el proceso
     */
    public function change()
    {

        //instancia de la clase con los attr de users
        $user = USER;
        $sql = 'UPDATE users SET username = ?, email = ? WHERE id_user = ?';
        $params = array($user->getUsername(), $user->getEmail(), $user->getID());
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Método para eliminar "user" y como la claves extenriores (fk) están en cascada
     * elimina el "staff" que está ligado al "user"
     * $id, id del ususario a eliminar
     * retorna el resultado del proceso
     */
    public function destroy($id)
    {
        $sql = 'DELETE FROM users WHERE id_user = ?';
        $param = array($id);
        return Connection::storeProcedure($sql, $param);
    }
}

// echo $query->validateUser('Fer', 'Fer1234567');
