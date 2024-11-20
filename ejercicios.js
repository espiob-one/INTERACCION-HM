
function showTab(category) {
    // Ocultar todas las secciones
    document.querySelectorAll('.excersise').forEach(section => {
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



// Mostrar la pestaña de "Dentro de casa" al cargar la página
document.addEventListener('DOMContentLoaded', () => showTab('Dentro de casa'));
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}
