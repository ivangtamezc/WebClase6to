function login() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    
    if (user === "admin" && pass === "1234") {
        localStorage.setItem("auth", "true");
         
        alert("Inicio de sesión exitoso");
        window.location.href = "dashboard.html";
    } 
    else if(user === "admin" && pass === "xd"){
        window.location.href = "dashboard.html"
    }
    else {
        errorMessage.style.display = "block";
    }
}

function checkAuth() {
    if (localStorage.getItem("auth") !== "true") {
        window.location.href = "login.html";
        alert("No tienes acceso a esta página. Redirigiendo...");
        
    }
    else{
        window.location.href = "login.html";
    }
}




function logout() {
    localStorage.removeItem("auth"); // Borra la sesión
    alert("Sesión cerrada");
    window.location.href = "index.html";
}

