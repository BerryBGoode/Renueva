<?php
//referencia al archivo con las validaciones de cada dato recibido del lado del cliente
require_once('../../helpers/validate.php');

//const. obj. de la clase 'Order' con los attrs de tranferencia
const ORDER = new Order;

//clase con los attrs, (getter y setter) de los respectivos attrs
class Order
{

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


    /**
     * Métodos para obtener los datos (setter) y enviar datos (getter)
     * set...($param): validar el valor y asignar al attr
     * get... : retorna el valor del attr
     */

    /**        ORDERS      **/
    public function setOrder($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->o_order = $id;
            return true;
        }
    }

    public function getOrder()
    {
        return $this->o_order;
    }

    public function setClient($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->o_client = $id;
            return true;
        }
    }

    public function getClient()
    {
        return $this->o_client;
    }

    public function setDate($date)
    {
        if (Validate::checkDate($date)) {
            $this->o_date = $date;
            return true;
        }
    }

    public function getDate()
    {
        return $this->o_date;
    }

    public function setState($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->o_state = $id;
            return true;
        }
    }

    public function getState()
    {
        return $this->o_state;
    }

    /**        DATEIL_ORDERS      **/
    public function setDetail($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->d_detail = $id;
            return true;
        }
    }

    public function getDetail()
    {
        return $this->d_detail;
    }

    public function setDOrder($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->d_order = $id;
            return true;
        }
    }

    public function getDOrder()
    {
        return $this->d_order;
    }

    public function setProduct($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->d_product = $id;
            return true;
        }
    }

    public function getProduct()
    {
        return $this->d_product;
    }

    public function setQuantity($quantity)
    {
        if (Validate::checkNaturalNumber($quantity)) {
            $this->d_quantity = $quantity;
            return true;
        }
    }

    public function getQuantity()
    {
        return $this->d_quantity;
    }
}
