
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
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}
