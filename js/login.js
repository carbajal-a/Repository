//Redireccionar inicio a login
function manejadorDeSubmit(evento){
    evento.preventDefault();
    sessionStorage.setItem('signed','true');
    window.location.href="index.html";

    return true;

}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("user-info").addEventListener("submit", manejadorDeSubmit)
});

//Nombre de usuario en barra de navegación
//Obtener y almacenar 
function datos(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    usuario = {
        user: username,
        password: password
    }

    jsonUsuario = JSON.stringify(usuario);
    localStorage.setItem("user", jsonUsuario);
};
//Alternar la visibilidad de la contraseña
var togglePassword = document.querySelector("#togglePassword");
var password = document.querySelector("#password");
    
togglePassword.addEventListener("click", function (e){
    // alternar el atributo de tipo
     var type = password.getAttribute("type") === "password" ? "text" : "password";

     password.setAttribute("type", type);

     // alternar el icono eye slash
     this.classList.toggle("fa-eye");
});
