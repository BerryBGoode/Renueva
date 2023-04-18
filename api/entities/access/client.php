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

    /**
     * Método para recueperar los datos solicitados según la vista seleccionada
     * $id cliente seleccionado
     * retorna en un arreglo con los datos solicitados según $id
     */
    public function one($id)
    {
        $sql = 'SELECT * FROM clients_user WHERE id_client = ?';
        $param = array($id);
        return Connection::row($sql, $param);
    }

    /**
     * Método para actualizar los datos según envió
     * retorna el resultado del proceso
     */
    public function change(){

        //const. de la clase Client con los datos de transferencia
        $client = CLIENT;
        $sql = 'UPDATE clients 
        SET names = ?, last_names = ?, document = ?, phone = ?, address = ?
        WHERE id_client = ?';
        $params = array(
            $client->getNames(), $client->getLastNames(), $client->getDocument(),
            $client->getPhone(), $client->getAddress(), $client->getId(),
        );

        return Connection::storeProcedure($sql, $params);
    }
}
