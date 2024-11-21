function showTab(category, type) {
    // Determinar si se están mostrando recetas o rutinas
    const className = type === 'recipes' ? '.recipes' : '.exercises';

    // Ocultar todas las secciones del tipo seleccionado
    document.querySelectorAll(className).forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const section = document.getElementById(category);
    section.style.display = 'flex';

    // Actualizar pestañas activas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="showTab('${category}', '${type}')"]`).classList.add('active');

    // Cargar contenido dinámicamente
    if (type === 'recipes') {
        loadRecipes(category);
    } else {
        loadExercises(category);
    }
}

function loadRecipes(category) {
    // Selecciona la sección donde se cargarán las recetas
    const section = document.getElementById(category);
    section.innerHTML = '<p>Cargando recetas...</p>'; // Mensaje temporal

    // Realiza la solicitud al servidor
    fetch(`http://localhost:3000/search?term=${encodeURIComponent(category)}`)
        .then(response => response.json())
        .then(recipes => {
            // Limpia la sección y agrega las recetas dinámicamente
            section.innerHTML = recipes.map(recipe => `
                <div class="recipe-card">
                    <h3>${recipe.nombre}</h3>
                    <p>${recipe.descripcion}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error al cargar las recetas:', error);
            section.innerHTML = '<p>Error al cargar las recetas. Inténtalo más tarde.</p>';
        });
}

function loadExercises(category) {
    // Selecciona la sección donde se cargarán las rutinas
    const section = document.getElementById(category);
    section.innerHTML = '<p>Cargando rutinas...</p>'; // Mensaje temporal

    // Realiza la solicitud al servidor
    fetch(`http://localhost:3000/exercises?category=${encodeURIComponent(category)}`)
        .then(response => response.json())
        .then(exercises => {
            // Limpia la sección y agrega las rutinas dinámicamente
            section.innerHTML = exercises.map(exercise => `
                <div class="exercise-card">
                    <h3>${exercise.nombre}</h3>
                    <p>${exercise.descripcion}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error al cargar las rutinas:', error);
            section.innerHTML = '<p>Error al cargar las rutinas. Inténtalo más tarde.</p>';
        });
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

// Mostrar la pestaña de "Desayunos" al cargar la página
document.addEventListener('DOMContentLoaded', () => showTab('mis-recetas', 'recipes'));