<?php
//archivo con los attr de transferencia 

use JetBrains\PhpStorm\Internal\ReturnTypeContract;

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

    public function change()
    {
        //instancia de la clase con los attr de users
        $category = CATEGORY;
        $sql = 'UPDATE categories SET category = ? WHERE id_category = ?';
        $params = array($category->getcategory(), $category->getid_category());
        return Connection::storeProcedure($sql, $params);
    }

    public function destroy($id)
    {
        $sql = 'DELETE FROM categories WHERE id_category = ?';
        $param = array($id);
        return Connection::storeProcedure($sql, $param);
    }

    /**
     * Método para cargar datos en la tabla
     */
    public function all()
    {
        $sql = 'SELECT * FROM all_categories';
        return Connection::all($sql);
    }

    /**
     * Método para cargar los datos de una categoria seleccionada
     */
    public function one($id)
    {
        $sql = 'SELECT * FROM all_categories WHERE id_category = ?';
        $param = array($id);
        return Connection::row($sql, $param);
    }
}
