const ORDER_ASC_BY_PRICE = "Máximo"
const ORDER_DESC_BY_PRICE = "Mínimo"
const ORDER_BY_RELEVANCE = "soldCount"
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
//Filtros para ordenar según precio de productos y productos más vendidos
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }
    //console.log(result);
    return result;
    
}

//Mostrar los productos de la página
function showProductsList(){
    let htmlContentToAppend = "";
    for(i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) && 
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)))
            {

                htmlContentToAppend += `
                <div class="card">
                    <img class="card-img" alt="Card image" src="`+ product.imgSrc +`">
                    <div class="card-body">
                        <h5 class="card-title">` + product.name + `</h5>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                        <p class="card-text mb-1">` + product.description + `</p>
                        <p class="card-text mb-1"> Precio ` + product.cost + ` USD</p>
                        <a href="product-info.html"" class="btn btn-primary" id="btn-primary">Ir al producto</a>
                    </div>
                </div>`
            }
            
           
    }
    document.getElementById("cat-list-contain").innerHTML = htmlContentToAppend;
}

//Ordenar y mostrar
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(resultObj=>{
        console.log(resultObj);
        if(resultObj.status === "ok")
        {
            currentProductsArray = resultObj.data;
            showProductsList(currentProductsArray);
            hideSpinner();
    
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
    document.getElementById("sortByRelevance").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo para filtrar por precio de productos
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0)
        {
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0)
        {
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }
        showProductsList();
    });
    // Limpio los filtros de precio
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });
})

