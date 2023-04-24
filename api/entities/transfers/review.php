<?php
// archivo para validaciones
require_once('../../helpers/validate.php');

// intancia de la clase review con los datos de transferencia
const REVIEW = new Review;

// clase con los datos de transferencia
class Review
{

    // col de la tabla 'reviews'
    public $idreview = null;

    public $comment = null;

    public $id_detail_order = null;

    // attrs para validar que exista el detalle de la orden según el "cliente"
    public $idproduct = null;

    public $idorder = null;

    public $idclient = null;

    /**
     * Métodos getter y setter según los attrs declarados
     * get programador recibe datos
     * set programador envia datos y los asigna al attr
     * $param en setter, valida el tipo de dato que sea valido
     */
    public function setIdReview($review)
    {
        if (Validate::checkNaturalNumber($review)) {
            $this->idreview = $review;
            return true;
        }
    }

    public function getIdReview()
    {
        return $this->idreview;
    }

    public function setComment($comment)
    {
        if (Validate::checkString($comment, 1, 100)) {
            $this->comment = $comment;
            return true;
        }
    }

    public function getComment()
    {
        return $this->comment;
    }

    public function setIdDetailOrder($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->id_detail_order = $id;
            return true;
        }
    }

    public function getIdDetailOrder()
    {
        return $this->id_detail_order;
    }

    public function setIdProduct($idproduct)
    {
        if (Validate::checkNaturalNumber($idproduct)) {
            $this->idproduct = $idproduct;
            return true;
        }
    }

    public function getIdProduct()
    {
        return $this->idproduct;
    }

    public function setIdOrder($idorder)
    {
        if (Validate::checkNaturalNumber($idorder)) {
            $this->idorder = $idorder;
            return true;
        }
    }

    public function getIdOrder()
    {
        return $this->idorder;
    }

    public function setIdClient($idclient)
    {
        if (Validate::checkNaturalNumber($idclient)) {
            $this->idclient = $idclient;
            return true;
        }
    }

    public function getIdClient()
    {
        return $this->idclient;
    }
}
