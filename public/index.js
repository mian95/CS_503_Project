const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the active class
    openBtn.style.display = navLinks.classList.contains('active') ? 'none' : 'block'; // Show/hide open button
    closeBtn.style.display = navLinks.classList.contains('active') ? 'block' : 'none'; // Show/hide close button
});

