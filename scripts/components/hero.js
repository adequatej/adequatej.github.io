document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const skipButton = document.getElementById('skip-button');
    const sections = document.querySelectorAll('section:not(#hero)');
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('#hero');

    body.classList.remove('initial-load');
    
    const showContent = () => {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transition = 'opacity 0.5s ease-out';
        });
    };

    showContent();

    skipButton.addEventListener('click', () => {
        const nextSection = document.querySelector('#about');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});