<?php
require_once('../../helpers/report.php');
require_once('../../entities/access/order.php');

$pdf = new Report;
$pdf->reportHeader('Details of order');
$details = new OrderQuery;
if (!$_SESSION['order']) {
    session_start();
    # code...
}
// print_r($_SESSION['order']);
if ($datadetails = $details->getDetailsAtOrder($_SESSION['order'])) {
    $pdf->SetFillColor(175);
    $pdf->Cell(10, 10, '#', 1, 0, 'C', 1);
    $pdf->Cell(45.18, 10, 'Product', 1, 0, 'C', 1);
    $pdf->Cell(25.18, 10, 'Unit price', 1, 0, 'C', 1);    
    $pdf->Cell(35.18, 10, 'Quantity', 1, 0, 'C', 1);
    $pdf->Cell(35.19, 10, 'Subtotal', 1, 0, 'C', 1);
    $pdf->Cell(35.18, 10, 'Date', 1, 1, 'C', 1);
    $num = 1;
    foreach ($datadetails as $detail) {
        $pdf->Cell(10, 10, $num, 1, 0, 'C');
        $pdf->Cell(45.18, 10, $pdf->stringEncoder($detail['name']), 1, 0, '');
        $pdf->Cell(25.18, 10, '$'. $pdf->stringEncoder($detail['price']), 1, 0, '');        
        $pdf->Cell(35.18, 10, $pdf->stringEncoder($detail['cuantitive']), 1, 0, 'C');
        $pdf->Cell(35.18, 10, '$'. $pdf->stringEncoder($detail['total']), 1, 0, '');
        $pdf->Cell(35.18, 10, $pdf->stringEncoder($detail['date_order']), 1, 1, '');
    }
}else{
    $pdf->Cell(0 ,10, $pdf->stringEncoder('Order not found'), 1, 1, 'C');
}

$pdf->Output('I', 'details.pdf');
?>