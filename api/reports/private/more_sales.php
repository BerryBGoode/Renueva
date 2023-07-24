<?php
// importar archivos importantes
require_once('../../helpers/report.php');
require_once('../../entities/access/product.php');

// instanciar clase para crear reportes
$pdf = new Report;
// definirle un titulo al reporte
$pdf->reportHeader('More sales products');

$pdf->SetFillColor(175);

$pdf->SetFont('Arial', 'B', 11);

$pdf->Cell(10, 10, '#', 1, 0, 'C', 1);
$pdf->Cell(90.9, 10, 'Name', 1, 0, 'C', 1);
$pdf->Cell(35, 10, 'Price (US$)', 1, 0, 'C', 1);
$pdf->Cell(50, 10, 'Sales', 1, 1, 'C', 1);
// instanciar para poder realizar el reporte con la info que se requiere
$query = new ProductQuery;
// verificar sí se encontraron productos consumidos

if ($dataProduct = $query->consumptionProduct()) {
    $num = 0;
    foreach ($dataProduct as $product) {
        // $pdf->SetFillColor(175);
        $num++;
        $pdf->Cell(10, 10, $num, 1, 0, 'C');
        $pdf->Cell(90.9, 10, $pdf->stringEncoder($product['name']), 1, 0);
        $pdf->Cell(35, 10, '$'.$product['price'], 1, 0);
        
        $pdf->Cell(50, 10, $pdf->stringEncoder($product['consumption']), 1, 1, 'C');
    }
}else{
    $pdf->cell(0, 10, $pdf->stringEncoder('no found sales'), 1, 1);
}
$pdf->Output('I', 'MoreSales.pdf');