<?php
// The class with the templates that generate the reports is added
require_once('../helpers/reports.php');
// The classes for access and data transfers are added.
require_once('../entities/transfers/order.php');
require_once('../entities/transfers/client.php');

// Initialize class to create report
$pdf = new Report;
// The report is started by the header of the doc.
$pdf->reportHeader('Customer information');
//The Client model is instantiated to obtain the data
$client = new ClientQuery;
//Check if there are records that are displayed, if not, print a message.
if ($dataClients = $client->all()) {
    //Set a fill color in the headers
    $pdf->SetFillColor(175);
    // Set the font for the headers
    $pdf->SetFont('Times', 'B', 11);
    //Print cells with headers
    $pdf->cell(116, 10, 'name client', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Date Order', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

    // A background tone is assigned to display the section title.
    $pdf->SetFillColor(225);
    // The font for the article information is defined.
    $pdf->SetFont('Times', 'B', 11);
    
    // Iterate through the records one by one.
    foreach ($dataClients as $rowClients) {
        // A cell with the title of the section is displayed.
        $pdf->cell(0, 10, $pdf->stringEncoder('Client: ' . $rowClients['names']), 1, 1, 'C', 1);
        // An instance of the Orders model is created to process the information.
        $order = new Order;
        $orders = new OrderQuery;
        // The section is assigned to get the corresponding articles. Otherwise, an error message is displayed.
        if ($order->setClient($rowClients['id_client'])) {
            // Check if there are records available to display. Otherwise, a message is displayed.
            if ($dataOrder = $orders->ClientOrders()) {
                // Iterate over the records row by row
                foreach ($dataOrders as $rowOrders) {
                    // The cells with the information of the articles are shown.
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
// The footer() method is automatically called and the document is sent to the web browser
$pdf->output('I', 'orders.pdf');

