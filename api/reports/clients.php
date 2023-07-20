<?php 
// Se agrega la clase con las plantillas que generan los reportes
require_once('../../api/helpers/reports.php');
// Se agregan las clases para el acceso y transferencias de datos.
require_once('../../api/entities/transfers/client.php');
require_once('../../api/entities/access/client.php');

//
$pdf = new Report;
//
$pdf->reportHeader('Customer users.');
//
$client = new Client;
$clients = new ClientQuery;
//
if ($dataClients = $clients->all()) {
    //
    $pdf->SetFillColor(175);
    //
    $pdf->SetFont('Times', 'B', 11);
    //
    $pdf->cell(62, 10, 'Username', 1, 0, 'C', 1);
    $pdf->cell(62,  10, 'Name client', 1, 0, 'C', 1);
    $pdf->cell(62, 10, 'phone', 1, 0, 'C', 1);

    //
    $pdf->SetFillColor(225);
    //
    $pdf->SetFont('Times', 'B', 11);

    //
    foreach ($dataClients as $rowClients) {
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['username']), 1, 0);
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['names'] . ' ' . $rowClients['last_names']), 1, 0);
        $pdf->cell(62, 10, $rowClients['phone'], 1, 0);
    }
}else{
    $pdf->cell(0, 10, $pdf->stringEncoder('No clients to show.'));
}
//
$pdf->Output('I', 'clients.pdf');