const category = 'business/private/category.php';


document.addEventListener('DOMContentLoaded', () => {
    categoryBarGraph();
})
/**
 * Método que consulta datos para mostrar en la gráfica
 */
async function categoryBarGraph() {
    // realizar la petición
    const JSON = await dataRequest(category, 'allGraphCategories')
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
        graphBar('bar', categories, amount, 'Cantidad de productos', 'Cantidad de productos de las categorias')
    } else {
        // remover la gráfica
        document.getElementById('bar').remove();
        console.log(JSON)
    }
}