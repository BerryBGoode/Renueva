<?php
require_once('../../helpers/report.php');

require_once('../../entities/access/order.php');

$pdf = new Report;

$pdf->reportHeader('Sales of years');

$orders = new OrderQuery;
if ($dataOrders = $orders->getSales()) {
    $pdf->SetFillColor(175);
    $pdf->Cell(10, 10, '#', 1, 0, 'C', 1);
    $pdf->Cell(87.95, 10, 'Month', 1, 0, 'C', 1);
    $pdf->Cell(87.95, 10, 'Sales', 1, 1, 'C', 1);
    $num = 1;
    foreach ($dataOrders as $sale) {
        $pdf->Cell(10, 10, $num, 1, 0, 'C');
        $pdf->Cell(87.95, 10, $pdf->stringEncoder($sale['month']), 1, 0, 'C') ;
        $pdf->Cell(87.95, 10, $pdf->stringEncoder($sale['sales']), 1, 1, 'C');
    }
}else{
    $pdf->Cell(0, 10, $pdf->stringEncoder('Sales not found'), 1, 1, 'C');
}
$pdf->Output('I', 'sales.pdf');
?>