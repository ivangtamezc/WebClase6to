function login() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    
    if (user === "admin" && pass === "1234") {
        window.location.href = "dashboard.html"; 
    } 
    else if(user === "admin" && pass === "xd"){
        window.location.href = "dashboard.html"
    }
    else {
        errorMessage.style.display = "block";
    }
}