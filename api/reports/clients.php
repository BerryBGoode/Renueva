<?php 
// The class with the templates that generate the reports is added
require_once('../../api/helpers/reports.php');
// The classes for access and data transfers are added.
require_once('../../api/entities/transfers/client.php');
require_once('../../api/entities/access/client.php');

// Initialize class to create report
$pdf = new Report;
// The report is started by the header of the doc.
$pdf->reportHeader('Customer users.');
//The Client model is instantiated to obtain the data
$client = new Client;
$clients = new ClientQuery;
//Check if there are records that are displayed, if not, print a message.
if ($dataClients = $clients->all()) {
    //Set a fill color in the headers
    $pdf->SetFillColor(175);
    // Set the font for the headers
    $pdf->SetFont('Times', 'B', 11);
    //Print cells with headers
    $pdf->cell(62, 10, 'Username', 1, 0, 'C', 1);
    $pdf->cell(62,  10, 'Name client', 1, 0, 'C', 1);
    $pdf->cell(62, 10, 'phone', 1, 0, 'C', 1);

    // A background tone is assigned to display the section title.
    $pdf->SetFillColor(225);
    // The font for the article information is defined.
    $pdf->SetFont('Times', 'B', 11);

    // Iterate over the records row by row.
    foreach ($dataClients as $rowClients) {
        // The cells with the information of the articles are shown.
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['username']), 1, 0);
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['names'] . ' ' . $rowClients['last_names']), 1, 0);
        $pdf->cell(62, 10, $rowClients['phone'], 1, 0);
    }
}else{
    $pdf->cell(0, 10, $pdf->stringEncoder('No clients to show.'));
}
// The footer() method is automatically called and the document is sent to the web browser
$pdf->Output('I', 'clients.pdf');