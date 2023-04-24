<?php
// archivo con los procedimientos de la conexión
require_once('../../helpers/connection.php');

// clase con los queries
class ReviewQuery
{

    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */

    /**
     * Método para obtener el documentos de todos los clientes
     */
    public function getDocumentClient()
    {
        $sql = 'SELECT id_client, document FROM clients';
        return Connection::all($sql);
    }

    /**
     * Método para cargar los datos para identificar al cliente según el documento
     * $docoment, documento seleccionado por el cliente
     * retorna en un arreglo los resultados de la consulta
     */
    public function getClient($client)
    {
        $sql = 'SELECT * FROM clients_user WHERE id_client = ?';
        $param = array($client);
        return Connection::row($sql, $param);
    }

    /**
     * Método para verficar sí existe un detalle con el producto, No. de orden recibido
     * también se obtiene el cliente
     * $product producto seleccionado, $order orden seleccionada
     * retorna el id del detalle
     */
    public function checkDetail($product, $order)
    {
        $sql = 'SELECT id_detail_order FROM detail_orders WHERE id_product = ? AND id_order = ?';
        $params = array($product, $order);
        return Connection::row($sql, $params);
    }

    /**
     * Método para guardar datos
     * retorna el resultado del proceso
     */
    public function store()
    {

        // instancia de la clase reviews
        $review = REVIEW;
        $sql = 'INSERT INTO reviews(comment, id_detail_order) VALUES (?, ?)';
        $params = array($review->getComment(), $review->getIdDetailOrder());
        return Connection::storeProcedure($sql, $params);
    }
}
