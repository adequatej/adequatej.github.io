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

    const handleScroll = () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const navbarHeight = navbar.offsetHeight;
        
        if (window.scrollY >= heroBottom - navbarHeight) {
            navbar.classList.add('fixed');
            document.body.style.paddingTop = `${navbarHeight}px`;
        } else {
            navbar.classList.remove('fixed');
            document.body.style.paddingTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll);

    skipButton.addEventListener('click', () => {
        const nextSection = document.querySelector('#about');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});