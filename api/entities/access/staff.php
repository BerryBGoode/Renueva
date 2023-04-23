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
        INNER JOIN users u ON u.id_user = s.id_user
        ORDER BY s.id_staff ASC';
        return Connection::all($sql);
    }

    /**
     * Método para recuperar los datos de 1 "staff" seleccionado
     * retorna un arreglo con los datos
     */
    public function row($id)
    {
        $sql = 'SELECT u.id_user, u.username, s.names, s.last_names, s.document, s.phone, u.email
        FROM staffs s
        INNER JOIN users u ON u.id_user = s.id_user
        WHERE s.id_staff = ?';
        $param = array($id);
        return Connection::row($sql, $param);
    }

    /**
     * Método para cambiar los datos según el "staff" seleccionado
     * retorna si la query fue exitoso o si hubo un error
     */
    public function change()
    {
        //var. con la instancia de la clase stff con los attr
        $staff = STAFF;
        $sql = 'UPDATE staffs SET names = ?, last_names = ?, document = ?, phone = ? WHERE id_staff = ?';
        $params = array($staff->getNames(), $staff->getLastNames(), $staff->getDocument(), $staff->getPhone(), $staff->getId());
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Método para obtener los datos buscados
     * $staff valor recibido
     * retorna en un array los resultados de la consulta
     */
    public function search($staff)
    {
        $sql = 'SELECT u.id_user, u.username, s.names, s.last_names, s.document, s.phone, u.email
        FROM staffs s
        INNER JOIN users u ON u.id_user = s.id_user
        WHERE u.username ILIKE ? OR s.names ILIKE ? OR s.last_names ILIKE ?';
        $param = array("%$staff%", "%$staff%", "%$staff%");
        return Connection::all($sql, $param);
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
