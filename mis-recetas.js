
function showTab(category) {
    // Ocultar todas las secciones
    document.querySelectorAll('.recipes').forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    document.getElementById(category).style.display = 'flex';

    // Actualizar pestañas activas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="showTab('${category}')"]`).classList.add('active');
}

// Mostrar la pestaña de "Desayunos" al cargar la página
document.addEventListener('DOMContentLoaded', () => showTab('desayunos'));

// Función para alternar el menú lateral
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

// Nueva función: Realizar búsqueda en la barra
function performSearch() {
    const query = document.getElementById('searchBar').value.trim(); // Captura el término de búsqueda

    if (query.length > 0) {
        // Enviar el término al servidor
        fetch(`/search-recipes?q=${encodeURIComponent(query)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Resultados obtenidos:', data); // Verifica los resultados aquí
        // Renderiza los datos en la interfaz
    })
    .catch(error => {
        console.error('Error al realizar la búsqueda:', error);
    });
    } else {
        // Si no hay texto, puedes mostrar un mensaje o restaurar las recetas originales
        console.log('Barra de búsqueda vacía.');
    }
}

// Asocia el evento `input` a la barra de búsqueda
document.getElementById('searchBar').addEventListener('input', performSearch);
