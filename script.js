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
