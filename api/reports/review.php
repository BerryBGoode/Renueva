<?php
//
require_once('../helpers/reports.php');
//
require_once('../entities/access/review.php');
require_once('../entities/transfers/review.php');
require_once('../entities/access/product.php');

//
$pdf = new Report;
//
$pdf->reportHeader('Customer feedback');
//
$product = new ProductQuery;
//
if ($dataProducts = $product->all()) {
    //
    $pdf->SetFillColor(175);
    //
    $pdf->SetFont('Times', 'B', 11);
    //
    $pdf->cell(76, 10, 'Username', 1, 0, 'C', 1);
    $pdf->cell(110,  10, 'Comment', 1, 0, 'C', 1);

    //
    $pdf->SetFillColor(225);
    //
    $pdf->SetFont('Times', 'B', 11);

    //
    foreach ($dataProducts as $rowProducts) {
        //
        $pdf->cell(0, 10, $pdf->stringEncoder('Products: ' . $rowProducts['name']), 1, 1, 'C', 1);
        //
        $review = new Review;
        $reviews = new ReviewQuery;
        //
        if ($review->setIdProduct($rowProducts['id_product'])) {
            //
            if ($dataReviews = $reviews->all()) {
                //
                foreach ($dataReviews as $rowReviews) {
                    //
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
//
$pdf->output('I', 'review.pdf');
