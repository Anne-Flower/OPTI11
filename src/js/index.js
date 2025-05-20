const toggleButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');

toggleButton.addEventListener('click', () => {
    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!expanded));
    toggleButton.setAttribute('aria-label', expanded ? 'Ouvrir le menu' : 'Fermer le menu');
    document.body.classList.toggle('menu-open');
});