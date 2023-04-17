<?php
//archivo con los métodos para ejecutar procedimiento de almacenado
require_once('../../helpers/connection.php');
//archivo con los attr de transferencia
require_once('../../entities/transfers/client.php');

class ClientQuery
{

    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */


    /**
     * Método para guardar los datos del client
     * retorna el resultado del procedimiento
     */
    public function store()
    {
        //const. de la clase Client con los datos de transferencia
        $client = CLIENT;
        $sql = 'INSERT INTO clients (names, last_names, document, phone, address, id_user) VALUES (?, ?, ?, ?, ?, ?)';
        $param = array($client->getNames(), $client->getLastNames(), $client->getDocument(), $client->getPhone(), $client->getAddress(), $client->getUser());
        return Connection::storeProcedure($sql, $param);
    }

    /**
     * Método para recuperar los datos según la vista seleccionada
     * retorna en un arreglo los datos de la vista
     */
    public function all()
    {
        $sql = 'SELECT * FROM clients_user';
        return Connection::all($sql);
    }
}
