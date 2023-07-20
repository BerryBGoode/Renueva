<?php
// Se agrega la clase con las plantillas que generan los reportes
require_once('../helpers/reports.php');
// Se agregan las clases para el acceso y transferencias de datos.
require_once('../entities/transfers/order.php');
require_once('../entities/transfers/client.php');

// Inicializar clase para crear reporte
$pdf = new Report;
// Se inicia el reporte por el encabezado del doc.
$pdf->reportHeader('Customer information');
//Se instancia el modelo de clients para obtener datos
$client = new ClientQuery;
//Verificar si existen registros, sino, imprimir un mensaje.
if ($dataClients = $client->all()) {
    //Se establece un color de relleno en los encabezados
    $pdf->SetFillColor(175);
    // Se establece la fuente para los encabezados
    $pdf->SetFont('Times', 'B', 11);
    //Imprimir celdas con encabezados
    $pdf->cell(116, 10, 'name client', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Date Order', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

    // Se asigna un tono de fondo para visualizar el título de la sección. 
    $pdf->setFillColor(225);
    // Se define el tipo de letra para la información de los artículos.
    $pdf->setFont('Times', '', 11);
    
    // Se iteran los registros uno por uno.
    foreach ($dataClients as $rowClients) {
        //
        $pdf->cell(0, 10, $pdf->stringEncoder('Client: ' . $rowClients['names']), 1, 1, 'C', 1);
        //
        $order = new Order;
        $orders = new OrderQuery;
        //
        if ($order->setClient($rowClients['id_client'])) {
            //
            if ($dataOrder = $orders->ClientOrders()) {
                //
                foreach ($dataOrders as $rowOrders) {
                    //
                    $pdf->cell(116, 10, $pdf->stringEncoder($rowOrders['names'] . ' ' . $rowClients['last_names']), 1, 0);
                    $pdf->cell(40, 10, $pdf->stringEncoder($rowOrders['date_order']), 1, 0);
                    $pdf->cell(30, 10, $pdf->stringEncoder($rowOrders['state_order']), 1, 0);
                }
            } else {
                $pdf->cell(0, 10, $pdf->stringEncoder('There are no orders placed by the customer'));
            }
        } else {
            $pdf->cell(0, 10, $pdf->stringEncoder('Wrong order or does not exist'));
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->stringEncoder('There are no customers to display'));
}
//
$pdf->output('I', 'orders.pdf');

