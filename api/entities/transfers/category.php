<?php
//archivo con métodos para validar los datos recibidos
require_once('../../helpers/validate.php');

//const. con la instancia de la clase para utilizar los attr sin crear varios objs.
const CATEGORY = new Category;
//clase con los datos de transferencia
Class Category
{
    //attr con las columnas de la tabla staffs
    public $id_category = null;

    public $category = null;

    /**
     * Métodos para obtener los datos (setter) y enviar datos (getter)
     * set...($param): validar el valor y asignar al attr
     * get... : retorna el valor del attr
     */

     public function setid_category($id_category)
     {
         if (Validate::checkNaturalNumber($id_category)) {
             $this->id_category = $id_category;
             return true;
         }
     }

     public function getid_category()
    {
        return $this->id_category;
    }

    public function setcategory($category)
    {

        if (Validate::checkAlphabetic($category, 1, 15)) {
            $this->category = $category;
            return true;
        }
    }

    public function getcategory()
    {
        return $this->category;
    }
}
?>