<?php
//archivo con métodos para validar los datos recibidos
require_once('../../helpers/validate.php');

//const. con la instancia de la clase para utilizar los attr sin crear varios objs.
const STAFF = new Staff;
//clase con los datos de transferencia
class Staff
{
    //attr con las columnas de la tabla staffs
    public $id = null;

    public $names = null;

    public $lastnames = null;

    public $document = null;

    public $phone = null;

    public $user = null;

    /**
     * Métodos para obtener los datos (setter) y enviar datos (getter)
     * set...($param): validar el valor y asignar al attr
     * get... : retorna el valor del attr
     */

    public function setId($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->id = $id;
            return true;
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function setNames($names)
    {

        if (Validate::checkAlphabetic($names, 1, 25)) {
            $this->names = $names;
            return true;
        }
    }

    public function getNames()
    {
        return $this->names;
    }

    public function setLastNames($lastnames)
    {
        if (Validate::checkAlphabetic($lastnames, 1, 25)) {
            $this->lastnames = $lastnames;
            return true;
        }
    }

    public function getLastNames()
    {
        return $this->lastnames;
    }

    public function setDocument($document)
    {
        if (Validate::checkDUI($document)) {
            $this->document = $document;
            return true;
        }
    }

    public function getDocument()
    {
        return $this->document;
    }

    public function setPhone($phone)
    {
        if (Validate::checkPhone($phone)) {
            $this->phone = $phone;
            return true;
        }
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function setUser($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->user = $id;
            return true;
        }
    }

    public function getUser()
    {
        return $this->user;
    }
}
