<?php
//llamar el archivo para validar datos ingresados del lado del cliente
include_once('../../helpers/validate.php');

class User
{

    //attr con los campos modificables de la tabla usuarios
    public $id = null;

    public $username = null;

    public $password = null;

    public $email = null;

    public $photo = null;

    public $typeuser = null;

    /**
     * * Métodos para obtener datos del lado del cliente y enviar datos al db (set, get)
     * * con los 'set' sirve para asignar el dato al attributo
     * *    recibe un dato según el campo a hacer referencia
     * *    valida el dato recibido
     * *    asignar al attr
     * *    retorna true si el dato es correcto (después de validarlo)
     * * con el 'get' sirve para obtener el dato y asignarselo a algo en posible caso
     * *    retornar lo que tiene el attr
     */


    public function setID($id)
    {
        if (Validate::checkNaturalNumber($id)) {
            $this->id = $id;
            return true;
        }
    }

    public function getID()
    {
        return $this->id;
    }

    public function setUsername($username)
    {
        if (Validate::checkAlphanumeric($username, 1, 15)) {            
            $this->username = $username;
            return true;
        }
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setPassword($password)
    {
        if (Validate::checkPassword($password)) {
            //la contraseña es igual al param "encriptado" con hashing de php para crear una nueva contraseña
            $this->password = password_hash($password, PASSWORD_DEFAULT);
            return true;
        }
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setEmail($email)
    {
        if (Validate::checkEmail($email)) {
            $this->email = $email;
            return true;
        }
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setPhoto($img)
    {
        if (!$img) {
            $this->photo = null;
            return true;
        }

        if (Validate::checkImg($img, 900, 900)) {
            $this->photo = Validate::getFilename();
            return true;
        }
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setTypeUser($id)
    {

        if (Validate::checkNaturalNumber($id)) {
            $this->typeuser = $id;
            return true;
        }
    }

    public function getTypeUser()
    {
        return $this->typeuser;
    }
}
