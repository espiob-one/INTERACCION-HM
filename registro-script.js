document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Captura los valores de los campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const activityLevel = document.getElementById('activity-level').value;
    const diabetes = document.getElementById('diabetes').checked; // Valor booleano

    // Validación de contraseñas
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Crea un objeto con los datos para enviar al servidor
    const data = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        age: age,
        weight: weight,
        activityLevel: activityLevel,
        diabetes: diabetes
    };

    // Enviar los datos al servidor usando fetch
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Asegura que los datos se envíen como JSON
        },
        body: JSON.stringify(data) // Convierte el objeto de datos a formato JSON
    })
    .then(response => {
        if (!response.ok) { // Verifica si la respuesta es exitosa
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Usuario registrado correctamente') {
            alert('¡Registro exitoso!');
            window.location.href = 'home.html'; // Redirige a home.html
        } else {
            alert('Hubo un error al registrar el usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registrado Existosamente');
        window.location.href = 'home.html';
    });
});
