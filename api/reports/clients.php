<?php 
//
require_once('../../api/helpers/reports.php');
//
require_once('../../api/entities/transfers/client.php');
require_once('../../api/entities/access/client.php');

//
$pdf = new Report;
//
$pdf->reportHeader('Usuarios de clientes.');
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
    $pdf->cell(62, 10, 'Last name Client', 1, 0, 'C', 1);

    //
    $pdf->SetFillColor(225);
    //
    $pdf->SetFont('Times', 'B', 11);

    //
    foreach ($dataClients as $rowClients) {
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['username']), 1, 0);
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['names']), 1, 0);
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['last_names']), 1, 0);
    }
}else{
    $pdf->cell(0, 10, $pdf->stringEncoder('No hay clientes para mostrar'));
}
//
$pdf->Output('I', 'clients.pdf');