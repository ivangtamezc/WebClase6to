// app/scripts/script.js

export function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if ((user === "admin" && pass === "1234") || (user === "admin1" && pass === "xd")) {
        localStorage.setItem("auth", "true");
        alert("Successful login");
        window.location.href = "/dashboard"; // Usa rutas de Next.js
    } else {
        errorMessage.style.display = "block"; // Muestra el mensaje de error
    }
}

export function checkAuth() {
    if (localStorage.getItem("auth") !== "true") {
        alert("You do not have access to this page. Redirecting...");
        window.location.href = "/login"; // Usa rutas de Next.js
    }
}

export function logout() {
    localStorage.removeItem("auth");
    alert("Session closed");
    window.location.href = "/"; // Regresa a la página de inicio en Next.js
}
