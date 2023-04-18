<?php
//archivo con los método con los que se puede validar los datos recibidos
require_once('../../helpers/validate.php');
//const. con la instancia de la clase para poder utilizar de manera general
//los attrs de transferencia
const CLIENT = new Client;

//clase con los datos de transferencia para cliente
class Client
{

    //attr con las col. de la tabla clients
    public $id = null;

    public $names = null;

    public $lastnames = null;

    public $document = null;

    public $phone = null;
    

    public $address = null;

    public $user = null;

    /**
     * Métodos getter y setter según los attrs declarados
     * get programador recibe datos
     * set programador envia datos y los asigna al attr
     * $param en setter, valida el tipo de dato que sea valido
     */

    //definir no. caracter min y max cuando es un alphanumerico
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
        if (Validate::checkAlphanumeric($names, 1, 25)) {
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

    public function setAddress($address)
    {
        if (Validate::checkString($address, 1, 100)) {
            $this->address = $address;
            return true;
        }
    }

    public function getAddress()
    {
        return $this->address;
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
