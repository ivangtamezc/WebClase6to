function login() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message"); //Guardamos variables

    
    if (user === "admin" && pass === "1234") { //Un usuario con acceso
        localStorage.setItem("auth", "true");
         
        alert("Inicio de sesión exitoso"); //Avisa que todo salio bien
        window.location.href = "dashboard.html";
    } 
    else if(user === "admin1" && pass === "xd"){//Otro usuario que podria ingresar
        localStorage.setItem("auth", "true"); 
        alert("Inicio de sesión exitoso");
        window.location.href = "dashboard.html";
    }
    else {
        errorMessage.style.display = "block"; //Muestra el mensaje de error
    }
}

function checkAuth() {
    if (localStorage.getItem("auth") !== "true") { //Revisa si ya iniiaste seccion
        window.location.href = "login.html"; //Si no iniciaste sesion te manda a la pagina de login
        alert("No tienes acceso a esta página. Redirigiendo..."); //Te avisa que no has iniciado sesion y que no tienes acceso
        
    }
    
}




function logout() { // Funcion para cerrar sesion
    localStorage.removeItem("auth"); // Borra la sesión
    alert("Sesión cerrada"); //Mensaje de que se cerro sesion
    window.location.href = "index.html"; //Te regresa a la pagina de inicio
}

