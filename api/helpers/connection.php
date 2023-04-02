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
    //objeto de la clase Connection para llamar métodos no estaticos
    private $con = null;
    //atr estatico para los errores 
    private static $error = null;



    /**
     * método para settear las attri de la conexión
     * a la db por la clase PDO
     */
    public static function settingConection()
    {
        try {
            //llamar al attr, por medio de "self" referirse a la clase
            //crear objeto de la clase PDO con los attr de la conexión
            self::$connection = new PDO('pgsql:host=' . SERVER . '; dbname=' . DATABASE . ';port=' . PORT, USERNAME, PASSWORD);
            //verificar por medio de los ERRMODE de PDO
            //si existe un error cambiarán los valores de estos attri
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return true;
        } catch (PDOException $ex) {
            $ex;
            return false;
        }
    }

    //MÉTODOS DEL SCRUD
    /**
     * TODOS LOS MÉTODOS HACEN PRIMERO UN TESTING A LA CONEXIÓN Y SÍ OCURRE UN ERROR
     * RETORNAN -1, RETORNAN 0 SÍ EXISTE ERROR EN EL 'try'
     */


    /*
     * método para insertar datos
     * este método retornará un int
     * $query es la sentencia de SQL
     * $data son los valores para el query
     * retorna -1 sí hubo error en la conexión y no ejecuta lo demás sí hay error de conexión,
     * 0 si existe un error en el código dentro del 'try...'
     * sino retorna los datos al realizar el 'store'
     */
    public function storeProcedure($query, $data)
    {
        try {
            //sí algo salió mal en la conexión el método se cerrará y retornará -1
            if (!Connection::settingConection()) {
                return -1;
            }
            //sino hara el proceso de almacenado
            //preparando la sentencia INSERT 
            self::$sql = self::$connection->prepare($query);
            //ejecutar el query con los datos y retornar el resultado
            return self::$sql->execute($data);
        } catch (\Throwable $th) {
            echo $th;
            //si algo está mal dentro del catch retornará 0s
            return 0;
        }
    }

    /*
     * método para cargar todos los datos de una consulta sin parametros
     * $query sentencia SQL
     * $values valores que retorna la consulta
     * 
     */
    public function allRows($query, $data = null)
    {
        //instancia del objeto de la clase 'Connection'
        $con = new Connection;
        try {
            if (!Connection::settingConection()) {
                return -1;
            }
            if ($con->storeProcedure($query, $data)) {
                //retornar el valor de la rows encontradas según la sentencia establecida
                return self::$sql->fetchAll(PDO::FETCH_ASSOC);
            }            

        } catch (\Throwable $th) {
            return 0;
        }
    }
}
$con = new Connection();
// $query = 'INSERT INTO categories(category) VALUES (?)';
// $data = array('a');
//$query = 'SELECT * FROM categories';
print_r($con->allRows($query));
