// perfil.js

// Verificar si el usuario está autenticado
if (!sessionStorage.getItem('userId')) {
    // Si no está autenticado, redirigir al inicio de sesión
    window.location.href = 'inicio-sesion.html';
} else {
    // Si está autenticado, obtener y mostrar los datos del perfil
    fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            window.location.href = 'inicio-sesion.html';  // Redirige al login si no está autorizado
        } else {
            // Mostrar los datos del perfil
            document.getElementById('nombre').innerText = `Nombre: ${data.nombre}`;
            document.getElementById('edad').innerText = `Edad: ${data.edad}`;
            document.getElementById('sexo').innerText = `Sexo: ${data.sexo}`;
            document.getElementById('nivel_actividad').innerText = `Nivel de Actividad: ${data.nivel_actividad}`;
            document.getElementById('peso').innerText = `Peso: ${data.peso}`;
            document.getElementById('diabetes').innerText = `Diabetes: ${data.diabetes ? 'Sí' : 'No'}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con la conexión al servidor');
    });
}
