const CATEGORY = 'business/private/category.php';
const PRODUCT = 'business/private/product.php';
const ORDER = 'business/private/order.php';

document.addEventListener('DOMContentLoaded', () => {
    categoryBarGraph();
    priceBarGraph();
    consumptionPieGraph();
    stockPieGraph();
    salesLineGraph();
})
/**
 * Método que consulta datos para mostrar en la gráfica
 */
async function categoryBarGraph() {
    // realizar la petición
    const JSON = await dataRequest(CATEGORY, 'allGraphCategories')
    // verificar el estado de la petición
    if (JSON.status) {
        // crear arreglo para obtener la categoria 
        // y la cantidad de producto que tiene
        let categories = [], amount = [];

        // por cada registro encontrado 
        JSON.dataset.forEach(element => {
            // al registro encontrado guardarlo en un arreglo
            // para las categorias y para la cantidad de productos que tiene
            categories.push(element.category);
            amount.push(element.amount);
        });
        // crear la gráfica
        graphBar('bar-categories', categories, amount, 'Cantidad de productos', 'Products by category')
    } else {
        // remover la gráfica
        document.getElementById('bar-categories').remove();
        console.log(JSON)
    }
}

/**
 * Método para generar gráfica de barra a partir del precio de los productos
 */
async function priceBarGraph() {
    // realizar petición
    const JSON = await dataRequest(PRODUCT, 'priceProductGraph');
    // verificar el estado de la petición
    if (JSON.status) {
        // arreglo con las variables a estudiar en la gráfica
        let prices = [], products = [];
        // recorrer los registros encontrados
        JSON.dataset.forEach(element => {
            // agregar elemento al arreglo
            prices.push(element.price);
            products.push(element.name);
        })
        // crear gráfica
        graphBar('bar-prices', products, prices, null, 'Price of products')
    } else {
        // remover la gráfica
        document.getElementById('bar-prices').remove();
        console.log(JSON)
    }
}
/**
 * Método para generar gráfica de pastes a partir del precio de los productos
 */
async function consumptionPieGraph() {
    // realizar petición
    const JSON = await dataRequest(PRODUCT, 'consumptionProduct');
    // verificar el estado de la petición
    if (JSON.status) {
        // arreglo con las variables a estudiar en la gráfica
        let prices = [], products = [];
        // recorrer los registros encontrados
        JSON.dataset.forEach(element => {
            // agregar elemento al arreglo
            prices.push(element.consumption);
            products.push(element.name);
        })
        // crear gráfica
        graphPie('bar-consumption', products, prices, 'More sales', '')
    } else {
        // remover la gráfica
        document.getElementById('bar-prices').remove();
        console.log(JSON)
    }
}

/**
 * Método para generar un gráfico de paster según las existencias de los productos
 */
async function stockPieGraph() {
    // realizar petición
    const JSON = await dataRequest(PRODUCT, 'stockProducts');
    // verificar el estado de la petición
    if (JSON.status) {
        // arreglo con las variables a estudiar en la gráfica
        let stock = [], products = [];
        // recorrer los registros encontrados
        JSON.dataset.forEach(element => {
            // agregar elemento al arreglo
            stock.push(element.stock_products);
            products.push(element.name);
        })
        // crear gráfica
        // graphPie('bar-stock', products, stock, '', 'Cantidad de productos')
        polarGraph('bar-stock', products, 'Stock of products', stock)
    } else {
        // remover la gráfica
        document.getElementById('bar-stock').remove();
        console.log(JSON)
    }
}

/**
 * Método para generar gráfica de linea apartir de las ordenes por més
 */
async function salesLineGraph() {
    // realizar petición
    const JSON = await dataRequest(ORDER, 'getSales');
    // verificar el estado de la petición
    if (JSON.status) {
        // crear arreglos vacíos para guardar los datos
        let month = [], sales = [];
        // recorrer los datos encontrados
        JSON.dataset.forEach(element => {
            // agregar elemento encontrado los arreglos
            month.push(element.month);
            sales.push(element.sales);
        });
        // generar gráfica
        lineGraph('line-sales', month, sales, 'Sales')
    } else {
        document.getElementById('line-sales').remove();
        console.log(JSON)
    }

}