<?php
//Se crea una clase para la conexion a la base de datos
class Connection
{
    class Connection
    {
        public $host = 'localhost';
        public $dbname = 'renuevaa';
        public $username = 'postgres';
        public $password = 'alvaradolira';
    
        public static function getConnection()
        {
            try {
                $connection = new Connection();
                $pdo = new PDO("pgsql:host=$connection->host; dbname=$connection->dbname", $connection->username, $connection->password);
                echo "connection success"; 
            } catch (PDOException $exp) {
                echo "Error: ", $exp;
            }
        }
    }
    
    Connection::getConnection();
}

Connection::getConnection();