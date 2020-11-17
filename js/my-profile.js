let profileUser = {};

function getData(){
    let data = document.getElementsByClassName("form-control");
    dataForm = { name: "", surname: "", age: "", contact:"", email:""};
    for (i=0; i< data.length; i++){
        dataForm.name = data[0].value;
        dataForm.surname = data[1].value;
        dataForm.age = data[2].value;
        dataForm.contact = data[3].value;
        dataForm.email = data[4].value;
    }
    localStorage.setItem("name", dataForm.name);
    localStorage.setItem("profile", JSON.stringify(dataForm));
}
function dataLocalStorage(){
    if (localStorage.getItem("name")){
        let profile = JSON.parse(localStorage.getItem("profile"));
        console.log(profile);
    }else{
        console.log("No se encuentra lo que busca...")
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getData(profileUser);
    dataLocalStorage(profileUser);
    
});