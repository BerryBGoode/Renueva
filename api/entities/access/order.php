<?php
//archivo con los attr de transferencia 
require_once('../../entities/transfers/order.php');
//archivo con los procedmientos cercanos a la base
require_once('../../helpers/connection.php');


//clase con las sentncias SQL
class OrderQuery
{

    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */

    /**
     * Método para cargar los estados de una orden
     * retorna en un arreglo los datos recuperados 
     */
    public function getAllStates()
    {
        $sql = 'SELECT * FROM states_orders';
        return Connection::all($sql);
    }

    /**
     * Método para recupera todos los documentos de la tabla clientes
     * retorna en un array el id de los clientes y el documento de los clientes encontrados
     */
    public function getDocuments()
    {
        $sql = 'SELECT id_client, document FROM clients';
        return Connection::all($sql);
    }

    /**
     * Método para recuperar los datos necesarios del cliente según el documento seleccionado
     * retorna en un array los datos recuperados
     */
    public function getClient($document)
    {
        $sql = 'SELECT id_client, names, last_names, address FROM clients WHERE id_client = ?';
        $param = array($document);
        return Connection::row($sql, $param);
    }

    /**
     * Método para recuperar los productos que tengan estado disponible y que tengan 1 o más existencias
     * retorna en un array el id del producto y el nombre
     */
    public function getProductAvailable()
    {
        $sql = 'SELECT id_product, name FROM products WHERE id_state_product = 1 AND stock >= 1';
        return Connection::all($sql);
    }

    /**
     * Método para recuperar el id de las ordenes
     * retorna los id recuperados
     */
    public function getIdOrder()
    {
        $sql  = 'SELECT id_order FROM orders';
        return Connection::all($sql);
    }

    /**
     * Método para agregar una orden
     */
    public function storeOrder()
    {
        //var. = a la const. con la instancia de la clase 'order' con los datos de transferencia
        $order = ORDER;
        // agregar orden a la tabla order
        $sql = 'INSERT INTO orders(id_client, date_order, id_state_order) VALUES (?, ?, ?)';
        $param = array($order->getClient(), $order->getDate(), $order->getState());
        return Connection::storeProcedure($sql, $param);
    }

    /**
     * Método para obtener el ID del último registro de la tabla orders 
     */
    public function getLastOrder()
    {
        //obtener la última orden
        //seleccionar el 'id_order' de la tabla orders y ordenar de manera descendente y seleccionar solamente
        //primer registro
        $sql = 'SELECT id_order FROM orders ORDER BY id_order DESC LIMIT 1';
        return Connection::row($sql);
    }

    /**
     * Método para agregar un detalle
     */
    public function storeDetail()
    {
        //var. = a la const. con la instancia de la clase 'order' con los datos de transferencia
        $order = ORDER;
        //verificar si es una nueva orden            
        //agregar detalle a la tabla 'detail_orders'
        $sql = 'INSERT INTO detail_orders(id_order, id_product, cuantitive) VALUES (?, ?, ?)';
        $param = array($order->getDOrder(), $order->getProduct(), $order->getQuantity());
        return Connection::storeProcedure($sql, $param);
    }

    /**
     * Método para cargar todos los registros según el query
     * $object es el nombre de la vista o tabla que selecciona todo
     * retorna un arreglo con todos los registros recuperados
     */
    public function all($object)
    {
        $sql = 'SELECT * FROM ' . $object;
        return Connection::all($sql);
    }

    /**
     * Método para obtener los datos del detalle seleccionado
     * $object, nombre de la vista o tabla a seleccionar
     * $id, detalle seleccionado
     * retorna un arreglo con los datos recuperados
     */
    public function row($id, $object)
    {
        $sql = 'SELECT * FROM ' . $object . ' WHERE id_detail_order = ?';
        $param = array($id);
        return Connection::row($sql, $param);
    }

    /**
     * Método para actualizar los datos de la orden seleccionada
     * retorna el resultado del procedimiento
     */
    public function changeOrder()
    {
        //var. = a la const. con la instancia de la clase 'order' con los datos de transferencia
        $order = ORDER;
        $sql = 'UPDATE orders SET id_client = ?, date_order = ?, id_state_order = ? WHERE id_order = ?';
        $params = array($order->getClient(), $order->getDate(), $order->getState(), $order->getOrder());
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Método para actualizar datos del detalle
     * retorna el resultado de procedimiento
     */
    public function changeDetail()
    {
        //var. = a la const. con la instancia de la clase 'order' con los datos de transferencia
        $order = ORDER;
        $sql = 'UPDATE detail_orders SET id_order = ?, id_product = ?, cuantitive = ? WHERE id_detail_order = ?';
        $params = array($order->getDOrder(), $order->getProduct(), $order->getQuantity(), $order->getDetail());
        return Connection::storeProcedure($sql, $params);
    }
}
// /*cargar ordenes cuando agregue o actualize
// /*cargar No.Orders
// /*lógica para agregar:
// /* Agregar un orden (id_client, date_order, id_state_order)
// /* Agregar un detalle con esa orden
// $query = new OrderQuery;
// $order = ORDER;
// $order->setClient(8);
// $order->setDate('2023-02-02');
// $order->setState(2);
// $order->setOrder(1);
// echo $query->changeOrder();

// print_r($query->all('details_orders'));
// print_r($query->getLastOrder());
// print_r($query->getClient('1'));
// print_r( $query->getIdOrder());