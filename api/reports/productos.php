<?php
// The class with the templates that generate the reports is added
require_once('../helpers/reports.php');
// The classes for access and data transfers are added.
require_once('../entities/transfers/product.php');
require_once('../entities/transfers/category.php');
require_once('../entities/access/product.php');

// Initialize class to create report
$pdf = new Report;
// The report is started by the header of the doc.
$pdf->reportHeader('Products by categories');
//The Category model is instantiated to obtain the data
$category = new CategoryQuery;
//Check if there are records that are displayed, if not, print a message.
if ($dataCategories = $category->all()) {
    //Set a fill color in the headers
    $pdf->SetFillColor(175);
    // Set the font for the headers
    $pdf->SetFont('Times', 'B', 11);
    //Print cells with headers
    $pdf->cell(126, 10, 'Name', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Price (US$)', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Description', 1, 1, 'C', 1);

    // A background tone is assigned to display the section title.
    $pdf->SetFillColor(225);
    // The font for the article information is defined.
    $pdf->SetFont('Times', 'B', 11);

    // Iterate through the records one by one.
    foreach ($dataCategories as $rowCategories) {
        // A cell with the title of the section is displayed.
        $pdf->cell(0, 10, $pdf->stringEncoder('Category: ' . $rowCategories['category']), 1, 1, 'C', 1);
        // An instance of the Product model is created to process the information.
        $product = new ProductQuery;
        $products = new Product;
        // The section is assigned to get the corresponding articles. Otherwise, an error message is displayed.
        if ($products->setCategory($rowCategories['id_category'])) {
            // Check if there are records available to display. Otherwise, a message is displayed.
            if ($dataProducts = $product->productCategory()) {
                // Iterate over the records row by row
                foreach ($dataProducts as $rowProduct) {
                    // The cells with the information of the articles are shown.
                    $pdf->cell(70, 10, $pdf->stringEncoder($rowProduct['name']), 1, 0);
                    $pdf->cell(30, 10, $rowProduct['price'], 1, 0);
                    $pdf->cell(86, 10, $pdf->stringEncoder(['description']), 1, 0);
                }
            } else {
                $pdf->cell(0, 10, $pdf->stringEncoder('There are no products in this category'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, $pdf->stringEncoder('The category does not exist or is incorrect'), 1, 1);
        }
    }
} else {
    $pdf->cell(0, 10, $pdf->stringEncoder('no categories found'), 1, 1);
}
// The footer() method is automatically called and the document is sent to the web browser
$pdf->output('I', 'product.pdf');