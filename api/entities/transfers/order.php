<?php
//referencia al archivo con las validaciones de cada dato recibido del lado del cliente
require_once('../../helpers/validate.php');

//const. obj. de la clase 'Order' con los attrs de tranferencia
const ORDER = new Order;

//clase con los attrs, (getter y setter) de los respectivos attrs
class Order{

    // attrs. de la entidad 'orders'
    public $o_order = null;

    public $o_client = null;

    public $o_date = null;

    public $o_state = null;

    // attrs. de la entidad 'detail_orders'
    public $d_detail = null;

    public $d_order = null;

    public $d_product = null;

    public $d_quantity = null;

}

?>