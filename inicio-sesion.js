document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Captura los valores de los campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Crea un objeto con los datos a enviar
    const data = {
        username: username,
        password: password
    };

    // Enviar los datos al servidor usando fetch
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Inicio de sesión exitoso') {
            alert('¡Inicio de sesión exitoso!');

            // Guardar el nombre de usuario o id en sessionStorage o localStorage
            sessionStorage.setItem('userId', username); // Cambia `username` por el id del usuario si es necesario

            // Redirige a home.html
            window.location.href = 'home.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con la conexión al servidor');
    });
});
