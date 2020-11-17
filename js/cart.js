let subTotalCost = 0;
let totalCost = 0;
let shippingPercentage = 1.15;
let shippingPorcentageValue = 15;
let convertUSD = 40;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let percentage = 100;

//Mostrar artículos del carrito
let currency = false;
function showArticlesInCart(array){
    let htmlContenttoAppend = "";
    //Uso esta variable para mostrar el cantidad de artículos por producto ya cargados en el carrito
    let j = 0;
    for (i = 0; i < array.length; i++){
        let articles = array[i];
        var price = "";
        if ( articles.currency === "USD"){
            price = articles.unitCost * convertUSD;
        } else {
            price = articles.unitCost;
        }
        htmlContenttoAppend += `
        <ul class="list-group-item list-group-item-action">
			<div class="row d-flex justify-content-around">
				<div class="col-2 d-flex align-items-center justify-content-center">
					<img src="`+articles.src+`" class="img-thumbnail">
                </div>
                <div class="col-2 d-flex align-items-center justify-content-start">
                    <div class="d-flex align-items-center">
                        <h6 class="text-muted">`+articles.name+`</h6>
                    </div>
                </div>
                <div class="col-2 d-flex align-items-center">
					<div class="d-flex w-100 justify-content-end align-items-center">
						<h6 class="text-muted">`+PESO_SYMBOL+`<span id="newCostHTML-`+j+`" class="costHTML">`+price+`</span></h6>
					</div>
                </div>
                <div class="col-2 d-flex align-items-center justify-content-center">
					<div class="w-75 d-flex justify-content-center align-items-center">
              			<input type="number" class="form-control" id="articleCount-`+j+`" value="`+articles.count+`" min="0" onchange="updateCosts();">
					</div>
                </div>
            </div>
        </ul>
        `;
    }
    document.getElementById("cart-content").innerHTML = htmlContenttoAppend;
    j++;
    //console.log("¿Qué está haciendo esto?");
    updateCosts();
    
}

function updateCosts(){
	let subTotalHTML = document.getElementById("subTotalHTML");
	let totalCostHTML = document.getElementById("totalCostHTML");
	let costHTML = document.querySelectorAll(".costHTML");
	let shippingPercentageHTML = document.getElementById("shippingPercentage");
	let articleCountNum = 0;
	subTotalCost = 0;
	totalCost = 0;

	// Accedo a la cantidad de elementos en base a la Clase ".costHTML"
	for (let i = 0; i < costHTML.length; i++) {
		let countArticles = `articleCount-${i}`;
		let count = document.getElementById(countArticles).value;

		if ( i === 0) {
			subTotalCost = ((costHTML[i].textContent * count) / convertUSD);
		} else {
			// Calculo el Subtotal
			subTotalCost += costHTML[i].textContent * count;
		}

		// Calculo Cantidad de Articulos
		articleCountNum += +count;

		// Muestro Subtotal
		subTotalHTML.innerHTML = PESO_SYMBOL+ subTotalCost.toLocaleString();
	}
	// Muestro Cantidad de Articulos
	cartCountHTML.innerHTML = articleCountNum;

	// Almaceno la Cantidad de Articulos en LocalStorage
	localStorage.setItem("cantArt", articleCountNum);

	// Convierto de String a Number
	subTotalCost = parseInt(subTotalCost);
	// Muestro el Porcentaje
	shippingPercentageHTML.innerHTML = shippingPorcentageValue + PERCENTAGE_SYMBOL;
	// Calculo el Total y lo muestro
	totalCost = (Math.round(subTotalCost * shippingPercentage * percentage) / percentage);
	if (!currency) {
		totalCost = totalCost * convertUSD;
	}
	totalCost = Math.round(totalCost);
	totalCostHTML.innerHTML = MONEY_SYMBOL + totalCost.toLocaleString();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
		if (resultObj.status === "ok") {
            let product = resultObj.data;
            showArticlesInCart(product.articles);
		}
	});
	document.getElementById("premiumradio").addEventListener("change", () => {
		shippingPercentage = 1.15;
		shippingPorcentageValue = 15;
		updateCosts();
	});
	document.getElementById("expressradio").addEventListener("change", () => {
		shippingPercentage = 1.07;
		shippingPorcentageValue = 7;
		updateCosts();
	});
	document.getElementById("standardradio").addEventListener("change", () => {
		shippingPercentage = 1.05;
		shippingPorcentageValue = 5;
		updateCosts();
	});
});
