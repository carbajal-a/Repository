//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showImages(array){

    let htmlContentToAppend = "";

	for (let i = 0; i < array.length; i++) {
		let imageSrc = array[i];

		if (i === 0) {
			htmlContentToAppend += `
				<div class="carousel-item active">
					<img class="d-block w-100" src="${imageSrc}">
				</div>
			`
			continue;
		}

		htmlContentToAppend += `
		<div class="carousel-item">
			<img class="d-block w-100" src="${imageSrc}">
		</div>
        `

		document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
	}

}
function showProductsComments(array) {
    let productComment = '';
    array.forEach(comment =>{
        let rating = '';
        for (let i = 1; i <= comment.score; i++) {rating += `<span class="fa fa-star checked"></span>`;}
        for (let i = comment.score + 1; i <= 5; i++) {rating += `<span class="fa fa-star unchecked"></span>`;}

        productComment += `<div class="col-12 border rounded m-2 p-2">
                                <div class="row"><div class="col-10" ><small><strong class='user'> ` + comment.user + `</strong></small></div><div><small> ` + comment.dateTime + `</small></div> </div>
                                <div class="row"><div class="col-10"><p>` + comment.description + `</p><div>${rating}</div></div> </div>
                            </div> `;
    });
    document.getElementById("comments").innerHTML = productComment; 
}

var product= {};
var commentsArray = [];
var productsRelated = [];
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(resultObj =>{
            if (resultObj.status == "ok")
            {
                product = resultObj.data;
                
                let productNameHTML = document.getElementById("productName");
                let productDescriptionHTML = document.getElementById("productDescription");
                let productCostHTML = document.getElementById("productCost");
                let productSoldCountHTML = document.getElementById("productSoldCount");

                productNameHTML.innerHTML = product.name;
                productDescriptionHTML.innerHTML = product.description;
                productCostHTML.innerHTML = product.cost + `USD`;
                productSoldCountHTML.innerHTML = product.soldCount;

                showImages(product.images);
                productsRelated = product.relatedProducts;
            }
        //Mostrar los productos relacionados
        getJSONData(PRODUCTS_URL).then( resultObj =>{
            if (resultObj.status === "ok") {
                for (let i = 0; i< resultObj.data.length; i++) {
                    let product = resultObj.data[i]; 

                    if (productsRelated.includes(i)) {
                        document.getElementById("products-related").innerHTML += `
                        <div class="card"> 
                            <img class="card-img" alt="Card image" src="` + product.imgSrc +`"><br>
                            <div class="card-body">
                            <h5 class="card-title">`+ product.name +`</h5>
                            <p class="card-text">` + product.description + `<br>`+ product.currency + product.cost +`</p>
                            <a href="#" class="btn btn-primary">Ver Producto</a>
                        </div>`;
                    }
                }
            }
        });    
    });
   
    //Comentarios: primero mostrar los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resultObj=>{
        if (resultObj.status === "ok"){
            for(let i = 0; i <resultObj.data.length; i++){
                let product = resultObj.data;
                document.getElementById("comments-number").innerHTML = product.length;
                commentsArray = product;
                showProductsComments(commentsArray);
            }
        }
    });
    /*
    //Comentarios: segundo agregar el nuevo comentario del usuario
    document.getElementById("add-new-comment").addEventListener("click",(e => {
        //algo donde muestre cree el nuevo comentario y muestre la puntuacion
        let newProductComment = ;
        commentsArray.push(newProductComment);


        showProductsComments(newProductComment);//o algo parecido
        document.getElementById("comment").value = '';

    });
    */

    //Agregar puntuación del producto en comentarios
    var list=["one","two","three","four","five"];
        list.forEach(function(element, posicion) {
            document.getElementById(element).addEventListener("click", function(){

                for (let i = 0; i < list.length; i++) {
                    
                    var cls=document.getElementById(element).className;
                    var star = document.getElementById(list[i]);

                    if(posicion >= i && cls.includes("unchecked")) {
                        star.classList.remove("unchecked");
                        star.classList.add("checked");
                    }   
                    else if (posicion < i && cls.includes("checked")) {
                        star.classList.remove("checked");
                        star.classList.add("unchecked");
                    }
                    
                }

                sessionStorage.setItem("score", posicion);
            });            
        });
});