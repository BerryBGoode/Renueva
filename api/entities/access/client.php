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
     */
    public function store()
    {
        //const. de la clase Client con los datos de transferencia
        $client = CLIENT;
        $sql = 'INSERT INTO clients (names, last_names, document, phone, address, id_user) VALUES (?, ?, ?, ?, ?, ?)';
        $param = array($client->getNames(), $client->getLastNames(), $client->getDocument(), $client->getPhone(), $client->getAddress(), $client->getUser());
        return Connection::storeProcedure($sql, $param);
    }
}
