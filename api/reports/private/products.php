<?php
// The class with the templates that generate the reports is added
require_once('../../helpers/report.php');
// The classes for access and data transfers are added.
require_once('../../entities/transfers/product.php');
require_once('../../entities/transfers/category.php');
require_once('../../entities/access/product.php');
// require_once('../helpers/validate.php');

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


    // Iterate through the records one by one.
    foreach ($dataCategories as $rowCategories) {
        $pdf->SetFillColor(175);
        // Set the font for the headers
    
        // A cell with the title of the section is displayed.
        $pdf->cell(0, 10, $pdf->stringEncoder('Category: ' . $rowCategories['category']), 1, 1, 'C', 1);

        $pdf->SetFont('Arial', 'B', 11);
        //Print cells with headers

        $pdf->cell(10, 10, '#', 1, 0, 'C', 1);
        $pdf->cell(75, 10, 'Name', 1, 0, 'C', 1);
        $pdf->cell(25, 10, 'Price (US$)', 1, 0, 'C', 1);
        $pdf->cell(75.9, 10, 'Description', 1, 1, 'C', 1);

        // A background tone is assigned to display the section title.
        $pdf->SetFillColor(225);
        // The font for the article information is defined.
        $pdf->SetFont('Arial', 'B', 10);

        // An instance of the Product model is created to process the information.
        $product = new ProductQuery;
        // The section is assigned to get the corresponding articles. Otherwise, an error message is displayed.        
        if (PRODUCT->setCategory($rowCategories['id_category'])) {
            // Check if there are records available to display. Otherwise, a message is displayed.
            if ($dataProducts = $product->productCategory()) {
                $num = 0;
                // Iterate over the records row by row
                foreach ($dataProducts as $rowProduct) {
                    // The cells with the information of the articles are shown.
                    $num++;
                    $pdf->cell(10, 10, $num, 1, 0, 'C');
                    $pdf->cell(75, 10, $pdf->stringEncoder($rowProduct['name']), 1, 0);
                    $pdf->cell(25, 10, '$'.$rowProduct['price'], 1, 0);                
                    $pdf->cell(75.9, 10, $pdf->stringEncoder($rowProduct['description']), 1, 1);
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
