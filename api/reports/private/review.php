<?php
// The class with the templates that generate the reports is added
require_once('../../helpers/report.php');
// The classes for access and data transfers are added.
require_once('../../entities/access/review.php');
require_once('../../entities/transfers/review.php');
require_once('../../entities/access/product.php');

// Initialize class to create report
$pdf = new Report;
// The report is started by the header of the doc.
$pdf->reportHeader('Customer feedback');
//The Product model is instantiated to obtain the data
$reviews = new ReviewQuery;
//Check if there are records that are displayed, if not, print a message.
if ($dataProducts = $reviews->getNoRepetProduct()) {
    //Set a fill color in the headers
    $pdf->SetFillColor(175);    
    // Iterate through the records one by one.
    foreach ($dataProducts as $rowProducts) {
        
        $pdf->SetFillColor(175);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->cell(185.9, 10, $pdf->stringEncoder('Product: ' . $rowProducts['name']), 1, 1, 'C', 1);
        // Set the font for the headers
        //Print cells with headers
        $pdf->Cell(10, 10, '#', 1, 0, 'C', 1);
        $pdf->cell(70, 10, 'Client', 1, 0, 'C', 1);
        $pdf->cell(105.9,  10, 'Comment', 1, 1, 'C', 1);

        // A background tone is assigned to display the section title.
        $pdf->SetFillColor(225);
        // The font for the article information is defined.
        $pdf->SetFont('Arial', 'B', 10);
        // A cell with the title of the section is displayed.
        
        // An instance of the reviews model is created to process the information.

        // The section is assigned to get the corresponding articles. Otherwise, an error message is displayed.
        
        // Check if there are records available to display. Otherwise, a message is displayed.
        if ($dataReviews = $reviews->comments($rowProducts['id_product'])) {
            $num = 1;
            // Iterate over the records row by row
            foreach ($dataReviews as $rowReviews) {
                $pdf->SetFont('Arial', '', 10);
                // The cells with the information of the articles are shown.
                $pdf->Cell(10, 10, $num, 1, 0, 'C');
                $pdf->cell(70, 10, $pdf->stringEncoder($rowReviews['names'] . ' ' . $rowReviews['last_names']), 1, 0);
                $pdf->cell(105.9, 10, $pdf->stringEncoder($rowReviews['comment']), 1, 1);
                $num++;
            }
        } else {
            $pdf->cell(0, 10, $pdf->stringEncoder('There are no comments to show.'));
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->stringEncoder('There are no products to display.'));
}
// The footer() method is automatically called and the document is sent to the web browser
$pdf->output('I', 'review.pdf');
