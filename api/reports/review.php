<?php
// The class with the templates that generate the reports is added
require_once('../helpers/reports.php');
// The classes for access and data transfers are added.
require_once('../entities/access/review.php');
require_once('../entities/transfers/review.php');
require_once('../entities/access/product.php');

// Initialize class to create report
$pdf = new Report;
// The report is started by the header of the doc.
$pdf->reportHeader('Customer feedback');
//The Product model is instantiated to obtain the data
$product = new ProductQuery;
//Check if there are records that are displayed, if not, print a message.
if ($dataProducts = $product->all()) {
    //Set a fill color in the headers
    $pdf->SetFillColor(175);
    // Set the font for the headers
    $pdf->SetFont('Times', 'B', 11);
    //Print cells with headers
    $pdf->cell(76, 10, 'Username', 1, 0, 'C', 1);
    $pdf->cell(110,  10, 'Comment', 1, 0, 'C', 1);

    // A background tone is assigned to display the section title.
    $pdf->SetFillColor(225);
    // The font for the article information is defined.
    $pdf->SetFont('Times', 'B', 11);

    // Iterate through the records one by one.
    foreach ($dataProducts as $rowProducts) {
        // A cell with the title of the section is displayed.
        $pdf->cell(0, 10, $pdf->stringEncoder('Products: ' . $rowProducts['name']), 1, 1, 'C', 1);
        // An instance of the reviews model is created to process the information.
        $review = new Review;
        $reviews = new ReviewQuery;
        // The section is assigned to get the corresponding articles. Otherwise, an error message is displayed.
        if ($review->setIdProduct($rowProducts['id_product'])) {
            // Check if there are records available to display. Otherwise, a message is displayed.
            if ($dataReviews = $reviews->all()) {
                // Iterate over the records row by row
                foreach ($dataReviews as $rowReviews) {
                    // The cells with the information of the articles are shown.
                    $pdf->cell(76, 10, $pdf->stringEncoder($rowReviews['names'] . ' ' . $rowReviews['last_names']), 1, 0);
                    $pdf->cell(110, 10, $pdf->stringEncoder($rowReviews['comment']), 1, 0);
                }
            } else {
                $pdf->cell(0, 10, $pdf->stringEncoder('There are no comments to show.'));
            }
        } else {
            $pdf->cell(0, 10, $pdf->stringEncoder('Incorrect or non-existent product.'));
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->stringEncoder('There are no products to display.'));
}
// The footer() method is automatically called and the document is sent to the web browser
$pdf->output('I', 'review.pdf');
