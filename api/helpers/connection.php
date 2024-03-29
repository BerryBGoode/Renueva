<?php
// archivo con los datos de la conexión
require_once 'data.config.php';

header('Access-Control-Allow-Origin: *');

class Connection
{

    //attributo estatico para ejecutar la conexión
    private static $connection = null;
    //attr para estatico para las sentencias SQL
    private static $sql = null;
    //atr estatico para los errores 
    private static $error = null;

    /*
     * método para hacer procedimiento de datos según el query enviado en el $query
     * este método retornará un int
     * $query es la sentencia de SQL
     * $data son los valores para el query
     * retorna 0 si existe un error en el código dentro del 'try...'
     * sino retorna los datos al realizar el 'store'
     */
    public static function storeProcedure($query, $data)
    {
        try {
            //llamar al attr, por medio de "self" referirse a la clase
            //crear objeto de la clase PDO con los attr de la conexión
            self::$connection = new PDO('pgsql:host=' . SERVER . '; dbname=' . DATABASE . ';port=' . PORT, USERNAME, PASSWORD);
            //sino hara el proceso de almacenado
            //preparando la sentencia INSERT 
            self::$sql = self::$connection->prepare($query);
            //ejecutar el query con los datos y retornar el resultado
            return self::$sql->execute($data);
        } catch (PDOException $exep) {
            //si algo está mal dentro del catch retornará 0
            return self::formatError($exep->getCode(), $exep->getMessage());;
        }
    }

    /**
     * método para cargar todos los datos de una consulta sin parametros (fetchAll)
     * $query sentencia SQL
     * $values valores que retorna la consulta
     * 
     */
    public static function all($query, $data = null)
    {
        if (self::storeProcedure($query, $data)) {
            return self::$sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    /**
     * método para cargar todos los datos de una consulta con parametros (fetch)
     * $query sentencia SQL
     * $values valores que retorna la consulta
     * 
     */
    public static function row($query, $data = null)
    {
        if (self::storeProcedure($query, $data)) {
            return self::$sql->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    /*
     * Método para obtener el id de la última fila agregada
     * $query en la consulta, $data son los parametros 
     * retorna el último id o 0 si ocurrio un problema
     */
    public static function getLastId($query, $data)
    {
        if (self::storeProcedure($query, $data)) {
            $id = self::$connection->lastInsertId();            
        }else {
            $id = 0;
        }
        return $id;
    }

    /*
     * Método para formatear los mensajes de error en una exepción
     * $type es el tipo de error y $msg el mensaje nativo de php (PDOExeption)
     * retorno $error o mensaje de error
     */
    public static function formatError($type, $msg)
    {
        //en dado caso el mensaje nativo se le asigna al error
        self::$error = $msg . PHP_EOL;
        //en caso de que el error nativo sea de algún tipo de tipo, establecido en el switch
        switch ($type) {
            case '7':
                //error con el servidor
                self::$error = 'Something is wrong in the server :(';
                break;
            case '42703':
                //error en algún campo de la sentencia
                self::$error = 'Field unknown';
                break;
            case '23505':
                //error de duplicación de clave en SQL
                self::$error = 'Primary key data already exist';
                break;
            case '42P01':
                //Entidad desconocida
                self::$error = 'Object or entitie unknwon';
                break;
            case '23503':
                //error de violación de llave foránea
                self::$error = 'Foreign key data already exists';
                break;
            default:
                //otro tipo de error en SQL
                self::$error = 'Something was wrong in the database';
                break;
        }
        return self::$error;
    }

    public static function getException()
    {
        return self::$error;
    }
}
// $con = new Connection();
// // $query = 'INSERT INTO categories(category) VALUES (?)';
// // $data = array('a');
//$query = 'SELECT * FROM categories';
//print_r(Connection::all($query));
