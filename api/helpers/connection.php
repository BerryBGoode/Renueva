<?php
//Atributos de la conexión
//Servidor local
define('SERVER', '127.0.0.1');
//puerto (solo se utiliza este puerto para conectar con postgre)
define('PORT', '5432');
//base de datos
define('DATABASE', 'renueva');
//nombre de usuario postgresql
define('USERNAME', 'postgres');
//contraseña del usuario de postgre
//la contraseña debe ser cambiada según establecida en postgresql
define('PASSWORD', '123');
//definir la constante con define, texto es mayus. es el nombre de la constante
//y después el valor

class Connection
{

    //attributo estatico para ejecutar la conexión
    private static $connection = null;
    //attr para estatico para las sentencias SQL
    private static $sql = null;
    //atr estatico para los errores 
    private static $error = null;




    //MÉTODOS DEL SCRUD
    /**
     * !TODOS LOS MÉTODOS HACEN PRIMERO UN TESTING A LA CONEXIÓN Y SÍ OCURRE UN ERROR
     * !RETORNAN -1, RETORNAN 0 SÍ EXISTE ERROR EN EL 'try'
     */


    /*
     * método para insertar datos
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
        } catch (\Throwable $exep) {
            self::formatError($exep->getCode(), $exep->getMessage());
            //si algo está mal dentro del catch retornará 0
            return 0;
        }
    }

    /*
     * método para cargar todos los datos de una consulta sin parametros
     * $query sentencia SQL
     * $values valores que retorna la consulta
     * 
     */
    public static function all($query, $data = null)
    {
        if (self::storeProcedure($query, $data)) {
            return self::$sql->fetchAll(PDO::FETCH_ASSOC);
        }else {
            return false;
        }
    }

    /*
     * método para cargar todos los datos de una consulta con parametros
     * $query sentencia SQL
     * $values valores que retorna la consulta
     * 
     */
    public static function row($query, $data = null)
    {
        if (self::storeProcedure($query, $data)) {
            return self::$sql->fetch(PDO::FETCH_ASSOC);
        }else {
            return false;
        }
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
}
// $con = new Connection();
// // $query = 'INSERT INTO categories(category) VALUES (?)';
// // $data = array('a');
//$query = 'SELECT * FROM categories';
//print_r(Connection::all($query));
