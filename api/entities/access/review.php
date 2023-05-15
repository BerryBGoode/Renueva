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

    /**
     * Método para carga todas las reviews registradas
     * retorna en un array los datos recuperados
     */
    public function all()
    {
        $sql = 'SELECT * FROM all_reviews';
        return Connection::all($sql);
    }

    /**
     * Método para cargar los datos de la review según el registro seleccionado
     * $id id de la review seleccionada
     * retorna en un arreglo los datos recuperados
     */
    public function oneReview($id)
    {
        $sql = 'SELECT * FROM all_reviews WHERE id_review = ?';
        $param = array($id);
        return Connection::row($sql, $param);
    }

    /**
     * Método para actualizar los datos de la 'review' seleccionada
     * retorna el resultado del proces
     */
    public function change()
    {

        // instancia de la clase Review
        $review = REVIEW;
        $sql = 'UPDATE reviews SET comment = ?, id_detail_order = ? WHERE id_review = ?';
        $param = array($review->getComment(), $review->getIdDetailOrder(), $review->getIdReview());
        return Connection::storeProcedure($sql, $param);
    }

    /**
     * Método para eliminar una 'review'
     * $id id de la 'review' seleccionada
     * retorna el resultado del proceso
     */
    public function destroy($id)
    {
        $sql = 'DELETE FROM reviews WHERE id_review = ?';
        $param = array($id);
        return Connection::storeProcedure($sql, $param);
    }

    /**
     * Método para obtener las reviews de un producto
     * $product, producto seleccionado
     * retornar en un array los datos recuperados
     */
    public function comments($product)
    {
        $sql = 'SELECT * FROM all_reviews WHERE id_product = ?';
        $param = array($product);
        return Connection::all($sql, $param);
    }
}
