document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtener los valores de los campos
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Guardar en LocalStorage
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        // Redirigir a home.html
        window.location.href = "home.html";
    });
});
