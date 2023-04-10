<?php
//Se crea una clase para la conexion a la base de datos
class Connection
{
    //Se crean las variables
    public $host = 'localhost';
    public $dbname = 'renueva';
    public $port = '5432';
    public $user = 'postgres';
    public $password = 'alvaradolira';
    public $driver = 'pgsql';
    public $connect;

    //crear una fincion
    public static function getConnection()
    {
        //se crea el try-catch para verificar (ejecutandolo en el catch) si se realizó la conexión a la base.
        try {
            //hacemos una instancia de la clase "conexion"
            $conenection = Connection();
            //realiza un PDO en postgres 
            $connection->connect = new PDO("{$connection->driver}:host={$connection->host};port={$connection->port};dbname={$connection->dbname}", $connection->user, $conenection->password);
            $conenection->connect->setAtribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //return $conenection->connect;
            echo "connection success"; 
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}

Connection::getConnection();