<?php
//archivo con los attr de transferencia 
require_once('../../entities/transfers/category.php');
//archivo con los procedmientos cercanos a la base
require_once('../../helpers/connection.php');
//clase con las sentncias SQL
class CategoryQuery
{
    //obj. const. de la clase Category con los attr de transferencia
    //"$category = CATEGORY ;"

    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */

    /**
     * Método para obtener el último usuario
     * retorna el id del usuario
     */
    public function store()
    {
        //const. instanciada de la clase Category
        $category = CATEGORY;
        $sql = 'INSERT INTO categories(category) 
        VALUES (?)';
        $params = array($category->getCategory());
        return Connection::storeProcedure($sql, $params);
    }
}
