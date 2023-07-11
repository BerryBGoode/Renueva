<?php
//incluir clase que genera pdf, llamando a la librería
require_once('../../libraries/fpdf185/fpdf.php')

/**
 * Clase que define las plantillas de los reportes
 */
class report extends FPDF{

    //Constante que define la ruta de las vistas del sitio privado
    const PRIVATE_URL = 'http://localhost/renueva_temp/view/private/';
    //Propiedad que guarda el título para el reporte
    private $title = null;

    /*
     *  Método para iniciar el reporte con el encabezado del documento
     * Parámetro $title (título del reporte).
     * Sin retorno
     */

     public function reportHeader($title)
     {
        //Se establece la zona horaria que se quiere utilizar cuando se genere el documento del reporte
        ini_set('data.timezone', 'America/El_Salvador');
        //Se inicia una sesión o sigue la actual para poder utilizar variables de sesión en el reporte
        session_start();
        //Se verifica si se ha iniciado sesión en el sitio privado para generar el reporte, si no es así, se direcciona a la página principal.
        if (isset($_SESSION['id_user'])) {
            //Se asigna un título al documento a la propiedad de la clase.
            $this->title = $title;
            //Se esablece el título del documento (true = utf-8).
            $this->setTitle('Private - Report', true);
            //Se establecen margenes al documento en la parte izquierda, derecha y arriba.
            $this->setMargins(15, 15, 15);
            //Se añade una nueva págida al documento, de orientación vertical y en formato carta, llamando al método header().
            $this->addPage('p', 'letter');
            //Se define un alias para el número total de páginas que se muestre en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::PRIVATE_URL);
        }
     }
}