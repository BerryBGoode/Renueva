<?php
// archivo con los procesos con la bd.
require_once('../../helpers/connection.php');
// archivo con los datos de transferencia
require_once('../../entities/transfers/product.php');

// clase con los queries
class ProductQuery
{


    /******************************
     ****** S  C  R  U  D *********
     ******************************
     */

    /**
     * Método para cargar select's
     * $obj. tabla a seleccionar todos los datos
     * retorna un array con los datos
     */
    public function loadAll($obj)
    {
        $sql = 'SELECT * FROM ' . $obj;
        return Connection::all($sql);
    }

    /**
     * Método para carga la tabla
     */
    public function all()
    {
        $sql = 'SELECT * FROM products_states_categories';
        return Connection::all($sql);
    }

    /**
     * Método para guarda un producto
     * retorna el resultado del proceso
     */
    public function store()
    {

        //instancia de la clase Product
        $product = PRODUCT;
        $sql = 'INSERT INTO products(name, description, price, image, stock, id_category, id_state_product)
        VALUES (?, ?, ?, ?, ?, ?, ?)';
        $params = array(
            $product->getName(), $product->getDescription(), $product->getPrice(),
            $product->getImage(), $product->getStock(), $product->getCategory(), $product->getState()
        );
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Método para seleccionar los datos según el registro seleccionado
     * retorna un array con los datos recuperados
     */
    public function one($id)
    {
        $sql = 'SELECT * FROM products_states_categories WHERE id_product = ?';
        $param = array($id);
        return Connection::row($sql, $param);
    }

    /**
     * Método para actualizar datos en el registro seleccionado
     * retorna el resultado del proceso
     */
    public function change($img)
    {
        $product = PRODUCT;
        // verificar si se ha modificado la imagen para eliminar la ruta
        ($product->getImage()) ? Validate::destroyFile($product->getPath(), $img) : $product->setImage($img);

        $sql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ?, stock = ?, id_category = ?, id_state_product = ?
        WHERE id_product = ?';
        $params = array(
            $product->getName(), $product->getDescription(), $product->getPrice(), $product->getImage(),
            $product->getStock(), $product->getCategory(), $product->getState(), $product->getId()
        );
        return Connection::storeProcedure($sql, $params);
    }

    /**
     * Método para elimiar el producto seleccionado
     * $id es el id del producto seleccionado
     * retorna el resultado del proceso 
     */
    public function destroy($id)
    {
        $sql = 'DELETE FROM products WHERE id_product = ?';
        $param = array($id);
        return Connection::storeProcedure($sql, $param);
    }
}
