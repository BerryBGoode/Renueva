<?php
// Se agrega la clase con las plantillas que generan los reportes
require_once('../helpers/reports.php');
// Se agregan las clases para el acceso y transferencias de datos.
require_once('../entities/transfers/product.php');
require_once('../entities/transfers/category.php');
require_once('../entities/access/product.php');

// Inicializar clase para crear reporte
$pdf = new Report;
// Se inicia el reporte por el encabezado del doc.
$pdf->reportHeader('Products by categories');
//Se instancia el modelo Categpría para obetener los datos
$category = new CategoryQuery;
//Verificar si existen registros que se muestren, sino, imprimir un mensaje.
if ($dataCategories = $category->all()) {
    //Se establece un color de relleno en los encabezados
    $pdf->SetFillColor(175);
    // Se establece la fuente para los encabezados
    $pdf->setFont('Times', 'B', 11);
    //Imprimir celdas con encabezados
    $pdf->cell(126, 10, 'Name', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Price (US$)', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Description', 1, 1, 'C', 1);

    // Se asigna un tono de fondo para visualizar el título de la sección. 
    $pdf->setFillColor(225);
    // Se define el tipo de letra para la información de los artículos.
    $pdf->setFont('Times', '', 11);

    // Se iteran los registros uno por uno.
    foreach ($dataCategories as $rowCategories) {
        // Se muestra una celda con el título de la sección.
        $pdf->cell(0, 10, $pdf->stringEncoder('Category: ' . $rowCategories['category']), 1, 1, 'C', 1);
        // Se crea una instancia del modelo Producto para procesar la información.
        $product = new Product;
        // Se asigna la sección para obtener los artículos correspondientes. En caso contrario, se muestra un mensaje de error.
        if ($product->setCategory($rowCategories['id_category'])) {
            // Se comprueba si hay registros disponibles para mostrar. En caso contrario, se muestra un mensaje.
            if ($dataProducts = $product->productCategory()) {
                //Se itera sobre los registros fila por fila
                foreach ($dataProducts as $rowProduct) {
                    // Se muestran las celdas con la información de los artículos.
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
// Se llama automáticamente al método footer() y se envía el documento al navegador web
$pdf->output('I', 'product.pdf');