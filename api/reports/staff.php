<?php
//
require_once('../../api/helpers/reports.php');
//
require_once('../../api/entities/access/staff.php');
require_once('../../api/entities/transfers/staff.php');

//
$pdf = new Report;
//
$pdf->reportHeader('Staff users.');
//
$staff = new Staff;
$staffs = new StaffQuery;
//
if ($dataStaff = $staffs->all()) {
    //
    $pdf->SetFillColor(175);
    //
    $pdf->SetFont('Times', 'B', 11);
    //
    $pdf->cell(62, 10, 'Username', 1, 0, 'C', 1);
    $pdf->cell(62,  10, 'Name client', 1, 0, 'C', 1);
    $pdf->cell(62, 10, 'phone', 1, 0, 'C', 1);

    //
    $pdf->SetFillColor(225);
    //
    $pdf->SetFont('Times', 'B', 11);

    //
    foreach ($dataStaff as $rowStaff) {
        //
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['username']), 1, 0);
        $pdf->cell(62, 10, $pdf->stringEncoder($rowClients['names'] . ' ' . $rowClients['last_names']), 1, 0);
        $pdf->cell(62, 10, $rowClients['phone'], 1, 0);
    }
} else {
    $pdf->cell(0, 10, $pdf->stringEncoder('No staff to show.'));
}
//
$pdf->Output('I', 'staff.pdf');