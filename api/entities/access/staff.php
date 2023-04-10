<?php
//archivo con los attr de transferencia 
require_once('../../entities/transfers/staff.php');
//archivo con los procedmientos cercanos a la base
require_once('../../helpers/connection.php');
//clase con las sentncias SQL
class StaffQuery
{
    //obj. const. de la clase Staff con los attr de transferencia
    //"$staff = STAFF;"

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
     * Método para agregar un nuevo registro
     * retorna el resultado dado por el procedimento con la base
     */
    public function store()
    {
        //const. instanciada de la clase Staff
        $staff = STAFF;
        $sql = 'INSERT INTO staffs(names, last_names, document, phone, id_user) 
        VALUES (?, ?, ?, ?, ?)';
        $params = array($staff->getNames(), $staff->getLastNames(), $staff->getDocument(), $staff->getPhone(), $staff->getUser());
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Método para cargar todos los registros según el query
     * retorna un arreglo con todos los registros recuperados
     */
    public function all()
    {
        $sql = 'SELECT s.id_staff, u.id_user, u.username, s.names, s.last_names, s.document, s.phone, u.email
        FROM staffs s
        INNER JOIN users u ON u.id_user = s.id_user';
        return Connection::all($sql);
    }
}
// $query = new StaffQuery;
// print_r(json_encode($query->all()));
// $staff = STAFF;
// $staff->setNames('Cristian');
// $staff->setLastNames('Mena');
// $staff->setDocument('12345678-9');
// $staff->setPhone('7836-0066');
// $staff->setUser($query->getLastUser());
// echo $query->store();
