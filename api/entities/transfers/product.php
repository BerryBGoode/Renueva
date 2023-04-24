<?php
// archivo con validaciones, para verificar el formato de los datos recibidos
require_once('../../helpers/validate.php');
//const. con la instancia de la clase Product
const PRODUCT = new Product;

//clase Product con los datos de transferencia
class Product
{

    //attrs. según el obj. de la bd.
    public $id = null;

    public $name = null;

    public $description = null;

    public $price = null;

    public $image = null;

    public $stock = null;

    public $category = null;

    public $state = null;
    //ruta donde se guardaran las img dentro del api
    public $path = '../../images/products/';

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

    public function setName($name)
    {
        if (Validate::checkAlphabetic($name, 1, 30)) {
            $this->name = $name;
            return true;
        }
    }

    public function getName()
    {
        return $this->name;
    }

    public function setDescription($desc)
    {
        if (Validate::checkAlphabetic($desc, 1, 200)) {
            $this->description = $desc;
            return true;
        }
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setPrice($price)
    {
        if (Validate::checkMoney($price)) {
            $this->price = $price;
            return true;
        }
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setImage($img)
    {
        if (Validate::checkImg($img, 600, 600)) {
            // asignar el nombre del archivo
            $this->image = Validate::getFilename();
            return true;
        }
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setStock($stock)
    {
        if (Validate::checkNaturalNumber($stock)) {
            $this->stock = $stock;
            return true;
        }
    }

    public function getStock()
    {
        return $this->stock;
    }

    public function setCategory($cat)
    {
        if (Validate::checkNaturalNumber(($cat))) {
            $this->category = $cat;
            return true;
        }
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function setState($state)
    {
        if (Validate::checkNaturalNumber($state)) {
            $this->state = $state;
            return true;
        }
    }

    public function getState()
    {
        return $this->state;
    }

    public function getPath()
    {
        return $this->path;
    }
}
