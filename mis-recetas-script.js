document.addEventListener("DOMContentLoaded", function() {
    const recipeTitles = document.querySelectorAll('.recipe-title');

    recipeTitles.forEach(function(title) {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;

            // Alterna la visibilidad de la receta
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});
// JavaScript to toggle the dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    const dropdown = document.querySelector('.dropdown');

    toggleBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener('click', () => {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });
});
